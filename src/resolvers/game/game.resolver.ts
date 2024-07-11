import { LoadInput, LoadResponseSchema } from "./dtos"
import { GameService } from "./game.service"
import { Args, Query, Resolver } from "@nestjs/graphql"

@Resolver()
export class GameResolver {
    constructor(private readonly gameService: GameService) {}

    @Query(() => LoadResponseSchema)
    async load(
        @Args("input") input: LoadInput
    ) {
        return this.gameService.load(input)
    }
}
