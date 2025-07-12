import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  
  // Configuração do CORS para aceitar requisições do frontend
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001', 
      'http://localhost:5173', // Vite default
      'http://localhost:8080',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      'http://127.0.0.1:5173',
      // Domínios de produção
      'https://tipme-frontend.vercel.app',
      'https://tipme-frontend.vercel.app/',
      'https://tipme-frontend-7zn4.vercel.app',
      'https://tipme-frontend-7zn4.vercel.app/',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'X-Requested-With',
      'Accept',
      'Origin'
    ],
    credentials: true, // Permite cookies e headers de autenticação
  });
  
  app.useStaticAssets(join(__dirname, '..', 'public'));

  console.time('AppStarted');
  await app.listen(process.env.PORT ?? 3000);
  console.timeEnd('AppStarted');
  
}
bootstrap();
