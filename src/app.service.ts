import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any[],
  ) {}
  getHello(): object {
    return {
      message: `Hello world ${this.apiKey}`,
      tasks: this.tasks,
    };
  }
}
