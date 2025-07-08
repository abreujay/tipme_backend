import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SavePixDTO } from './save-pix.dto';
import { QrCodePix } from 'qrcode-pix';

@Injectable()
export class PixService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

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

  async getPix(userId: string, value: number) {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    if (!user.pixKey) throw new BadRequestException('Chave Pix não cadastrada');

    const qrCodePix = QrCodePix({
      version: '01',
      key: user.pixKey,
      name: user.pixName || user.userName,
      city: user.pixCity || 'São Paulo',
      transactionId: 'YOUR_TRANSACTION_ID',
      message: 'Pay me :)',
      cep: '99999999',
      value: value,
    });

    return {
      pixKey: user.pixKey,
      name: user.pixName || user.userName,
      city: user.pixCity,
      amount: value,
      payload: qrCodePix.payload,
    };
  }
}
