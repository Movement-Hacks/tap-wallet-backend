import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString, IsUUID } from "class-validator"
import { BaseApiResponse, BaseAuthInput } from "@common"

export class SaveRequestBody {
  @ApiProperty({ default: 69 })
  @IsNumber()
      balance: string

  @ApiProperty({ default: 96 })
  @IsNumber()
      totalBonus: string
}

export class SaveResponseData implements BaseApiResponse {
  @IsString()
      message: string
}

export class SaveInput implements BaseAuthInput<SaveRequestBody> {
  @IsUUID()
      accountId: string
  body: SaveRequestBody
}
