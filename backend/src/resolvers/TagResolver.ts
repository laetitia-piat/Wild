import { UpdateTagInput } from "../input/UpdateAdInput";
import { Tag } from "../entities/tag";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver(Tag)
class TagResolver {
  static Query: any;
  static Mutation: any;
  @Query(() => [Tag])
  async getAllTags() {
    const Tags = await Tag.find();
    return Tags;
  }

  @Query(() => Tag)
  async getTagById(@Arg("id") id: number) {
    const tag = await Tag.findOneByOrFail({ id: id });
    return tag;
  }

  // @Mutation(() => Tag)
  // async createNewTag(@Arg("data") newAdData: TagInput) {
  //   const TagToSave = new Tag();
  //   TagToSave.id = newAdData.id;

  //   const result = await TagToSave.save();
  //   return result;
  // }

  @Mutation(() => String)
  async updateTag(@Arg("data") updateData: UpdateTagInput) {
    let tagToUpdate = await Tag.findOneByOrFail({
      id: updateData.id,
    });
    tagToUpdate = Object.assign(tagToUpdate, updateData);
    const result = await tagToUpdate.save();
    console.log(result);
    return "Tag has been updated";
  }

  @Mutation(() => String)
  async deleteTag(@Arg("id") id: number) {
    const result = await Tag.delete(id);
    console.log(result);
    return "Tag has been deleted";
  }
}

export default TagResolver;
