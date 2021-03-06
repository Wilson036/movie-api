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

  @Field()
  @Column()
  avatar: string;

  @Column()
  @Field()
  password: string;

  @Field(() => [String])
  @Column()
  favorite_movies: Array<string> = [];

  @Field()
  @Column()
  createdAt: Date;
}
