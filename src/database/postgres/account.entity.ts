import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm"
import { Field, Float, ID, Int, ObjectType } from "@nestjs/graphql"

@ObjectType()
@Entity("account")
export class AccountEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
      accountId: string

  @Field(() => String)
  @Column({ type: "varchar", length: 66, unique: true })
      address: string

  @Field(() => Int)
  @Column({ type: "int", default: 0 })
      balance: number

  @Field(() => Int)
  @Column({ type: "int", default: 1 })
      level: number

  @Field(() => Float)
  @Column({ type: "float", default: 0 })
      progress: number

  @Field(() => Float)
  @Column({ type: "float", default: 1 })
      autoTapperLevel: number

  @Field(() => Date)
  @CreateDateColumn()
      createdAt: Date

  @Field(() => Date)
  @UpdateDateColumn()
      updatedAt: Date
}
