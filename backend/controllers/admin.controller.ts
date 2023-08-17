import { debug } from "debug";
import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import { FilterQuery } from "mongoose";
import { PostStatus } from "../constants";
import { AuthorizationError } from "../errors";
import { PostDto } from "../models/posts";
import { PostService, UserService } from "../services";
import { PaginatedResponse, PostDocument } from "../types";
import { tryParseFilterQuery, tryParsePaginationQuery } from "../utils";
import {
  hasAdminRole,
  hasUser,
  validatePaginationRequest,
  validatePostsFilterRequest,
} from "./validators";

const log = debug("backend:admin");

export class AdminController {
  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  pre = (req) => {
    if (!hasUser(req) || !hasAdminRole(req)) {
      throw new AuthorizationError("Unauthorized");
    }
  };

  getPostsToVerify = expressAsyncHandler(async (req, res, next) => {
    this.pre(req);

    log(`${req.user?.id} is getting posts to verify`);

    await validatePaginationRequest({ req, optional: false });
    await validatePostsFilterRequest({ req, optional: false });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
      return;
    }

    const { page, limit } = tryParsePaginationQuery(req);
    const { postType, userType, categories } = tryParseFilterQuery(req);

    const filterQuery: FilterQuery<PostDocument> = {
      status: PostStatus.PENDING_APPROVAL,
      ...(postType && { type: postType }),
      ...(userType && { authorType: userType }),
      ...(categories && {
        "item.category": { $in: categories },
      }),
    };

    const [posts, count] = await this.postService.getPaginatedPosts(
      page,
      limit,
      filterQuery,
      { updatedAt: -1, createdAt: -1 }
    );

    const postDtos = posts.map((post) => PostDto.fromDocument(post));

    const response: PaginatedResponse<PostDto> = {
      data: postDtos || [],
      page: page,
      per_page: limit,
      total: count,
    };

    res.json(response);
  });

  getUsersToVerify = expressAsyncHandler(async (req, res, next) => {
    this.pre(req);

    log(`${req.user?.id} is getting users to verify`);
  });
}
