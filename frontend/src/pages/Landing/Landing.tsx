import { GoogleMapWrapper } from "@components/GoogleMapWrapper/GoogleMapWrapper";
import { Posts } from "@pages/Landing/components/Posts";
import { PostApiResponse } from "@services/posts";
import { useState } from "react";

export const LandingPage = () => {
  const [selectedPost, setSelectedPost] = useState<PostApiResponse | null>(
    null
  );

  const postClickEventHandler = (post: PostApiResponse) => {
    setSelectedPost(post);
  };

  return (
    <div className="flex w-full h-full">
      <GoogleMapWrapper post={selectedPost} />
      <aside className="hidden w-[450px] overflow-y-auto border-l border-gray-200 px-4 py-4 xl:block">
        <Posts handleLocateClick={postClickEventHandler} />
      </aside>
    </div>
  );
};

export default LandingPage;
