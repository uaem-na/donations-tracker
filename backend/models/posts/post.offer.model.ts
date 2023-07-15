import { faker } from "@faker-js/faker/locale/en_CA";
import { Model, Schema } from "mongoose";
import { PostDiscriminator, PostType } from "../../constants";
import { OfferPost, PostDocument, UserDocument } from "../../types";
import PostModel from "./post.base.model";

const OfferPostSchema: Schema<OfferPost> = new Schema({});

OfferPostSchema.pre("validate", function (next) {
  this.type = PostType.OFFER;

  next();
});

export const OfferPostModel: Model<PostDocument> =
  PostModel.discriminator<PostDocument>(
    PostDiscriminator.OFFER,
    OfferPostSchema
  );

export const fakeOfferPost = (author: UserDocument): PostDocument => {
  return new OfferPostModel({
    title: faker.lorem.words(3),
    author: {
      username: author.username,
      email: author.email,
    },
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
