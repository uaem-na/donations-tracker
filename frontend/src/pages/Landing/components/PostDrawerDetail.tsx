import { PostApiResponse } from "@services/posts";

interface IPostDrawerDetailProps {
  post: PostApiResponse;
}

export const PostDrawerDetail = ({ post }: IPostDrawerDetailProps) => {
  return <pre>{JSON.stringify(post, null, 2)}</pre>;
};
