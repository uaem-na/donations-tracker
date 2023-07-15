import { PostModel } from "../models/posts";
import { fakeOfferPost } from "../models/posts/post.offer.model";
import { fakeRequestPost } from "../models/posts/post.request.model";
import { PostDocument, UserDocument } from "../types";

export const seedPosts = async (
  destroy: boolean,
  count: number,
  users: UserDocument[]
): Promise<PostDocument[]> => {
  if (destroy) {
    console.log("🚀 ~ file: seed.posts.ts ~ seedPosts ~ destroy:", destroy);
    // delete the whole collection
    await PostModel.deleteMany({});
  }

  const admins = users.filter((user) => user.isAdmin() === true);
  const individuals = users.filter((user) => user.isIndividual() === true);
  const organizations = users.filter((user) => user.isOrganization() === true);

  const posts: PostDocument[] = [];
  const length = await PostModel.countDocuments();
  if (length === 0) {
    // make random posts for admins
    for (let i = 0; i < admins.length; i++) {
      const user = admins[i];

      for (let j = 0; j < count; j++) {
        const offer = fakeOfferPost(user);
        const request = fakeRequestPost(user);

        posts.push(offer, request);
      }
    }

    // make random posts for individuals
    for (let i = 0; i < individuals.length; i++) {
      const user = individuals[i];

      for (let j = 0; j < count; j++) {
        const offer = fakeOfferPost(user);
        const request = fakeRequestPost(user);

        posts.push(offer, request);
      }
    }

    // make random posts for organizations
    for (let i = 0; i < organizations.length; i++) {
      const user = organizations[i];

      for (let j = 0; j < count; j++) {
        const offer = fakeOfferPost(user);
        const request = fakeRequestPost(user);

        posts.push(offer, request);
      }
    }

    if (posts.length > 0) {
      const ops = posts.map((doc) => ({
        insertOne: { document: doc },
      }));
      const result = await PostModel.bulkWrite(ops);
      const added = result.insertedCount;
      console.log("🚀 ~ file: seed.posts.ts ~ added:", added);
    }
  }

  return posts || [];
};
