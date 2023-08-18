import { GoogleMapWrapper } from "@components/GoogleMapWrapper/GoogleMapWrapper";
import { Posts } from "@pages/Landing/components/Posts";
import { ApiModel } from "@services/api";
import { useState } from "react";

/*
 * TODO: Mobile view
 * */
export const LandingPage = () => {
  const [posts, setPosts] = useState<ApiModel.Post[]>();
  const [selectedPost, setSelectedPost] = useState<ApiModel.Post | null>(null);

  const postClickEventHandler = (post: ApiModel.Post) => {
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
