import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
@ObjectType()
export class Showtime {
  @ObjectIdColumn()
  @Field(() => ID)
  id: ObjectID;

  @Field()
  @Column()
  theater_id: string;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  movie_id: string;

  @Field()
  @Column()
  show_time: string;

  @Field()
  @Column()
  date: string;
}
