import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"
import { GameEntity } from "./game.entity"
import { Field, ID, ObjectType } from "@nestjs/graphql"

@ObjectType()
@Entity("account")
export class AccountEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
      accountId: string

  @Field(() => String)
  @Column({ type: "varchar", length: 66, unique: true })
      address: string

  @Field(() => GameEntity)
  @OneToOne(() => GameEntity, (game) => game.account)
      game: GameEntity

  @Field(() => Date)
  @CreateDateColumn()
      createdAt: Date

  @Field(() => Date)
  @UpdateDateColumn()
      updatedAt: Date
}
