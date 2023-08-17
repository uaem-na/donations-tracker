export namespace ApiModel {
  export type PostAuthor = {
    firstName: string;
    id: string;
    lastName: string;
    email: string;
  };

  export type PostItem = {
    name: string;
    category: PostItemCategory;
    description: string;
    price: number;
    quantity: number;
    id: string;
  };

  export type PostItemCategory = {
    value: string;
    label: string;
  };

  export type PostLocation = {
    lat?: number;
    lng?: number;
    postalCode?: string;
    id: string;
  };

  export type Post = {
    author: PostAuthor;
    createdAt: string;
    id: string;
    item: PostItem;
    location: PostLocation;
    status: "request" | "offer";
    type: string;
    updatedAt: string;
    views: number;
  };

  export type User = {
    id: string;
    username: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    verified: boolean;
    active: boolean;
    starred: Post[];
  };
}

export namespace ApiResponse {
  export type Session = {
    id: string;
    username: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    verified: boolean;
    starred: string[]; // post ids
  };

  export type PaginatedList<T> = {
    data: T[];
    total: number;
    page: number;
    per_page: number;
  };
}

export namespace QueryArgs {
  export namespace Filters {
    export type PostType = {
      post_type: string;
    };

    export type UserType = {
      user_type: string;
    };

    export type Categories = {
      categories: string[];
    };

    export type PostStatus = {
      status?: "all" | "open" | "closed" | "pending-approval";
    };

    export type All = PostType & UserType & Categories & PostStatus;
  }

  export type Pagination = {
    per_page: number;
    page: number;
  };

  export namespace Posts {
    export type GetPost = {
      postId: string;
    };

    export type CreatePost = Omit<
      ApiModel.Post,
      | "id"
      | "author"
      | "createdAt"
      | "updatedAt"
      | "views"
      | "location"
      | "item"
      | "status"
    > & {
      location: Omit<ApiModel.PostLocation, "id">;
      item: Omit<ApiModel.PostItem, "id">[];
    };

    export type EditPost = CreatePost & {
      id: string;
    };

    export type DeletePost = Pick<ApiModel.Post, "id">;

    export type StarPost = Pick<ApiModel.Post, "id">;

    export type GetAvailableItemCategories = {
      locale: string;
    };

    export type GetPaginatedPosts = Pagination & Filters.All;
  }

  export namespace Users {
    export type GetUser = {
      userId: string;
    };

    export type GetStarredPosts = Pagination &
      Filters.PostType &
      Filters.UserType &
      Filters.Categories & {
        userId: string;
      };
  }
}

export namespace MutationArgs {
  export namespace Auth {
    export type Login = {
      username: string;
      password: string;
    };

    export type IndividualRegister = {
      username: string;
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    };

    export type OrganizationRegister = {
      username: string;
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      phone: string;
      organization: string;
      streetAddress: string;
      postalCode: string;
      city: string;
      province: string;
    };

    export type Register = IndividualRegister & OrganizationRegister;
  }

  export namespace Users {
    export type SetUserActive = {
      userId: string;
      active: boolean;
    };
  }
}
