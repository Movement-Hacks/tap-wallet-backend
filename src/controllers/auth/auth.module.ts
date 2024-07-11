import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AccountEntity } from "@database"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"

@Module({
    imports: [TypeOrmModule.forFeature([AccountEntity])],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
