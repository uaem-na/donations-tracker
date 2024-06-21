import { GoogleMapWrapper } from "@components/GoogleMapWrapper/GoogleMapWrapper";
import { MapClusterWrapper } from "@components/GoogleMapWrapper/MapClusterWrapper";
import { Posts } from "@pages/Landing/components/Posts";
import { ApiModel } from "@services/api";
import { useState } from "react";
import { useLandingContext } from "@contexts/LandingContext"

/*
 * TODO: Mobile view
 * */
export const LandingContainer = () => {
  const {visiblePosts} = useLandingContext()

  return (
    <div className="flex w-full h-full">
      <MapClusterWrapper/>
      <aside className="hidden w-[450px] overflow-y-auto border-l border-gray-200 px-4 py-4 xl:block">
        <Posts posts={visiblePosts} />
      </aside>
    </div>
  );
};

export default LandingContainer;
