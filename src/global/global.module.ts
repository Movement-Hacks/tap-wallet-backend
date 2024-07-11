import { Global, Module } from "@nestjs/common"
import { AptosService, TokenService } from "./services"
import { JwtService } from "@nestjs/jwt"
import { JwtStrategy } from "./strategies"

@Global()
@Module({
    imports: [],
    exports: [JwtStrategy, AptosService, TokenService],
    providers: [JwtService, JwtStrategy, AptosService, TokenService],
})
export class GlobalModule {}
