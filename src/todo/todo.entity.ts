import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class Todo {

  @PrimaryGeneratedColumn()
  @Field(() => ID )
  id: string;

  @Column()
  title: string;

  @Column({ default: false })
  done: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;

  @ManyToOne(() => User, (user: User) => user.todos)
  user: User;
}