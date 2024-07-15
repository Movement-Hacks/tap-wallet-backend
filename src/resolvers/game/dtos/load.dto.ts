import { IsHexadecimal } from "class-validator"
import { Field, InputType, ObjectType } from "@nestjs/graphql"
import { AccountEntity } from "@database"
import { DeepPartial } from "typeorm"

@InputType()
export class LoadInput {
  @Field(() => String)
  @IsHexadecimal()
      address: string
}

@ObjectType()
export class LoadResponseSchema {
  @Field(() => AccountEntity)
      account: DeepPartial<AccountEntity>
}
