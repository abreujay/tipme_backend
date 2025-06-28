import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        const secret = configService.get<string>('JWT_SECRET');

        if (!secret) {
            throw new Error('JWT_SECRET não definido no .env');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret,
            ignoreExpiration: false,
        });
    }

    // O método validate é chamado automaticamente se o token for válido
    async validate(payload: any) {
        // Você pode validar se o usuário ainda está ativo, etc.
        if (!payload.sub) {
            throw new UnauthorizedException('Token inválido');
        }

        return { userId: payload.sub, email: payload.email };
    }
}
