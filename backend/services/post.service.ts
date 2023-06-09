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
    const posts = await PostModel.find();

    return posts;
  }

  async getPost(id: string): Promise<PostDocument | null> {
    const post = await PostModel.findById(id);

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
}
