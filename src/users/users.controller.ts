import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { Controller, Post, Body, UseInterceptors, ClassSerializerInterceptor, Get, Patch, UseGuards, Request, Param, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthUserDTO } from './dto/auth-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserLinksDTO } from './dto/user-link.dto';
import { DeleteUserDTO } from './dto/delete-user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async registerUser(@Body() createUserDto: CreateUserDTO) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('/login')
  async login(@Body() authUserDto: AuthUserDTO) {
    const token = await this.usersService.authUser(authUserDto);
    return {
      message: 'Login Realizado com Sucesso!',
      token,
    };
  }

  @Patch('/profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Body() updateUserDto: UpdateUserDTO, @Request() req) {
    const userId = req.user.id;
    return this.usersService.updateUser(userId, updateUserDto);
  }

  @Patch('update-avatar')
  @UseGuards(JwtAuthGuard)
  async updateAvatar(@Body('avatarUrl') avatarUrl: string, @Request() req) {
    const userId = req.user.id;
    return this.usersService.updateAvatar(userId, avatarUrl);
  }

  @Post('artist-name')
  @UseGuards(JwtAuthGuard)
  async createArtistName(@Body('artistName') artistName: string, @Request() req) {
    const userId = req.user.id;
    return this.usersService.createArtistName(userId, artistName);
  }

  @Patch('artist-name')
  @UseGuards(JwtAuthGuard)
  async updateArtistName(@Body('artistName') artistName: string, @Request() req) {
    const userId = req.user.id;
    return this.usersService.updateArtistName(userId, artistName);
  }

  @Post('bio')
  @UseGuards(JwtAuthGuard)
  async createBio(@Body('bio') bio: string, @Request() req) {
    const userId = req.user.id;
    return this.usersService.createBio(userId, bio);
  }

  @Patch('bio')
  @UseGuards(JwtAuthGuard)
  async updateBio(@Body('bio') bio: string, @Request() req) {
    const userId = req.user.id;
    return this.usersService.updateBio(userId, bio);
  }

  // Unificando links em métodos parametrizados
  @Post('link/:number')
  @UseGuards(JwtAuthGuard)
  async postUserLink(@Param('number') number: string, @Body() userLink: UserLinksDTO, @Request() req) {
    const userId = req.user.id;
    const linkNumber = parseInt(number, 10);
    if (![1, 2, 3].includes(linkNumber)) {
      throw new Error('Número do link inválido. Use 1, 2 ou 3.');
    }
    return this.usersService.postUserLink(userId, userLink, linkNumber as 1 | 2 | 3);
  }

  @Patch('link/:number')
  @UseGuards(JwtAuthGuard)
  async updateUserLink(@Param('number') number: string, @Body() userLink: UserLinksDTO, @Request() req) {
    const userId = req.user.id;
    const linkNumber = parseInt(number, 10);
    if (![1, 2, 3].includes(linkNumber)) {
      throw new Error('Número do link inválido. Use 1, 2 ou 3.');
    }
    return this.usersService.updateUserLink(userId, userLink, linkNumber as 1 | 2 | 3);
  }

  @Get('all-info')
  @UseGuards(JwtAuthGuard)
  async getAllInfo(@Request() req) {
    const userId = req.user.id;
    return this.usersService.getAllInfo(userId);
  }

  @Delete('delete-user')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Body () deleteUserDto: DeleteUserDTO, @Request() req) {
    const userId = req.user.id;
    return this.usersService.deleteUser(userId, deleteUserDto.userPassword);
  }
}
