import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromptTemplate } from '@langchain/core/prompts';
import { ConfigService } from '@nestjs/config';
import { ChatFireworks } from '@langchain/community/chat_models/fireworks';
import { Product } from '../entities/product.entity';
import { Review } from '../entities/review.entity';

@Injectable()
export class AiService {
  private chatModel: ChatFireworks;

  constructor(
    private configService: ConfigService,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {
    const apiKey = this.configService.get<string>('FIREWORKS_API_KEY');

    this.chatModel = new ChatFireworks({
      fireworksApiKey: apiKey || 'dummy-key-for-development',
      model: 'accounts/fireworks/models/llama-v3p1-70b-instruct',
      temperature: 0.7,
    });
  }

  async generateProductSummaryFromDb(
    productId: string,
  ): Promise<{ productSummary: string; reviewInsights: string } | null> {
    try {
      // Fetch product from database
      const product = await this.productRepository.findOne({
        where: { id: productId },
        relations: ['reviews'],
      });

      if (!product) {
        return null;
      }

      // Transform reviews to the format expected by the AI
      const reviews = product.reviews.map((review) => ({
        rating: review.rating,
        comment: review.comment,
      }));

      return this.generateProductSummary(
        product.name,
        product.description,
        reviews,
      );
    } catch (error) {
      console.error('Error fetching product from database:', error);
      return null;
    }
  }

  async generateProductSummary(
    productName: string,
    productDescription: string,
    reviews: Array<{ rating: number; comment: string }>,
  ): Promise<{ productSummary: string; reviewInsights: string }> {
    try {
      // Product Summary
      const productPrompt = PromptTemplate.fromTemplate(
        `Create a compelling and informative summary for the following product in 2-3 sentences:
        Product Name: {productName}
        Product Description: {productDescription}
        
        Focus on key features and benefits that would appeal to customers.`,
      );

      const productSummaryChain = productPrompt.pipe(this.chatModel);
      const productSummaryResult = await productSummaryChain.invoke({
        productName,
        productDescription,
      });

      // Review Insights
      let reviewInsights =
        'No reviews yet. Be the first to share your experience!';

      if (reviews.length > 0) {
        const reviewsText = reviews
          .map((r, i) => `Review ${i + 1} (${r.rating}/5 stars): ${r.comment}`)
          .join('\n');

        const reviewPrompt = PromptTemplate.fromTemplate(
          `Analyze the following customer reviews and provide key insights in 2-3 sentences:
          {reviewsText}
          
          Highlight common themes, overall sentiment, and any notable feedback.`,
        );

        const reviewChain = reviewPrompt.pipe(this.chatModel);
        const reviewResult = await reviewChain.invoke({ reviewsText });
        reviewInsights = reviewResult.content as string;
      }

      return {
        productSummary: productSummaryResult.content as string,
        reviewInsights,
      };
    } catch (error) {
      console.error('AI generation error:', error);

      // Fallback responses
      return {
        productSummary: `${productName} - ${productDescription}`,
        reviewInsights:
          reviews.length > 0
            ? `This product has ${reviews.length} review(s)`
            : 'No reviews yet. Be the first to share your experience!',
      };
    }
  }
}
