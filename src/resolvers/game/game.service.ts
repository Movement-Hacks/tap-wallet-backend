import { Injectable } from "@nestjs/common"
import { LoadInput, LoadResponseSchema } from "./dtos"
import { InjectRepository } from "@nestjs/typeorm"
import { DeepPartial, Repository } from "typeorm"
import { AccountEntity } from "@database"

@Injectable()
export class GameService {
    constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    ) {}

    public async load({ address }: LoadInput): Promise<LoadResponseSchema> {
        const account = await this.accountRepository.findOne({
            where: {
                address,
            },
        })
        const _account: DeepPartial<AccountEntity> = account ?? {
            autoTapperLevel: 1,
            balance: 0,
            progress: 0,
            level: 1,
        }

        return {
            account: _account,
        }
    }
}
