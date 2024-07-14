import { IsHexadecimal } from "class-validator"
import { Field, InputType, ObjectType } from "@nestjs/graphql"
import { GameEntity } from "@database"
import { DeepPartial } from "typeorm"

@InputType()
export class LoadInput {
  @Field(() => String)
  @IsHexadecimal()
      address: string
}

@ObjectType()
export class LoadResponseSchema {
  @Field(() => GameEntity)
      game: DeepPartial<GameEntity>
}
