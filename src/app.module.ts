import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import {AuthModule} from './auth/auth.module'
import { PixService } from './pix/pix.service';
import { PixController } from './pix/pix.controller';
import { PixModule } from './pix/pix.module';

@Module({
  imports: [PixModule, DatabaseModule, UsersModule, AuthModule,ConfigModule.forRoot({
    isGlobal: true, // para ficar disponível em todo lugar sem precisar importar de novo
  }), PixModule,],
  controllers: [AppController, PixController],
  providers: [AppService, PixService],
})
export class AppModule {}
