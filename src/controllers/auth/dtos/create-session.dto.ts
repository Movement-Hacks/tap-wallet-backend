import { ApiProperty } from "@nestjs/swagger"
import { IsHexadecimal, IsString } from "class-validator"

export class CreateSessionRequestBody {
  @ApiProperty({ default: "Hello world!" })
  @IsString()
      message: string

  @ApiProperty({
      default:
      "0x1d6e4b37cbda1105618acfa86b10bcc92e74baf05df5afce4f4d0297d8d6427b",
  })
  @IsHexadecimal()
      publicKey: string

  @ApiProperty({
      default:
      "0x7ab60faa9ea55dbf3b8dc93177236b79abbefb67f2c8539f50d9ca3bc7c3f1107cfc316e0ea2da321d2a81bb63b0c66e94e018bbb531ccace8149ecfc29a8706",
  })
  @IsHexadecimal()
      signature: string
}

export class CreateSessionResponseData {
  @IsString()
      accessToken: string
}
