import { Profile } from "./profile";

export const Header = () => {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-slate-800 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      {/* <OpenSidebarButton /> */}
      <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {/* TODO: Place holder for UAEM Logo */}
        <div className="relative flex flex-1" />
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <Profile />
        </div>
      </div>
    </div>
  );
};
