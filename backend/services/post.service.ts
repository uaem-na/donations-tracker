import { FilterQuery, SortOrder } from "mongoose";
import {
  BilingualPostCategory,
  FilterPostType,
  PostCategory,
} from "../constants";
import { PostModel } from "../models/posts";
import { UserModel } from "../models/users";
import { Post, PostDocument } from "../types";

export class PostService {
  async createPost(post: Partial<Post>) {
    const newPost = new PostModel({
      ...post,
    });

    return await newPost.save();
  }

  async getPostsCount(
    type: FilterPostType = FilterPostType.ALL
  ): Promise<number> {
    const count = await PostModel.countDocuments({
      ...(type !== FilterPostType.ALL && { type: type }),
    });

    return count;
  }

  async getPaginatedPosts(
    page: number,
    limit: number,
    filter: FilterQuery<PostDocument> = {},
    sort:
      | string
      | { [key: string]: SortOrder | { $meta: "textScore" } }
      | [string, SortOrder][]
      | null
      | undefined = {}
  ): Promise<[PostDocument[], number]> {
    if (!page || !limit || page < 0 || limit < 0) {
      throw new Error("Error paginating posts. Invalid page or limit.");
    }

    const posts = await PostModel.find({
      ...(filter && { ...filter }),
    })
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("author", "role firstName lastName userName -__t");

    return [posts, await PostModel.countDocuments(filter)];
  }

  async getPosts(filter?: FilterQuery<PostDocument>): Promise<PostDocument[]> {
    const posts = await PostModel.find({
      ...(filter && { ...filter }),
    })
      .sort({ updatedAt: -1, createdAt: -1 })
      .populate("author", "firstName lastName userName -__t");

    return posts;
  }

  async getPost(id: string): Promise<PostDocument | null> {
    const post = await PostModel.findById(id).populate("author");

    return post;
  }

  async updatePost(id: string, update: Partial<Post>) {
    const post = await this.getPost(id);

    if (!post) {
      throw new Error(`Error finding post ${id}.`);
    }

    Object.assign(post, update);

    return await post.save();
  }

  async deletePost(id: string): Promise<void> {
    const result = await PostModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new Error(`Error deleting post ${id}.`);
    }
  }

  async getPostsByUsername(username: string): Promise<PostDocument[]> {
    const posts = await PostModel.find({ "author.username": username });

    return posts;
  }

  getItemCategories(locale: "en" | "fr"): { value: string; label: string }[] {
    console.log(locale);
    return Object.values(PostCategory).map((value) => {
      console.log(BilingualPostCategory[value][locale]);
      return { value, label: BilingualPostCategory[value][locale] };
    });
  }

  async starPost(postId: string, userId: string): Promise<boolean> {
    const post = await PostModel.findById(postId);
    if (!post) {
      throw new Error(`Error tracking post. Post does not exist.`);
    }

    const user = await UserModel.findById(userId).populate("starred");
    if (!user) {
      throw new Error(`Error tracking post. User does not exist.`);
    }

    const postExists = user.starred.find(
      (post) => post._id.toString() === postId
    );

    if (postExists) {
      // remove post from user's starred posts
      user.starred = user.starred.filter(
        (post) => post._id.toString() !== postId
      );
      await user.save();

      return false;
    } else {
      // add post to user's starred posts
      user.starred.push(post);
      await user.save();

      return true;
    }
  }
}
