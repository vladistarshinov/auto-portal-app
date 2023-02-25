import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './category.controller';
import {Category, CategorySchema } from './schema/category.schema';
import { CategoryService } from './category.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
