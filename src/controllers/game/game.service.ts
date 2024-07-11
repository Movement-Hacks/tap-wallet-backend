import { Injectable } from "@nestjs/common"
import { SavePayload, SaveResponseData } from "./dtos"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { AccountEntity, GameEntity } from "@database"

@Injectable()
export class GameService {
    constructor(
    @InjectRepository(GameEntity)
    private readonly gameRepository: Repository<GameEntity>,
    ) {}

    public async save(
        { balance, totalBonus }: SavePayload,
        { accountId }: AccountEntity,
    ): Promise<SaveResponseData> {
        const game = await this.gameRepository.findOne({
            where: {
                accountId
            },
        })
        const gameId = game ? game.gameId : undefined
        
        await this.gameRepository.save({
            gameId,
            balance,
            totalBonus,
            accountId
        })

        return {
            message: "Save successfully.",
        }
    }
}
