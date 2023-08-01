import { faker } from "@faker-js/faker/locale/en_CA";
import { OfferPostModel, PostModel, RequestPostModel } from "../models/posts";
import { PostDocument, UserDocument } from "../types";

export const fakeOfferPost = (author: UserDocument): PostDocument => {
  return new OfferPostModel({
    title: faker.lorem.words(3),
    author: author,
    location: {
      lat: author.location.lat,
      lng: author.location.lng,
      postalCode: author.location.postalCode,
    },
    items: [
      {
        name: faker.commerce.productName(),
        quantity: faker.number.int({ min: 1, max: 10 }),
        price: faker.commerce.price({ min: 0, max: 1000 }),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
      },
      {
        name: faker.commerce.productName(),
        quantity: faker.number.int({ min: 1, max: 10 }),
        price: faker.commerce.price({ min: 0, max: 100 }),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
      },
    ],
  });
};

export const fakeRequestPost = (author: UserDocument): PostDocument => {
  const request = new RequestPostModel({
    title: faker.lorem.words(3),
    author: author,
    location: {
      lat: author.location.lat,
      lng: author.location.lng,
      postalCode: author.location.postalCode,
    },
    items: [
      {
        name: faker.commerce.productName(),
        quantity: faker.number.int({ min: 1, max: 1000 }),
        price: faker.commerce.price({ min: 0, max: 10 }),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
      },
      {
        name: faker.commerce.productName(),
        quantity: faker.number.int({ min: 1, max: 1000 }),
        price: faker.commerce.price({ min: 0, max: 100 }),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
      },
    ],
  });

  return request;
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
