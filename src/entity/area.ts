import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
@Entity()
@ObjectType()
export class Area {
  @ObjectIdColumn()
  @Field(() => ID)
  id: ObjectID;

  @Field()
  @Column()
  area_id: number;

  @Field()
  @Column()
  area_name: string;
}
