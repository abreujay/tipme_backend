import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config()

import { typeOrmConfig } from './typeorm.config';

@Module({

    imports: [

        TypeOrmModule.forRoot(typeOrmConfig)
        
    ]
})
export class DatabaseModule { }
