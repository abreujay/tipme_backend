import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PixDTO } from './pix.dto';
@Injectable()
export class PixService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async savePix(userId: string, pix: PixDTO) {

        const user = await this.userRepository.findOne({ where: { userId } });

        if (!user) {
            throw new Error('Usuário nao encontrado.');
        }

        user.pixKey = pix.pixKey;
        return this.userRepository.save(user), {

            message: 'Pix cadastrado com sucesso!'

        };

    }

}