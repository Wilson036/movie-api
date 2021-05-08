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
  satifaction: string;

  @Column()
  @Field(() => String, { nullable: true })
  img_src: string;

  @Field(() => String, { nullable: true })
  @Column()
  release_time: String;

  @Field(() => String, { nullable: true })
  @Column()
  release_text: string;

  @Column()
  @Field(() => String, { nullable: true })
  info_src: string;
}
