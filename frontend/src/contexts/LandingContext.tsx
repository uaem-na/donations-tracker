import { ApiModel } from "@store/services/api";
import { createContext, useContext, useState } from "react";

type LandingContextType = {
  visiblePosts: ApiModel.Post[];
  setVisiblePosts: (posts: ApiModel.Post[]) => void;
  postToLocate: ApiModel.Post | null;
  locatePost: (postId: ApiModel.Post) => void;
};

const LandingContext = createContext<LandingContextType | undefined>(undefined);

export const LandingProvider = ({ children }) => {
  const [visiblePosts, setVisiblePosts] = useState<ApiModel.Post[]>([]);
  const [postToLocate, locatePost] = useState<ApiModel.Post | null>(null);

  return (
    <LandingContext.Provider value={{ visiblePosts, setVisiblePosts, postToLocate, locatePost }}>
      {children}
    </LandingContext.Provider>
  );
};

export const useLandingContext = () => {
  const context = useContext(LandingContext);
  if (context === undefined) {
    throw new Error("useLandingContext must be used within a LandingProvider");
  }
  return context;
};
