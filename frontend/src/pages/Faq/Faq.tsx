// [Public] FAQ page component
// Contains: list of frequently asked questions
// Content available on Google Docs

import { CollapseIcon, ExpandIcon } from "@components/Icons";
import { ExternalLink, Highlight } from "@components/Typography";
import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const faqItemSecondArray = t("faq.item_2.answer", {
    returnObjects: true,
  }) as Array<Object>;

  return (
    <main className="px-4 py-7">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            {t("faq.title")}
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            <FaqItem question={t("faq.item_1.question")}>
              <p className="mb-3 leading-5">{t("faq.item_1.answer")}</p>
            </FaqItem>

            <FaqItem question={t("faq.item_2.question")}>
              <p className="mb-3 leading-5">
                <ol className="list-inside my-5 list-decimal marker:font-semibold">
                  <li className="mb-3 d leading-5">
                    <span className="font-semibold">
                      {faqItemSecondArray[0]["instruction"]}
                    </span>
                    {faqItemSecondArray[0]["step"].map((step, idx) => (
                      <p key={idx} className="mb-3 leading-5">
                        {step}
                      </p>
                    ))}
                  </li>
                  <li className="mb-3 d">
                    <span className="font-semibold">
                      {faqItemSecondArray[1]["instruction"]}
                    </span>
                    <p className="mb-3 leading-5">
                      {faqItemSecondArray[1]["step"][0]}
                    </p>
                    <p className="mb-3 leading-5 text-sm">
                      {faqItemSecondArray[1]["step"][1]}
                    </p>
                    <p className="mb-3 leading-5 text-sm">
                      {faqItemSecondArray[1]["step"][2]}
                    </p>
                  </li>
                  <li className="mb-3 d">
                    <span className="font-semibold">
                      {faqItemSecondArray[2]["instruction"]}
                    </span>
                    {faqItemSecondArray[2]["step"].map((step, idx) => (
                      <p key={idx} className="mb-3 leading-5">
                        {step}
                      </p>
                    ))}
                  </li>
                  <li className="mb-3 d">
                    <span className="font-semibold">
                      {faqItemSecondArray[3]["instruction"]}
                    </span>
                    <p>{faqItemSecondArray[3]["step"][0]}</p>
                  </li>
                  <li className="mb-3 d">
                    <span className="font-semibold">
                      {faqItemSecondArray[4]["instruction"]}
                    </span>
                  </li>
                  <li className="mb-3 d">
                    <span className="font-semibold">
                      {faqItemSecondArray[5]["instruction"]}
                    </span>
                    <p>{faqItemSecondArray[5]["step"][0]}</p>
                  </li>
                </ol>
              </p>
            </FaqItem>

            <FaqItem question={t("faq.item_3.question")}>
              <p className="mb-3 leading-5">
                {t("faq.item_3.answer", { returnObjects: true })[0]}
              </p>
              <p className="mb-3 leading-5">
                {t("faq.item_3.answer", { returnObjects: true })[1]}
              </p>
            </FaqItem>

            <FaqItem question={t("faq.item_4.question")}>
              <p className="mb-3 leading-5">{t("faq.item_4.answer.0")}</p>
              <ul className="list-disc list-inside my-5">
                <li className="mb-3">{t("faq.item_4.answer.1")}</li>
                <li className="mb-3">
                  <Trans i18nKey="faq.item_4.answer.2">
                    General: Users can change their first, last, and display
                    names. If you want to change your associated email, please
                    contact the administrators at
                    <ExternalLink href="mailto: uaem@ssmu.ca">
                      uaem@ssmu.ca
                    </ExternalLink>
                    .
                  </Trans>
                </li>
                <li className="mb-3">{t("faq.item_4.answer.3")}</li>
              </ul>
            </FaqItem>

            <FaqItem question={t("faq.item_5.question")}>
              <p className="mb-3 leading-5">{t("faq.item_5.answer")}</p>
            </FaqItem>

            <FaqItem
              question={
                <Trans i18nKey="faq.item_6.question">
                  What is the difference between registering as
                  <Highlight>an individual vs. organization?</Highlight>
                </Trans>
              }
            >
              <p className="mb-3 leading-5">
                {t("faq.item_6.answer", { returnObjects: true })[0]}
              </p>
              <p className="mb-3 leading-5">
                {t("faq.item_6.answer", { returnObjects: true })[1]}
              </p>
            </FaqItem>

            <FaqItem question={t("faq.item_7.question")}>
              <p className="mb-3 leading-5">{t("faq.item_7.answer.0")}</p>
              <ul className="list-disc list-inside my-5">
                <li className="mb-3">{t("faq.item_7.answer.1")}</li>
                <li className="mb-3">
                  <Trans i18nKey="faq.item_7.answer.2">
                    If you have reasonable doubt about another user's
                    reliability/legitimacy, you can always report them by
                    clicking on the <Highlight>Report User</Highlight> button,
                    which can be found on the TBD. Once a user has been
                    reported, their activity will be temporarily blocked until
                    the website administrators conduct a background check.
                  </Trans>
                </li>
              </ul>
            </FaqItem>

            <FaqItem question={t("faq.item_8.question")}>
              <p className="mb-3 leading-5">
                <Trans i18nKey="faq.item_8.answer.0">
                  We completely understand that issues with
                  donations/transactions may arise due to various causes (e.g.
                  technical difficulties).
                  <strong>
                    Donations Trackers is not responsible for any errors/issues
                    that arise with a transaction/donation.
                  </strong>
                  Such errors/issues include but are not limited to:
                </Trans>
              </p>
              <ul className="list-disc list-inside my-5">
                <li className="mb-3">{t("faq.item_8.answer.1")}</li>
                <li className="mb-3">{t("faq.item_8.answer.2")}</li>
                <li className="mb-3">{t("faq.item_8.answer.3")}</li>
                <li className="mb-3">{t("faq.item_8.answer.4")}</li>
              </ul>
              <p className="mb-3 leading-5">{t("faq.item_8.answer.5")}</p>
            </FaqItem>
            <p className="mb-3 leading-10">
              <i>
                <Trans i18nKey="faq.further_question">
                  If you have any other questions/concerns, please email
                  <ExternalLink href="mailto: uaem@ssmu.ca">
                    uaem@ssmu.ca
                  </ExternalLink>
                  .
                </Trans>
              </i>
            </p>
          </dl>
        </div>
      </div>
    </main>
  );
};

export default FaqPage;
