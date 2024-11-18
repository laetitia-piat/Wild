import { Tag } from "../entities/Tag";
import { Field, InputType } from "type-graphql";

@InputType()
class TagInput implements Partial<Tag> {
  @Field(() => String)
  name: string;

  @Field({ nullable: true })
  id?: number;
}

export default TagInput;
