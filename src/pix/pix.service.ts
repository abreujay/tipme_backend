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
    console.log('savePix: userId', userId);
    console.log('savePix: pixData', pixData);
  
    const user = await this.userRepository.findOne({ where: { userId } });
    console.log('savePix: user', user);
  
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
  
    const updatedFields: Partial<User> = {
      pixKey: pixData.pixKey,
      pixName: pixData.pixName,
      pixCity: pixData.pixCity,
    };
  
    console.log('savePix: updatedFields', updatedFields);
  
    await this.userRepository.update({ userId }, updatedFields);
    console.log('savePix: update executado');
  
    // Verifique se os dados estão sendo atualizados corretamente
    const userUpdated = await this.userRepository.findOne({ where: { userId } });
    console.log('savePix: userUpdated', userUpdated);
  
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
