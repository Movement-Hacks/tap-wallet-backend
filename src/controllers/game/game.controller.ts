import { Body, Controller, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { SaveRequestBody } from "./dtos"
import { GameService } from "./game.service"
import { AccountId, JwtAuthGuard } from "../shared"

@ApiTags("Auth")
@Controller("api/auth")

@Controller()
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post("save")
    async save(
        @AccountId() accountId: string,
        @Body() body: SaveRequestBody,
    ) {
        return this.gameService.save({
            accountId,
            body
        })
    }
}