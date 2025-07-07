import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthUserDTO } from './dto/auth-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserLinksDTO } from './dto/user-link.dto';
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
    const existentUser = await this.userRepository.findOne({
      where: { userMail: userData.userMail },
    });
    if (existentUser) {
      throw new BadRequestException('Usuário com esse email já cadastrado.');
    }

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
      throw new BadRequestException('Usuário inexistente.');
    }

    const passwordIsValid = await bcrypt.compare(
      userData.userPassword,
      user.userPassword,
    );
    if (!passwordIsValid) {
      throw new BadRequestException('Senha incorreta, tente novamente.');
    }

    const token = jwt.sign(
      { userId: user.userId },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' },
    );

    return { token };
  }

  async updateUser(userId: string, userData: UpdateUserDTO): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { userId },
      select: ['userId', 'userPassword', 'userMail', 'userName'],
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (!userData.password) {
      throw new BadRequestException('Senha atual é obrigatória.');
    }

    const passwordIsValid = await bcrypt.compare(userData.password, user.userPassword);
    if (!passwordIsValid) {
      throw new BadRequestException('Senha incorreta.');
    }

    const updatedFields: Partial<User> = {};
    if (userData.userMail) updatedFields.userMail = userData.userMail;
    if (userData.userName) updatedFields.userName = userData.userName;
    if (userData.userPassword) {
      updatedFields.userPassword = await bcrypt.hash(userData.userPassword, 10);
    }

    if (Object.keys(updatedFields).length === 0) {
      throw new BadRequestException('Nenhum dado para atualizar.');
    }

    await this.userRepository.update({ userId }, updatedFields);

    return { message: 'Usuário atualizado!' };
  }

  // Função genérica para atualizar um campo simples do usuário
  private async updateUserField(userId: string, field: keyof User, value: any, fieldNameForMessage: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    (user[field] as any) = value;
    await this.userRepository.save(user);
    return { message: `${fieldNameForMessage} atualizado!` };
  }

  async updateAvatar(userId: string, avatarUrl: string) {
    return this.updateUserField(userId, 'userAvatar', avatarUrl, 'Avatar');
  }

  async createArtistName(userId: string, artistName: string) {
    return this.updateUserField(userId, 'artistName', artistName, 'Nome do artista cadastrado');
  }

  async updateArtistName(userId: string, artistName: string) {
    return this.updateUserField(userId, 'artistName', artistName, 'Nome do artista atualizado');
  }

  async createBio(userId: string, bio: string) {
    return this.updateUserField(userId, 'bio', bio, 'Biografia cadastrada');
  }

  async updateBio(userId: string, bio: string) {
    return this.updateUserField(userId, 'bio', bio, 'Biografia atualizada');
  }

  async postUserLink(userId: string, userLink: UserLinksDTO, linkNumber: 1 | 2 | 3) {
    const field = `userLink${linkNumber}` as keyof User;
    return this.updateUserField(userId, field, userLink.link, `Link ${linkNumber} cadastrado`);
  }

  async updateUserLink(userId: string, userLink: UserLinksDTO, linkNumber: 1 | 2 | 3) {
    const field = `userLink${linkNumber}` as keyof User;
    return this.updateUserField(userId, field, userLink.link, `Link ${linkNumber} atualizado`);
  }

  async getAllInfo(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return user;
  }

  async deleteUser(userId: string, userPassword: string) {

    const user = await this.userRepository.findOne({ where: { userId }, select: ['userId', 'userPassword'] });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    const passwordIsValid = await bcrypt.compare(userPassword, user.userPassword);
    if (!passwordIsValid) {
      throw new BadRequestException('Senha incorreta, tente novamente.');
      
    }
    return this.userRepository.delete({ userId }), {

      message: 'Usuário deletado com sucesso!'
      
    }
  }
}
