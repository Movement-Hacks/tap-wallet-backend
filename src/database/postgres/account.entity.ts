import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"
import { GameEntity } from "./game.entity"

@Entity("account")
export class AccountEntity {
  @PrimaryGeneratedColumn("uuid")
      accountId: string

  @Column({ type: "varchar", length: 66, unique: true })
      address: string

  @OneToOne(() => GameEntity, (game) => game.account)
      game: GameEntity

  @CreateDateColumn()
      createdAt: Date

  @UpdateDateColumn()
      updatedAt: Date
}

export type Payload = Partial<AccountEntity>;
