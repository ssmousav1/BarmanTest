import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('summary')
  async generateSummary(@Body() body: { productId: string }) {
    const result = await this.aiService.generateProductSummaryFromDb(
      body.productId,
    );

    if (!result) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
