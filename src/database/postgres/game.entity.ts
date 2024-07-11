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

  @Column({ type: "int", default: 0 })
      balance: number

  @Column({ type: "float", default: 0 })
      totalBonus: number

  @Column({ type: "uuid" })
      accountId: string

  @OneToOne(() => AccountEntity, (account) => account.game)
  @JoinColumn({ name: "accountId" })
      account: AccountEntity

  @CreateDateColumn()
      createdAt: Date

  @UpdateDateColumn()
      updatedAt: Date
}
