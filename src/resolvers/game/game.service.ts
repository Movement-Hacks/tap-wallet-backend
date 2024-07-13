import { Injectable, NotFoundException } from "@nestjs/common"
import { LoadInput, LoadResponseSchema } from "./dtos"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { GameEntity } from "@database"

@Injectable()
export class GameService {
    constructor(
    @InjectRepository(GameEntity)
    private readonly gameRepository: Repository<GameEntity>,
    ) {}

    public async load({ address }: LoadInput): Promise<LoadResponseSchema> {
        const game = await this.gameRepository.findOne({
            where: {
                account: {
                    address,
                },
            },
            relations: {
                account: true
            }
        })
        if (!game) throw new NotFoundException("Game not found.")

        return {
            game
        }
    }
}
