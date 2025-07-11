import { Controller, Get, Head, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Head('/health')
  healthCheck(@Res() res: Response) {
    res.status(200).end();
  }
}
