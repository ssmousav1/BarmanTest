import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Review } from '../entities/review.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['reviews'],
    });
  }

  async findOne(id: string): Promise<Product | null> {
    return this.productRepository.findOne({
      where: { id },
      relations: ['reviews'],
    });
  }

  async create(productData: Omit<Product, 'id' | 'reviews'>): Promise<Product> {
    const product = this.productRepository.create({
      ...productData,
      reviews: [],
    });
    return this.productRepository.save(product);
  }

  async findReviewsByProductId(productId: string): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { productId },
      order: { createdAt: 'DESC' },
    });
  }

  async addReview(
    productId: string,
    reviewData: Omit<Review, 'id' | 'createdAt' | 'product'>,
  ): Promise<Review | null> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      return null;
    }

    const review = this.reviewRepository.create({
      ...reviewData,
      product,
    });

    return this.reviewRepository.save(review);
  }
}
