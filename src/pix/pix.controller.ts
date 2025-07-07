import { Controller, Post, Body, UseInterceptors, ClassSerializerInterceptor, Get, Patch, UseGuards, Request } from '@nestjs/common';
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
        await this.pixService.savePix(req.user.userId, pixData);
        return { message: 'Chave Pix salva com sucesso' };
    }

}
