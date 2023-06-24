import { Post } from "../models";
import { IPost, IPostDocument } from "../types";

export class PostService {
  async createPost(post: Partial<IPost>) {
    const {
      author: userId,
      type,
      status,
      title,
      description,
      location,
      tags,
      images,
      views,
    } = post;

    const newPost = new Post({
      userId,
      type,
      status,
      title,
      description,
      location,
      tags,
      images,
      views,
    });

    return await newPost.save();
  }

  async getPosts(): Promise<IPostDocument[]> {
    // TODO: should we filter by some attributes?
    const posts = await Post.find();

    return posts;
  }

  async getPost(id: string): Promise<IPostDocument | null> {
    const post = await Post.findById(id);

    return post;
  }

  async updatePost(id: string, update: Partial<IPost>) {
    const post = await this.getPost(id);

    if (!post) {
      throw new Error(`Error finding post ${id}.`);
    }

    Object.assign(post, update);

    return await post.save();
  }

  async deletePost(id: string): Promise<void> {
    const result = await Post.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      throw new Error(`Error deleting post ${id}.`);
    }
  }

  async getUserPosts(userId: string): Promise<IPostDocument[]> {
    const posts = await Post.find({ author: userId });

    return posts;
  }
}
