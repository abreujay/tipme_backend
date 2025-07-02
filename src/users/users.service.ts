// users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDTO } from './create-user.dto';
import { AuthUserDTO } from './auth-user.dto';
import { UpdateUserDTO } from './update-user.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async createUser(userData: CreateUserDTO): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.userPassword, 10);
    const user = this.userRepository.create({
      ...userData,
      userPassword: hashedPassword,
      
      
    });

    
    const existentUser = await this.userRepository.findOne({
      where: { userMail: userData.userMail },
    });
  
    if (existentUser) {
      throw new Error('Usuário com esse email ja cadastrado.');
    }

    return this.userRepository.save(user);
  }

  async authUser(userData: AuthUserDTO): Promise<{ token: string }> {
    const user = await this.userRepository.findOne({
      where: { userMail: userData.userMail },
      select: ['userId', 'userMail', 'userPassword'],
    });

    if (!user) {
      throw new Error('Usuário inexistente.');
    }

    const passwordIsValid = await bcrypt.compare(
      userData.userPassword,
      user.userPassword,
    );

    if (!passwordIsValid) {
      throw new Error('Senha incorreta, tente novamente.');
    }

    const token = jwt.sign(
      { userId: user.userId },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' },
    );

    return { token };
  }

  async updateUser(userId, userData: UpdateUserDTO) {
    const user = await this.userRepository.findOne({
      where: { userId },
    });
  
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }
  
    const updatedFields: Partial<User> = {};
  
    if (userData.userMail) updatedFields.userMail = userData.userMail;
    if (userData.userName) updatedFields.userName = userData.userName;
    if (userData.userPassword) {
      updatedFields.userPassword = await bcrypt.hash(userData.userPassword, 10);
    }
  
    await this.userRepository.update(
      { userId: user.userId },
      updatedFields
    );
  }

  async updateAvatar(userId: string, avatarUrl: string) {
    const user = await this.userRepository.findOne({ where: { userId } });
  
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }
  
    user.userAvatar = avatarUrl; 
  
    return this.userRepository.save(user);
  }
  async createArtistName(userId: string, artistName: string) {
    const user = await this.userRepository.findOne({ where: { userId } });
  
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }
  
    user.artistName = artistName;
  
    return this.userRepository.save(user);
  }

  async updateArtistName(userId: string, artistName: string) {
    const user = await this.userRepository.findOne({ where: { userId } });
  
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }
  
    user.artistName = artistName;
    return this.userRepository.save(user);
  }

  async createBio(userId: string, bio: string) {
    const user = await this.userRepository.findOne({ where: { userId } });
  
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }
  
    user.bio = bio;
    return this.userRepository.save(user);
  }

  async updateBio(userId: string, bio: string) {
    const user = await this.userRepository.findOne({ where: { userId } });
  
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }
  
    user.bio = bio;
    return this.userRepository.save(user);
  }

  async getAllInfo(userId: string) {
    const user = await this.userRepository.findOne({ where: { userId } });
  
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }
  
    return user;
  }
  
}
