// users.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDTO } from './create-user.dto';
import { AuthUserDTO } from './auth-user.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userData: CreateUserDTO): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.userPassword, 10);
    const user = this.userRepository.create({
      ...userData,
      userPassword: hashedPassword,
    });
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
}
