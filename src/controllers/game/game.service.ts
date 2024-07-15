import { BadRequestException, Injectable } from "@nestjs/common"
import { SavePayload, SaveResponseData } from "./dtos"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { AccountEntity } from "@database"
import { timestampConfig } from "@config"

@Injectable()
export class GameService {
    constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    ) {}

    public async save(
        { balanceChange, autoTapperLevelChange, levelChange, progressChange, timestamp }: SavePayload,
        { accountId, balance, progress, level, autoTapperLevel }: AccountEntity,
    ): Promise<SaveResponseData> {
        if (
            new Date().getMilliseconds() - timestamp.getMilliseconds() >
      timestampConfig().deadline
        ) {
            throw new BadRequestException("Request has expired. Please try again.")
        }

        await this.accountRepository.update(accountId, {
            balance: balance + balanceChange,
            autoTapperLevel: autoTapperLevel + autoTapperLevelChange,
            progress: progress + progressChange,
            level: level + levelChange
        })

        return {
            message: "Save successfully.",
        }
    }
}
