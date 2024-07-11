import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { GameEntity } from "./game.entity"

@Entity()
export class AccountEntity {
  @PrimaryGeneratedColumn("uuid")
      accountId: string

  @Column({ type: "varchar", length: 66, unique: true })
      address: string

  @OneToOne(() => GameEntity, (game) => game.account)
      game: GameEntity
}

export type Payload = Partial<AccountEntity>;
