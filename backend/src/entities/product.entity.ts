import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Review } from './review.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('simple-array')
  images: string[];

  @Column('json', { nullable: true })
  options: {
    size?: string[];
    color?: string[];
  };

  @OneToMany(() => Review, (review) => review.product, {
    cascade: true,
    eager: true,
  })
  reviews: Review[];
}
