import { AccountLayout } from "@pages/Account/components/AccountLayout";
import { FavoritePosts } from "@pages/Account/components/FavoritePosts";
import { MyPosts } from "@pages/Account/components/MyPosts";
import { classMerge } from "@utils/ClassMerge";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const DashboardPage = () => {
  const { t } = useTranslation();

  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  return (
    <AccountLayout>
      <div>
        <div className="block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                type="button"
                onClick={() => setSelectedTabIndex(0)}
                className={classMerge(
                  "whitespace-nowrap border-b-2 pb-4 px-1 text-sm font-medium",
                  selectedTabIndex === 0
                    ? "border-purple-800 text-purple-700"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                )}
              >
                {t("posts.favorites")}
              </button>
              <button
                type="button"
                onClick={() => setSelectedTabIndex(1)}
                className={classMerge(
                  "whitespace-nowrap border-b-2 pb-4 px-1 text-sm font-medium",
                  selectedTabIndex === 1
                    ? "border-purple-800 text-purple-700"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                )}
              >
                {t("posts.my_posts")}
              </button>
            </nav>
          </div>
        </div>

        <div className="my-5">
          {selectedTabIndex === 0 ? <FavoritePosts /> : null}
          {selectedTabIndex === 1 ? <MyPosts /> : null}
        </div>
      </div>
    </AccountLayout>
  );
};
