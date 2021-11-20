import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BrandsController } from './brands/controller/brands.controller';
import { CategoriesController } from './categories/controller/categories.controller';
import { CustomersController } from './customers/controller/customers.controller';
import { ProductsController } from './products/controller/products.controller';
import { UsersController } from './users/controller/users.controller';

import { BrandsService } from './brands/services/brands.service';
import { CategoriesService } from './categories/services/categories.service';
import { CustomersService } from './customers/services/customers.service';
import { ProductsService } from './products/services/products.service';
import { UsersService } from './users/services/users.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    BrandsController,
    CategoriesController,
    CustomersController,
    ProductsController,
    UsersController,
  ],
  providers: [
    AppService,
    BrandsService,
    CategoriesService,
    CustomersService,
    ProductsService,
    UsersService,
  ],
})
export class AppModule {}
