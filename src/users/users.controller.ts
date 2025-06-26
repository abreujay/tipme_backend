import { UsersService } from './users.service';
import {CreateUserDTO} from './create-user.dto'
import { Controller, Post, Body, UseInterceptors, ClassSerializerInterceptor, Get } from '@nestjs/common';
import { AuthUserDTO } from './auth-user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post('/register')
    async registerUser(@Body() createUserDto: CreateUserDTO) {
      const user = await this.usersService.createUser(createUserDto);
      return user;
    }

    @Post('/login')
    async login(@Body() authUserDto : AuthUserDTO){

      const token = await this.usersService.authUser(authUserDto)
      return {

        message: 'Login Realizado com Sucesso!',
        token

      }

    }

}
