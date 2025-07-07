import { UsersService } from './users.service';
import { CreateUserDTO } from './create-user.dto'
import { Controller, Post, Body, UseInterceptors, ClassSerializerInterceptor, Get, Patch, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthUserDTO } from './auth-user.dto';
import { UpdateUserDTO } from './update-user.dto';
import { UpdateArtistNameDTO } from './update-artist-name.dto';
import { UpdateBioDTO } from './update-bio.dto';
import { UserLinksDTO } from './user-link.dto'
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

  @Patch('/profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Body() updateUserDto: UpdateUserDTO, @Request() req) {
    const userId = req.user.id;
    return this.usersService.updateUser(userId, updateUserDto);
  }
  
  @UseGuards(JwtAuthGuard)
  @Patch('update-avatar')
  async updateAvatar(@Body() body: { avatarUrl: string }, @Request() req) {
    const userId = req.user.id;
    return this.usersService.updateAvatar(userId, body.avatarUrl);
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

  @UseGuards(JwtAuthGuard)
  @Post('link1')
  async postUserLink1(@Body() body: { userLink1: UserLinksDTO }, @Request() req) {
    const userId = req.user.id;
    return this.usersService.postUserLink1(userId, body.userLink1);
  }

  @UseGuards(JwtAuthGuard)
  @Post('link2')
  async postUserLink2(@Body() body: { userLink2: UserLinksDTO }, @Request() req) {
    const userId = req.user.id;
    return this.usersService.postUserLink2(userId, body.userLink2);
  }

  @UseGuards(JwtAuthGuard)
  @Post('link3')
  async postUserLink3(@Body() body: { userLink3: UserLinksDTO }, @Request() req) {
    const userId = req.user.id;
    return this.usersService.postUserLink2(userId, body.userLink3);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('link1')
  async updateUserLink1(@Body() body: { userLink1: UserLinksDTO }, @Request() req) {
    const userId = req.user.id;
    return this.usersService.updateUserLink1(userId, body.userLink1);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('link2')
  async updateUserLink2(@Body() body: { userLink2: UserLinksDTO }, @Request() req) {
    const userId = req.user.id;
    return this.usersService.updateUserLink2(userId, body.userLink2);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('link3')
  async updateUserLink3(@Body() body: { userLink3: UserLinksDTO }, @Request() req) {
    const userId = req.user.id;
    return this.usersService.updateUserLink3(userId, body.userLink3);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all-info')
  async getAllInfo(@Request() req) {
    const userId = req.user.id;
    return this.usersService.getAllInfo(userId);
  }

}
