import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SidebarMobile = () => {
  return (
    <div className="relative z-50 lg:hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-900/80" />

      <div className="fixed inset-0 flex">
        <div className="relative mr-16 flex w-full max-w-xs flex-1">
          <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
            <button type="button" className="-m-2.5 p-2.5">
              <span className="sr-only">Close sidebar</span>
              <FontAwesomeIcon className="h-6 w-6 text-white" icon={faClose} />
            </button>
          </div>

          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
            <div className="flex h-16 shrink-0 items-center">
              <div className="h-8 w-auto text-gray-100 font-light">UAEM</div>
            </div>

            <nav className="flex flex-1 flex-col">
              <ul className="-mx-2 flex-1 space-y-1">
                <li>
                  <a
                    href="#"
                    className="bg-gray-800 text-white group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  >
                    <svg
                      className="h-6 w-6 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                    Dashboard
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
