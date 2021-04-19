import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
@ObjectType()
export class Theater {
  @ObjectIdColumn()
  @Field(() => ID)
  id: ObjectID;

  @Field()
  @Column()
  theater_id: string;

  @Field()
  @Column()
  theater_name: string;

  @Field()
  @Column()
  area_id: string;
}
