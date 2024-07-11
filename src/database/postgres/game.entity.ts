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
import { Field, Float, ID, Int, ObjectType } from "@nestjs/graphql"

@ObjectType()
@Entity("game")
export class GameEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
      gameId: string

  @Field(() => Int)
  @Column({ type: "int", default: 0 })
      balance: number

  @Field(() => Float)
  @Column({ type: "float", default: 0 })
      totalBonus: number

  @Field(() => ID)
  @Column({ type: "uuid" })
      accountId: string

  @Field(() => AccountEntity)
  @OneToOne(() => AccountEntity, (account) => account.game)
  @JoinColumn({ name: "accountId" })
      account: AccountEntity

  @Field(() => Date)
  @CreateDateColumn()
      createdAt: Date

  @Field(() => Date)
  @UpdateDateColumn()
      updatedAt: Date
}
