import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AccountEntity, GameEntity } from "@database"
import { GameService } from "./game.service"
import { GameController } from "./game.controller"

@Module({
    imports: [TypeOrmModule.forFeature([AccountEntity, GameEntity])],
    controllers: [GameController],
    providers: [GameService],
})
export class GameModule {}
