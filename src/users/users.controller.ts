import { UsersService } from './users.service';
import {CreateUserDto} from './create-user.dto'
import { Controller, Post, Body, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async registerUser(@Body() createUserDto: CreateUserDto) {
      const user = await this.usersService.createUser(createUserDto);
      return user;
    }

}
