// [Public] FAQ page component
// Contains: list of frequently asked questions
// Content available on Google Docs

import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Highlight } from "../components/common/typography";

/* TODO: Move to components folder? */
const CollapseIcon = (props) => {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
    </svg>
  );
};

const ExpandIcon = (props) => {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};

const FaqItem = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div className="pt-6">
      <dt>
        <button
          type="button"
          className="flex w-full items-start justify-between text-left text-gray-900"
          aria-controls="faq-0"
          aria-expanded="false"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="text-base font-semibold leading-7">
            {props.question}
          </span>
          <span className="ml-6 flex h-7 items-center">
            {isExpanded ? <CollapseIcon /> : <ExpandIcon />}
          </span>
        </button>
      </dt>
      <dd className="mt-2 pr-12" ref={parent}>
        {isExpanded && (
          <div className="text-base leading-7 text-gray-600">
            {props.children}
          </div>
        )}
      </dd>
    </div>
  );
};

export const FaqPage = () => {
  return (
    <main className="px-4 py-7">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            <FaqItem question="How is Donations Trackers different from other product-sharing websites?">
              <p className="mb-3 leading-5">
                Although there is the option to sell/purchase items on this
                website, Donations Trackers stands out from other
                product-sharing platforms in the sense that it promotes donation
                sharing. The development team realized that despite there being
                numerous platforms to sell/purchase products, there is a lack of
                donation-promoting websites. By making donations more
                accessible, Donations Trackers hopes to enhance community morale
                and well-being."
              </p>
            </FaqItem>

            <FaqItem
              question={
                <>
                  What is the difference between registering as{" "}
                  <Highlight>an individual vs. organization?</Highlight>
                </>
              }
            >
              <p className="mb-3 leading-5">
                Registering as an individual doesn't require that the user be
                associated with an organization (e.g. NGO, company). There are
                no geographic restraints for individual users (i.e. individual
                users don't have to be living in the Greater Montréal area).
                However, individual users can only offer donations/products (not
                request). Registering as an organization makes it mandatory that
                the user be associated with a legitimate organization. The
                legitimacy of the organization will be approved by the website
                administrators during registration. For the purpose of the
                website, for now, it is required that the organization be based
                in the Greater Montréal area. Organization users can make both
                offers and requests.
              </p>
            </FaqItem>

            <FaqItem question="How can users be sure that the website is secure?">
              <p className="mb-3 leading-5">
                As a group of university students behind this website, we
                understand that the security of this platform could be
                questionable. Our web development team has worked vigorously to
                ensure that your privacy and authentication information is
                managed safely on our platform. Some of the methods that we have
                implemented to ensure you have a safe and secure experience are
                listed below.
              </p>
              <ul className="list-disc list-inside my-5">
                <li className="mb-3">
                  If a user registers as an organization, website administrators
                  will go through a mandatory authentication process to ensure
                  that the organization is legitimate. Only then will the
                  registration be completed, and the user would be able to use
                  the website.
                </li>
                <li className="mb-3">
                  If you have reasonable doubt about another user's
                  reliability/legitimacy, you can always report them by clicking
                  on the <Highlight>Report User</Highlight> button, which can be
                  found on TBD . Once a user has been reported, their activity
                  will be temporarily blocked until the website administrators
                  conduct a background check.
                </li>
              </ul>
            </FaqItem>

            <FaqItem question="If there are issues/errors with donations or monetary transactions, what should we do?">
              <p className="mb-3 leading-5">
                We completely understand that issues with donations/transactions
                may arise due to various causes (e.g. technical difficulties).{" "}
                <em>
                  Donations Trackers is not responsible for any errors/issues
                  that arise with a transaction/donation.
                </em>{" "}
                Such errors/issues include but are not limited to:
              </p>
              <ul className="list-disc list-inside my-5">
                <li className="mb-3">
                  Damages to products - We encourage you to check that all
                  products are in their desired condition before completing the
                  transaction/donation.
                </li>
                <li className="mb-3">
                  Products that are different from their description on the
                  website - We encourage that you check all products are
                  provided as posted on the website.
                </li>
                <li className="mb-3">
                  Not receiving the fee after selling the product.
                </li>
                <li className="mb-3">
                  Errors with transactions - Please contact the corresponding
                  bank for any errors related to monetary transactions.
                </li>
              </ul>
              <p className="mb-3 leading-5">
                If during a donation/transaction, you find issues with a
                specific user, please report them using the “Report User”
                feature as soon as possible, so that the user's activity can be
                temporarily blocked. Donations Trackers thanks you for your
                understanding and cooperation.
              </p>
              <p className="mb-3 leading-5">
                <i>
                  If you have any other questions/concerns, please email{" "}
                  <ExternalLink href="mailto: uaem@ssmu.ca">
                    uaem@ssmu.ca
                  </ExternalLink>
                  .
                </i>
              </p>
            </FaqItem>
          </dl>
        </div>
      </div>
    </main>
  );
};

export default FaqPage;
