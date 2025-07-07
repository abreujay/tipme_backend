import { Injectable, BadRequestException, NotFoundException  } from '@nestjs/common';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SavePixDTO  } from './save-pix.dto';
import { QrCodePix } from 'qrcode-pix';
@Injectable()
export class PixService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async savePix(userId: string, pixData: SavePixDTO) {
        const user = await this.userRepository.findOne({ where: { userId } });
      
        if (!user) {
          throw new NotFoundException('Usuário não encontrado');
        }
      
        const updatedFields: Partial<User> = {
          pixKey: pixData.pixKey,
          pixName: pixData.name,
          pixCity: pixData.city,
        };
      
        await this.userRepository.update({ userId }, updatedFields);
      
        return { message: 'Dados Pix atualizados com sucesso' };
      }

}