import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm"
import { AccountEntity } from "./account.entity"

@Entity()
export class GameEntity {
  @PrimaryGeneratedColumn("uuid")
      gameId: string

  @Column({ type: "int" })
      balance: string

  @Column({ type: "uuid" })
      accountId: string

  @OneToOne(() => AccountEntity, (account) => account.game)
  @JoinColumn({ name: "gameId" })
      account: AccountEntity
}
