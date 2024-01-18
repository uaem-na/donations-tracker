export namespace ApiModel {
  export type Location = {
    lat?: number;
    lng?: number;
    postalCode?: string;
    id: string;
  };

  export type Address = {
    street: string;
    city: string;
    province: string;
    provinceCode: string;
    postalCode: string;
    country: string;
    countryCode: string;
  };

  export type PostAuthor = Pick<
    User,
    "id" | "displayName" | "email" | "firstName" | "lastName"
  >;

  export type PostItem = {
    name: string;
    category: string;
    description: string;
    price: number;
    quantity: number;
    id: string;
  };

  export type PostItemCategory = {
    value: string;
    label: string;
  };

  export type Post = {
    author: PostAuthor;
    createdAt: string;
    id: string;
    item: PostItem;
    status: "request" | "offer";
    type: string;
    updatedAt: string;
    views: number;
    location: Location;
  };

  export type Report = {
    id: string;
    reporter: User;
    resolver?: User;
    post: Post;
    status: "resolved" | "unresolved";
    notes: string;
  };

  export type UserOrganization = {
    name: string;
    address: Address;
    phone: string;
    type: string;
    verified: boolean;
  };

  export type User = {
    id: string;
    username: string;
    email: string;
    role: string;
    displayName: string;
    firstName: string;
    lastName: string;
    verified: boolean;
    active: boolean;
    starred: Post[];
    location?: Location;
    organization?: UserOrganization;
  };
}

export namespace ApiResponse {
  export type Session = {
    id: string;
    displayName: string;
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

  export type MessageResponse = {
    message: string;
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

    export type PriceRange = {
      price_range: [number, number];
    };

    export type Date = {
      date?: string;
    };

    export type All = PostType &
      UserType &
      Categories &
      PostStatus &
      PriceRange &
      Date;
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
      location: Omit<ApiModel.Location, "id">;
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

    export type GetUserPosts = GetPaginatedPosts & {
      userId: string;
    };
  }

  export namespace Reports {
    export type GetPaginatedReportedPosts = Pagination;

    export type ReportedPost = {
      postId: string;
    };
  }

  export namespace Users {
    export type GetUser = {
      userId: string;
    };

    export type GetStarredPosts = Pagination &
      Filters.PostType &
      Filters.UserType &
      Filters.PriceRange &
      Filters.Categories & {
        userId: string;
      };

    export type GetPaginatedUsers = Pagination & Filters.UserType;
  }
}

export namespace MutationArgs {
  export namespace Auth {
    export type Login = {
      username: string;
      password: string;
    };

    export type IndividualRegister = {
      displayName: string;
      username: string;
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    };

    export type OrganizationRegister = IndividualRegister & {
      phone: string;
      organization: string;
      streetAddress: string;
      postalCode: string;
      city: string;
      province: string;
    };

    export type Register = IndividualRegister & OrganizationRegister;
  }

  export namespace Posts {
    export type ApprovePost = {
      postId: string;
    };

    export type RejectPost = {
      postId: string;
    };
  }

  export namespace Users {
    export type ToggleUserActive = {
      userId: string;
    };

    export type VerifyUser = {
      userId: string;
    };
  }

  export namespace Reports {
    export type CreateReport = {
      postId: string;
      notes: string;
    };

    export type UpdateReport = {
      id: string;
      status: "resolved" | "unresolved";
    };
  }
}
