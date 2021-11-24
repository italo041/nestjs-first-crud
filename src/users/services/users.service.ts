import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { Client } from 'pg';
import * as bcrypt from 'bcrypt';

import { ProductsService } from './../../products/services/products.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomersService } from './customers.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @Inject('PG') private clientPG: Client,
    @InjectRepository(User) private userRepo: Repository<User>,
    private customersService: CustomersService,
  ) {}

  findAll() {
    return this.userRepo.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    if (data.customerId) {
      const customer = await this.customersService.findOne(data.customerId);
      newUser.customer = customer;
    }
    return this.userRepo.save(newUser);
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.userRepo.findOne(id);
    this.userRepo.merge(user, data);
    return this.userRepo.save(user);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }

  async getOrdersByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPG.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res.rows);
      });
    });
  }
}
