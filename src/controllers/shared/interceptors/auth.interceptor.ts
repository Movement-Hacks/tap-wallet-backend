import { AccountEntity } from "@database"
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Observable } from "rxjs"
import { Repository } from "typeorm"

@Injectable()
export class AuthInterceptor implements NestInterceptor {
    constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    ) {}

    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<unknown>> {
        const request = context.switchToHttp().getRequest()
        const { address } = request

        let account = await this.accountRepository.findOne({
            where: {
                address,
            },
        })
        if (!account) {
            account = await this.accountRepository.save({
                address,
            })
        }
        request.account = account

        return next.handle()
    }
}
