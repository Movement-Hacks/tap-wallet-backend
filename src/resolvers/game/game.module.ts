import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AccountEntity } from "@database"
import { GameService } from "./game.service"
import { GameResolver } from "./game.resolver"

@Module({
    imports: [TypeOrmModule.forFeature([AccountEntity])],
    controllers: [],
    providers: [GameResolver, GameService],
})
export class GameModule {}
