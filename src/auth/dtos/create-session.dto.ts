import { IsHexadecimal, IsString } from "class-validator"

export class CreateSessionRequestBody {
  @IsString()
      message: string
  @IsString()
  @IsHexadecimal()
      address: string
  @IsString()
      signature: string
}

export class CreateSessionResponseData {
  @IsString()
      accessToken: string
  @IsString()
  @IsHexadecimal()
      refreshToken: string
}
