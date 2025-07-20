import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ProductOptionsDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  size?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  color?: string[];
}

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsObject()
  @ValidateNested()
  @Type(() => ProductOptionsDto)
  options: ProductOptionsDto;
}
