import { TokenType, jwtConfig } from "@config"
import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) {}

    public async createToken<Payload extends Record<string, unknown>>(
        payload: Payload,
        tokenType: TokenType = TokenType.AccessToken,
    ) {
        const { expiryTimes, secret } = jwtConfig()
        return await this.jwtService.signAsync(payload, {
            expiresIn: expiryTimes[tokenType],
            secret,
        })
    }
}
