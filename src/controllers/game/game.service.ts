import { Injectable } from "@nestjs/common"
import { SaveInput, SaveResponseData } from "./dtos"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { GameEntity } from "@database"

@Injectable()
export class GameService {
    constructor(
    @InjectRepository(GameEntity)
    private readonly gameRepository: Repository<GameEntity>,
    ) {}

    public async save({ accountId, body }: SaveInput): Promise<SaveResponseData> {
        const { balance, totalBonus } = body

        let game = await this.gameRepository.findOne({
            where: {
                gameId: accountId,
            },
        })
        if (!game) {
            game = await this.gameRepository.save({
                balance,
                totalBonus,
            })
        }

        return {
            message: "Save successfully.",
        }
    }
}
