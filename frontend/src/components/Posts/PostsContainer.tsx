import { PostList } from "@components/Posts";
import { PostApiResponse } from "@services/api";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type Tab = "all" | "requests" | "offers";

interface PostsContainerProps {
  posts?: PostApiResponse[];
}

export const PostsContainer = ({ posts }: PostsContainerProps) => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<Tab>("all");
  const [displayedPosts, setDisplayedPosts] = useState<PostApiResponse[]>([]);

  useEffect(() => {
    if (posts) {
      if (selectedTab === ("all" as const)) {
        setDisplayedPosts(posts);
      } else if (selectedTab === ("requests" as const)) {
        setDisplayedPosts(posts.filter((post) => post.type === "request"));
      } else if (selectedTab === ("offers" as const)) {
        setDisplayedPosts(posts.filter((post) => post.type === "offer"));
      }
    }
  }, [selectedTab, posts]);

  const activeLinkClassName = "bg-purple-100 text-purple-800";
  const inactiveLinkClassName =
    "text-gray-500 hover:text-gray-700 hover:bg-gray-50";
  const linkClassName = (tab: Tab) =>
    tab === selectedTab ? activeLinkClassName : inactiveLinkClassName;

  return (
    <>
      <div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            {t("select_a_tab")}
          </label>
          <select
            name="tabs"
            className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            defaultValue={t("posts.all")}
            onChange={(e) => setSelectedTab(e.target.value as Tab)}
          >
            <option value="all">{t("posts.all")}</option>
            <option value="requests">{t("posts.requests")}</option>
            <option value="offers">{t("posts.offers")}</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="flex space-x-4" aria-label="Tabs">
            <a
              href="#"
              className={
                "rounded-md px-3 py-2 text-sm font-medium " +
                linkClassName("all")
              }
              onClick={() => setSelectedTab("all")}
            >
              {t("posts.all")}
            </a>
            <a
              href="#"
              className={
                "rounded-md px-3 py-2 text-sm font-medium " +
                linkClassName("requests")
              }
              onClick={() => setSelectedTab("requests")}
            >
              {t("posts.requests")}
            </a>
            <a
              href="#"
              className={
                "rounded-md px-3 py-2 text-sm font-medium " +
                linkClassName("offers")
              }
              onClick={() => setSelectedTab("offers")}
            >
              {t("posts.offers")}
            </a>
          </nav>
        </div>
      </div>

      <div className="flex flex-col">
        <PostList posts={displayedPosts} />
      </div>
    </>
  );
};
