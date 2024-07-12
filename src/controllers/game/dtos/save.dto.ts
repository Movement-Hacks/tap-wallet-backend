import { ApiProperty } from "@nestjs/swagger"
import {
    IsDate,
    IsHexadecimal,
    IsNumber,
    IsString,
} from "class-validator"
import { BaseApiResponse, Signature } from "@common"
import { Type } from "class-transformer"

export class SavePayload {
  @ApiProperty({ default: 69 })
  @IsNumber()
      balance: number

  @ApiProperty({ default: 96 })
  @IsNumber()
      totalBonus: number

  @ApiProperty({ default: new Date() })
  @Type(() => Date)
  @IsDate() 
      timestamp: Date
    
  constructor(partial: Partial<SavePayload>) {
      Object.assign(this, partial)
  }
}

export class SaveRequestBody implements Signature<SavePayload> {
  @ApiProperty()
      payload: SavePayload

  @ApiProperty({
      default:
      "0xb64e012786d2fb053d7f387ac4d9c2dbe65157a72d729ceccc985237eed9a09d14c659bf0442f19a90dae4f55c1c4215925df05eccf7594fcb746a376fa23600",
  })
  @IsHexadecimal()
      signature: string

  @ApiProperty({
      default:
      "0x1d6e4b37cbda1105618acfa86b10bcc92e74baf05df5afce4f4d0297d8d6427b",
  })
  @IsHexadecimal()
      publicKey: string
}

export class SaveResponseData implements BaseApiResponse {
  @ApiProperty({
      default: "Save successfully.",
  })
  @IsString()
      message: string
}
