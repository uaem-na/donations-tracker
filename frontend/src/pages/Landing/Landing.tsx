import { GoogleMapWrapper } from "@components/GoogleMapWrapper/GoogleMapWrapper";
import { Posts } from "@pages/Landing/components/Posts";
import { PostApiResponse } from "@services/posts";
import { useState } from "react";

/*
 * TODO: Mobile view
 * */
export const LandingPage = () => {
  const [posts, setPosts] = useState<PostApiResponse[]>();
  const [selectedPost, setSelectedPost] = useState<PostApiResponse | null>(
    null
  );

  const postClickEventHandler = (post: PostApiResponse) => {
    setSelectedPost(post);
  };

  const handleVisiblePosts = (posts) => {
    setPosts(posts);
  };

  return (
    <div className="flex w-full h-full">
      <GoogleMapWrapper
        post={selectedPost}
        handleVisiblePosts={handleVisiblePosts}
      />
      <aside className="hidden w-[450px] overflow-y-auto border-l border-gray-200 px-4 py-4 xl:block">
        <Posts posts={posts!} handleLocateClick={postClickEventHandler} />
      </aside>
    </div>
  );
};

export default LandingPage;
