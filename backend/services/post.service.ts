import { PostCategory } from "../constants";
import { PostModel } from "../models/posts";
import { Post, PostDocument } from "../types";

export class PostService {
  async createPost(post: Partial<Post>) {
    const newPost = new PostModel({
      ...post,
    });

    return await newPost.save();
  }

  async getPosts(): Promise<PostDocument[]> {
    // TODO: should we filter by some attributes?
    const posts = await PostModel.find().populate(
      "author",
      "firstName lastName userName -__t"
    );

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

  getItemCategories(): string[] {
    return Object.values(PostCategory);
  }
}
