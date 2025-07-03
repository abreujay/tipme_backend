import { Controller, Post, Body, UseInterceptors, ClassSerializerInterceptor, Get, Patch, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PixService } from './pix.service';
import { PixDTO } from './pix.dto';
@UseInterceptors(ClassSerializerInterceptor)
@Controller('pix')
export class PixController {

    constructor(private readonly pixService: PixService) { }

    @UseGuards(JwtAuthGuard)
    @Post('/save-pix')
    async savePix(@Request() req, @Body() pix: PixDTO) {
        
        return this.pixService.savePix(req.user.userId, pix);
    }
}
