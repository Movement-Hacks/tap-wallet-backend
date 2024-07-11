import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"
import { AccountEntity } from "./account.entity"

@Entity("game")
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

  @CreateDateColumn()
      createdAt: Date

  @UpdateDateColumn()
      updatedAt: Date
}
