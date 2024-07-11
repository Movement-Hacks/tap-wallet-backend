import { Body, Controller, Post } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { CreateSessionRequestBody } from "./dtos"
import { AuthService } from "./auth.service"

@ApiTags("Auth")
@Controller("api/auth")

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("create-session")
    async createSession(
        @Body() body: CreateSessionRequestBody,
    ) {
        return this.authService.createSession(body)
    }
}