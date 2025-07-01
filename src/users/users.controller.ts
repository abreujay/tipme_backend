import { UsersService } from './users.service';
import { CreateUserDTO } from './create-user.dto'
import { Controller, Post, Body, UseInterceptors, ClassSerializerInterceptor, Get, Patch, UseGuards, Headers, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthUserDTO } from './auth-user.dto';
import { UpdateUserDTO } from './update-user.dto';
import { UpdateArtistNameDTO } from './update-artist-name.dto';
import { UpdateBioDTO } from './update-bio.dto';

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

  @UseGuards(JwtAuthGuard)
  @Post('artist-name')
  async createArtistName(@Body() body: { artistName: string }, @Request() req) {
    const userId = req.user.id;
    return this.usersService.createArtistName(userId, body.artistName);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('artist-name')
  async updateArtistName(@Body() body: UpdateArtistNameDTO, @Request() req) {
    const userId = req.user.id;
    return this.usersService.updateArtistName(userId, body.artistName);
  }


  @UseGuards(JwtAuthGuard)
  @Post('bio')
  async createBio(@Body() body: { bio: string }, @Request() req) {
    const userId = req.user.id;
    return this.usersService.createBio(userId, body.bio);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('bio')

  async updateBio(@Body() body: UpdateBioDTO, @Request() req) {
    const userId = req.user.id;
    return this.usersService.updateBio(userId, body.bio);
  }
}
