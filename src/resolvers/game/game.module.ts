import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AccountEntity, GameEntity } from "@database"
import { GameService } from "./game.service"
import { GameResolver } from "./game.controller"

@Module({
    imports: [TypeOrmModule.forFeature([AccountEntity, GameEntity])],
    controllers: [],
    providers: [GameResolver, GameService],
})
export class GameModule {}
