// [Public] FAQ page component
// Contains: list of frequently asked questions
// Content available on Google Docs

import { CollapseIcon, ExpandIcon } from "@components/Icons";
import { ExternalLink, Highlight } from "@components/Typography";
import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef, useState } from "react";

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
            Frequently Asked Questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
          <FaqItem question="What is Donations Tracker?">
              <p className="mb-3 leading-5">
              Donations Tracker is an online platform aimed at promoting donation sharing in Montréal. On this platform, users can request and offer donations. In doing so, our goal is to strengthen community solidarity and reduce socioeconomic disparities here in Montréal.
              </p>
            </FaqItem>

            <FaqItem question="How do I make an offer and/or request for a donation on Donations Tracker?">
              <p className="mb-3 leading-5">
              <ol className="list-inside my-5 list-decimal marker:font-semibold">
                <li className="mb-3 d leading-5">
                  <span className="font-semibold">REGISTER AS AN USER.</span>
                  <p className="mb-3 leading-5">
                    Click on “Login” on the top right then click “Click here to register.” 
                  </p>
                  <p className="mb-3 leading-5">
                    You can register as an individual or an organization. For more information on their differences, please read “What is the difference between registering as an individual vs. organization?” below. 
                  </p>
                </li>
                <li className="mb-3 d">
                  <span className="font-semibold">MAKE AN OFFER AND/OR REQUEST.</span>
                  <p className="mb-3 leading-5">
                    Once you log in, click on “Posts” in the menu bar on the left. Click on “Make an Offer” or “Make a Request” and fill in the appropriate information. 
                  </p>
                  <p className="mb-3 leading-5 text-sm">
                    Note: Only specific users can make a request. For more information, please see “What is the difference between registering as an individual vs. organization?” below.
                  </p>
                  <p className="mb-3 leading-5 text-sm">
                    Note: The current version of the website allows purchasing/selling of products. If you want to offer/request a donation, please input ‘0’ as the price.
                  </p>
                </li>
                <li className="mb-3 d">
                  <span className="font-semibold">EXPLORE THE “POSTS” PAGE FOR ANY OFFERS/REQUESTS YOU WANT TO RESPOND TO.</span>
                  <p className="mb-3 leading-5">
                    Scroll through the offers/requests listed on “Posts.” You might have products another user may need! Or, another user may be offering items that you want! 
                  </p>
                  <p className="mb-3 leading-5">
                    Use the filters on the left to look at specific posts. You can also add certain posts to your “Favorites” by clicking on the star button.
                  </p>
                </li>
                <li className="mb-3 d">
                  <span className="font-semibold">CLICK ON THE OFFER/REQUEST THAT YOU WANT. CONTACT THE OTHER USER THROUGH EMAIL LISTED ON THE POST.</span>
                  <p>
                    All communication/transactions between users must occur outside of the Donations Tracker platform. 
                  </p>
                </li>
                <li className="mb-3 d">
                <span className="font-semibold">COMMUNICATE WITH THE OTHER USER TO COMPLETE THE TRANSACTION/DONATION.</span>
                </li>
                <li className="mb-3 d">
                  <span className="font-semibold">CONGRATULATIONS! YOUR OFFER/REQUEST HAS BEEN FULFILLED! LASTLY, PLEASE CLOSE YOUR POST ON THE WEBSITE.</span> 
                  <p>
                    It is important that you close your completed offers/requests so that other users know that it’s no longer active. We thank you for your cooperation! 
                  </p>
                </li>
              </ol>
              </p>
            </FaqItem>

            <FaqItem question="What can I do on the “Account” page?">
              <p className="mb-3 leading-5">
                The “Account” page appears for users who have logged in. 
              </p>
              <ul className="list-disc list-inside my-5">
                <li className="mb-3">
                 Dashboard: Users can view their own posts as well as posts marked as their “Favorite.” 
                </li>
                <li className="mb-3">
                  General: Users can change their first, last, and display names. If you want to change your associated email, please contact the administrators at <ExternalLink href="mailto: uaem@ssmu.ca">uaem@ssmu.ca</ExternalLink>.
                </li>
                <li className="mb-3">
                  Security: Users can change their password. 
                </li>
              </ul>
            </FaqItem>

            <FaqItem question="How is Donations Tracker different from other product-sharing websites?">
              <p className="mb-3 leading-5">
                Although there is the option to sell/purchase items on this
                website, Donations Tracker stands out from other
                product-sharing platforms in the sense that it promotes donation
                sharing. The development team realized that despite there being
                numerous platforms to sell/purchase products, there is a lack of
                donation-promoting websites. By making donations more
                accessible, Donations Tracker hopes to enhance community morale
                and well-being.
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
                request). 
              </p>
              <p className="mb-3 leading-5">
                Registering as an organization makes it mandatory that
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
                  found on the _____. Once a user has been reported, their activity
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
            </FaqItem>
            <p className="mb-3 leading-10">
              <i>
                If you have any other questions/concerns, please email{" "}
                <ExternalLink href="mailto: uaem@ssmu.ca">
                  uaem@ssmu.ca
                </ExternalLink>
                .
              </i>
            </p>
          </dl>
        </div>
      </div>
    </main>
  );
};

export default FaqPage;
