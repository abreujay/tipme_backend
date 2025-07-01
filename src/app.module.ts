import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import {AuthModule} from './auth/auth.module'

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule,ConfigModule.forRoot({
    isGlobal: true, // para ficar disponível em todo lugar sem precisar importar de novo
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
