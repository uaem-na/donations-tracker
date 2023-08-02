import { faker } from "@faker-js/faker/locale/en_CA";
import { PostCategories, PostType } from "../constants";
import { OfferPostModel, PostModel, RequestPostModel } from "../models/posts";
import { PostDocument, UserDocument } from "../types";

export const fakePost = (
  author: UserDocument,
  type: PostType
): PostDocument => {
  const content = {
    title: faker.lorem.words(5),
    author: author,
    location: {
      // Montreal boundaries rough estimate
      lat: faker.location.latitude({
        min: 45.3,
        max: 45.7,
        precision: 5,
      }),
      lng: faker.location.longitude({
        min: -73.9,
        max: -73.2,
        precision: 5,
      }),
      postalCode: author.location.postalCode,
    },
    item: {
      name: faker.commerce.productName(),
      quantity: faker.number.int({ min: 1, max: 10 }),
      price: faker.commerce.price({ min: 0, max: 1000 }),
      description: faker.commerce.productDescription(),
      category: faker.helpers.arrayElement(PostCategories),
    },
  };

  // instantiate RequestPostModel if type is PostType.REQUEST else instantiate OfferPostModel
  const post =
    type === PostType.REQUEST
      ? new RequestPostModel(content)
      : new OfferPostModel(content);

  return post;
};

const addRandomPosts = (
  posts: PostDocument[],
  user: UserDocument,
  count: number
) => {
  for (let j = 0; j < count; j++) {
    const offer = fakePost(user, PostType.OFFER);
    const request = fakePost(user, PostType.REQUEST);

    posts.push(offer, request);
  }

  return posts;
};

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
    admins.map((user) => addRandomPosts(posts, user, count));
    individuals.map((user) => addRandomPosts(posts, user, count));
    organizations.map((user) => addRandomPosts(posts, user, count));

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
