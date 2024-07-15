import { ApiProperty } from "@nestjs/swagger"
import {
    IsDateString,
    IsHexadecimal,
    IsInt,
    IsNumber,
    IsString,
} from "class-validator"
import { BaseApiResponse, Signature } from "@common"

export class SavePayload {
  @ApiProperty({ default: 69 })
  @IsNumber()
      balanceChange: number

  @ApiProperty({ default: 1 })
  @IsInt()
      levelChange: number

  @ApiProperty({ default: 69.96 })
  @IsNumber()
      progressChange: number

  @ApiProperty({ default: 1 })
  @IsInt()
      autoTapperLevelChange: number

  @ApiProperty({ default: new Date().toISOString() })
  @IsDateString()
      timestamp: Date
}

export class SaveRequestBody implements Signature {
  @ApiProperty()
      payloadMessage: string

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
