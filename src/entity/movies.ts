import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
@ObjectType()
export class Movies {
  @ObjectIdColumn()
  @Field(() => ID)
  id: ObjectID;

  @Field()
  @Column()
  movie_id: string;

  @Field()
  @Column()
  title: string;

  @Column()
  @Field(() => String, { nullable: true })
  anticipation: string;

  @Column()
  @Field(() => String, { nullable: true })
  img_src: string;

  @Field(() => Date, { nullable: true })
  @Column()
  release_date: Date;
}
