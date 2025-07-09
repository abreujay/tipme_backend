import { Controller, Post, Body, UseInterceptors, ClassSerializerInterceptor, Get, Patch, UseGuards, Request, Param, Query, BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PixService } from './pix.service';
import { SavePixDTO } from './save-pix.dto';
@UseInterceptors(ClassSerializerInterceptor)
@Controller('pix')
export class PixController {

    constructor(private readonly pixService: PixService) { }

    @UseGuards(JwtAuthGuard)
    @Post('/save-pix')
    async savePix(@Request() req, @Body() pixData: SavePixDTO) {
      console.log('req.user:', req.user);
      await this.pixService.savePix(req.user.id, pixData);
      return { message: 'Chave Pix salva com sucesso' };
    }

    @Get('/get-pix/:id')
    async getPix(@Param('id') id: string, @Query('value') value: number) {
      const numericValue = Number(value);
      if (isNaN(numericValue)) {
        throw new BadRequestException('Valor inválido');
      }
      return this.pixService.getPix(id, numericValue);
    }

}
