import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { hashPasswordTransfrom } from 'src/helpers/crypto';
import { Todo } from 'src/todo/todo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    @Field(() => ID )
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({
        transformer: hashPasswordTransfrom
    })
    @HideField()
    password: string;

    @OneToMany(() => Todo, (todo: Todo) => todo.user)
    todos: Todo[];

}