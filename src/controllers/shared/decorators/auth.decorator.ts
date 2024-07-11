import { AccountEntity } from "@database"
import { createParamDecorator, ExecutionContext } from "@nestjs/common"

export const PayloadFromBody = createParamDecorator((_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.body.payload
})

export const Account = createParamDecorator(
    (_, ctx: ExecutionContext): AccountEntity => {
        const request = ctx.switchToHttp().getRequest()
        return request.account
    },
)
