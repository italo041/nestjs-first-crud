import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BrandsController } from './brands/controllers/brands.controller';
import { CategoriesController } from './categories/controllers/categories.controller';
import { CustomersController } from './customers/controllers/customers.controller';
import { ProductsController } from './products/controllers/products.controller';
import { UsersController } from './users/controllers/users.controller';

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
