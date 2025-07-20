import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { Product } from '../entities/product.entity';
import { Review } from '../entities/review.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Product, Review])],
  controllers: [AiController],
  providers: [AiService],
})
export class AiModule {}
