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

  // Remove acentos, deixa maiúsculo e corta até 25 caracteres
  private formatPixName(name: string): string {
    return name
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()
      .slice(0, 25);
  }

  // Remove acentos, maiúsculo, corta até 15 caracteres
  private formatPixCity(city: string): string {
    return city
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()
      .slice(0, 15);
  }

  // Gera transactionId aleatório com no máximo 15 caracteres
  private generateShortTxId(): string {
    const prefix = 'TX'; // prefixo fixo
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); // 6 chars aleatórios
    const timestampPart = Date.now().toString().slice(-7); // 7 chars do timestamp
    return (prefix + randomPart + timestampPart).slice(0, 15);
  }

  // Atualiza dados Pix do usuário
  async savePix(userId: string, pixData: SavePixDTO) {
    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const updatedFields: Partial<User> = {
      pixKey: pixData.pixKey?.trim(),
      pixName: pixData.pixName?.trim(),
      pixCity: pixData.pixCity?.trim(),
    };

    await this.userRepository.update({ userId }, updatedFields);

    return { message: 'Dados Pix atualizados com sucesso' };
  }

  // Gera payload Pix para pagamento
  async getPix(userId: string, value: number) {
    if (value <= 0) throw new BadRequestException('Valor deve ser maior que zero');

    const user = await this.userRepository.findOne({ where: { userId } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    if (!user.pixKey) throw new BadRequestException('Chave Pix não cadastrada');

    const txid = this.generateShortTxId();
    const name = this.formatPixName(user.pixName || user.userName);
    const city = this.formatPixCity(user.pixCity || 'SAO PAULO');

    const qrCodePix = QrCodePix({
      version: '01',
      key: user.pixKey.trim(),
      name,
      city,
      transactionId: txid,
      value,
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
