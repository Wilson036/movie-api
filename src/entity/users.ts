import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
@Entity()
@ObjectType()
export class Users {
  @ObjectIdColumn()
  @Field(() => ID)
  id: ObjectID;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  email: string;

  @Column()
  @Field()
  password: string;

  @Field()
  @Column()
  createdAt: Date;
}
