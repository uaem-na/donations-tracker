import { faker } from "@faker-js/faker/locale/en_CA";
import { Model, Schema } from "mongoose";
import { PostDiscriminator, PostType } from "../../constants";
import { PostDocument, RequestPost, UserDocument } from "../../types";
import PostModel from "./post.base.model";

const RequestPostSchema: Schema<RequestPost> = new Schema({});

RequestPostSchema.pre("validate", function (next) {
  this.type = PostType.REQUEST;

  next();
});

export const RequestPostModel: Model<PostDocument> =
  PostModel.discriminator<PostDocument>(
    PostDiscriminator.REQUEST,
    RequestPostSchema
  );

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
