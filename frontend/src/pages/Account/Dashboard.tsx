import { Alert } from "@components/Alert";
import { AccountLayout } from "@pages/Account/components/AccountLayout";
import { FavoritePosts } from "@pages/Account/components/FavoritePosts";
import { MyPosts } from "@pages/Account/components/MyPosts";
import { MyReports } from "@pages/Account/components/MyReports";
import { classMerge } from "@utils/ClassMerge";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export const DashboardPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  const onNavigateMessage = location.state?.message;

  return (
    <AccountLayout>
      <div className="flex flex-col gap-4">
        {onNavigateMessage && <Alert type="info">{onNavigateMessage}</Alert>}

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
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
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
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  )}
                >
                  {t("posts.my_posts")}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTabIndex(2)}
                  className={classMerge(
                    "whitespace-nowrap border-b-2 pb-4 px-1 text-sm font-medium",
                    selectedTabIndex === 2
                      ? "border-purple-800 text-purple-700"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  )}
                >
                  {t("reports.my_reports")}
                </button>
              </nav>
            </div>
          </div>

          <div className="my-5">
            {selectedTabIndex === 0 ? <FavoritePosts /> : null}
            {selectedTabIndex === 1 ? <MyPosts /> : null}
            {selectedTabIndex === 2 ? <MyReports /> : null}
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};
