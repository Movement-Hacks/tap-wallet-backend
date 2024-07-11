import { Injectable } from "@nestjs/common"
import { CreateSessionRequestBody, CreateSessionResponseData } from "./dtos"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { AccountEntity } from "@database"
import { AptosService, TokenService } from "@global"

@Injectable()
export class AuthService {
    constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    private readonly tokenService: TokenService,
    private readonly aptosService: AptosService,
    ) {}

    public async createSession(body: CreateSessionRequestBody): Promise<CreateSessionResponseData> {
        const { message, signature, publicKey } = body

        const address = this.aptosService.verifyMessage({
            message,
            signature,
            publicKey,
        })
        console.log(address)

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

        const accessToken = await this.tokenService.createToken({
            accountId: account.accountId,
            address,
        })

        return {
            accessToken
        }
    }
}
