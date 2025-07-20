import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get(':id/reviews')
  async findReviews(@Param('id') id: string) {
    return this.productsService.findReviewsByProductId(id);
  }

  @Post(':id/reviews')
  async addReview(
    @Param('id') id: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    const review = await this.productsService.addReview(id, createReviewDto);
    if (!review) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return review;
  }
}
