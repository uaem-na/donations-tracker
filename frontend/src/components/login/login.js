import IndividualLogin from "./indv";
import OrganizationLogin from "./org";
import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";

export const Login = () => {
  return (
    <div className="h-screen bg-gray-50">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md m-16">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Login to your account
            </h2>
        </div>
        <div className="bg-white p-8 max-w-md w-full space-2 rounded-xl">
          <div className="mt-8 space-y-6">
            <div className="mb-4">
              <Tab.Group>
                <Tab.List className="flex flex-wrap -mb-px">
                  <Tab
                    className={({ selected }) =>
                      selected
                        ? "inline-block py-4 px-4 text-md font-medium text-center text-indigo-600 rounded-t-lg border-b-2 border-indigo-600 active dark:text-indigo-600 dark:border-indigo-600"
                        : "inline-block py-4 px-4 text-md font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                    }
                  >
                    Individual
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      selected
                        ? "inline-block py-4 px-4 text-md font-medium text-center text-orange-500 rounded-t-lg border-b-2 border-orange-500 active dark:text-orange-500 dark:border-orange-500"
                        : "inline-block py-4 px-4 text-md font-medium text-center text-gray-500 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                    }
                  >
                    Organization
                  </Tab>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel>
                    <IndividualLogin />
                  </Tab.Panel>
                  <Tab.Panel>
                    <OrganizationLogin />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
