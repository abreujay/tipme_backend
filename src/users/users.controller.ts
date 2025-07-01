import { UsersService } from './users.service';
import { CreateUserDTO } from './create-user.dto'
import { Controller, Post, Body, UseInterceptors, ClassSerializerInterceptor, Get, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthUserDTO } from './auth-user.dto';
import { UpdateUserDTO } from './update-user.dto';

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
  async login(@Body() authUserDto: AuthUserDTO) {

    const token = await this.usersService.authUser(authUserDto)
    return {

      message: 'Login Realizado com Sucesso!',
      token

    }
  }
  @UseGuards(JwtAuthGuard)
  @Patch('/profile')
  async updateProfile(@Body() updateUserDto: UpdateUserDTO) {

    const user = await this.usersService.updateUser(updateUserDto)
    return {

      message: 'Perfil Atualizado!'

    }

  }

  @Patch('update-avatar')
  async updateAvatar(@Body() body: { userId: string; avatarUrl: string }) {
  return this.usersService.updateAvatar(body.userId, body.avatarUrl);
  }

  @Post('update-artist-name')
  async updateArtistName(@Body() body: { userId: string; artistName: string }) {
  return this.usersService.updateArtistName(body.userId, body.artistName);
  }

  @Post('update-bio')
  async updateBio(@Body() body: { userId: string; bio: string }) {
  return this.usersService.updateBio(body.userId, body.bio);
  }
}
