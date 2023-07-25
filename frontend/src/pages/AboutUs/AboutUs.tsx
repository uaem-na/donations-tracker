// [Public] About page component
// Contains: information about the website, UAEM, UAEM McGill, and the developers
// Content available on Google Docs

import { ExternalLink } from "@components/Typography";
import { getColorByString, initial } from "@utils";
import { useState } from "react";

const Hero = () => {
  return (
    <>
      <HeroBackground />
      <HeroContent />
    </>
  );
};

const HeroBackground = () => {
  return (
    <>
      <svg
        className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-300 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="-1" className="overflow-visible fill-gray-50">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth="0"
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
        />
      </svg>
      <div
        className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
        aria-hidden="true"
      >
        <div
          className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
          }}
        ></div>
      </div>
    </>
  );
};

const HeroContent = () => {
  return (
    <div className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
        <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
          <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              UAEM Chapter of McGill
            </h1>
            <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
              <ExternalLink href="https://www.uaem.org">UAEM</ExternalLink> is a
              global network of university students striving to increase access
              and affordability to life-saving medicines. Considering that
              universities are key stakeholders in the drug development
              pipeline, students can promote equitable licensing practices by
              encouraging university policy changes. The UAEM chapter of McGill
              is one of the most active chapters in North America. Currently,
              the chapter's main projects include Donations Trackers, as well as
              the{" "}
              <ExternalLink href="https://newcanada.globalhealthgrades.org">
                UAEM Canadian Report Card
              </ExternalLink>
              , Open Science, and more.
            </p>
            <div className="mt-5">
              <ul>
                <li>
                  Email:{" "}
                  <ExternalLink href="mailto:uaem@ssmu.ca">
                    uaem@ssmu.ca
                  </ExternalLink>
                </li>
                <li>
                  Facebook:{" "}
                  <ExternalLink href="http://www.facebook.com/UAEMMcGill">
                    UAEMMcGill
                  </ExternalLink>
                </li>
                <li>
                  Instagram:{" "}
                  <ExternalLink href="https://www.instagram.com/uaem_mcgill/">
                    @uaem_mcgill
                  </ExternalLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
            <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
              <ImagePanel
                src="https://source.unsplash.com/omeaHbEFlN4?auto=format&fit=crop&h=528&q=80"
                alt=""
              />
            </div>
            <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
              <ImagePanel
                src="https://source.unsplash.com/QLqNalPe0RA?auto=format&fit=crop&h=528&q=80"
                alt=""
              />
              <ImagePanel
                src="https://source.unsplash.com/XkKCui44iM0?auto=format&fit=crop&h=528&q=80"
                alt=""
              />
            </div>
            <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
              <ImagePanel
                src="https://source.unsplash.com/wD1LRb9OeEo?auto=format&fit=crop&h=528&q=80"
                alt=""
              />
              <ImagePanel
                src="https://source.unsplash.com/QckxruozjRg?auto=format&fit=crop&h=528&q=80"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImagePanel = (props) => {
  return (
    <div className="relative">
      <img
        src={props.src}
        alt={props.alt}
        className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
      />
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10"></div>
    </div>
  );
};

const AboutUsContent = () => {
  return (
    <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          About Us
        </h2>
        <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
          <div className="w-full lg:flex-auto">
            <p className="text-xl leading-8 text-gray-600">
              Donations Trackers was developed by members of{" "}
              <ExternalLink href="https://www.uaem.org">
                Universities Allied for Essential Medicines
              </ExternalLink>{" "}
              (UAEM) and an astounding group of student web developers at McGill
              University.
            </p>
            <div className="mt-10 text-base leading-7 text-gray-700">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Donations Trackers
              </h3>
              <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                <div className="w-full lg:flex-auto">
                  <p className="text-xl leading-8 text-gray-600">
                    Donations Trackers is a website that provides a platform for
                    users to efficiently and effectively share donations in the
                    Greater Montréal area. The project was concocted by a group
                    of McGill UAEM members through a design sprint called{" "}
                    <ExternalLink href="https://www.ignitetheidea.org/innovate4health-about">
                      Innovate4Health
                    </ExternalLink>{" "}
                    organized by{" "}
                    <ExternalLink href="https://www.reactgroup.org">
                      ReAct
                    </ExternalLink>
                    ,<ExternalLink href="https://ifmsa.org">IFMSA</ExternalLink>{" "}
                    (International Federation of Medical Students Association),
                    and the{" "}
                    <ExternalLink href="https://www.ignitetheidea.org">
                      IDEA Initiative
                    </ExternalLink>{" "}
                    at Johns Hopkins Bloomberg School of Public Health.
                    Originally, the website aimed to increase transparency in
                    personal protective equipment (PPE) distribution amid the
                    shortage during the COVID-19 pandemic. With the pandemic
                    gradually (and fortunately) coming to an end, the team
                    decided to adapt the website to increase accessibility to
                    making/receiving donations in general (e.g. canned food,
                    essential goods, worn clothes, etc.).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamAvatar = (props) => {
  return (
    <li>
      <span
        className="inline-flex mx-auto h-24 w-24 items-center justify-center rounded-full"
        style={{ background: getColorByString(props.name).color }}
      >
        <span className="text-xl font-medium leading-none text-white">
          {initial(props.name)}
        </span>
      </span>
      <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900">
        {props.name}
      </h3>
      <p className="text-sm leading-6 text-gray-600">{props.term}</p>
    </li>
  );
};

const TeamContent = (props) => {
  return (
    <div className="mx-auto mt-12 max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {props.title}
        </h2>
      </div>
      <ul className="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6">
        {props.team.map((team) => (
          <TeamAvatar key={team.name} name={team.name} term={team.term} />
        ))}
      </ul>
    </div>
  );
};
export const AboutUsPage = () => {
  const [currentDevelopers] = useState([
    { name: "Lucas Nelson", term: "(Spring 2021 - present)" },
    { name: "Ryan Seo", term: "(Summer 2023)" },
  ]);

  const [previousDevelopers] = useState([
    { name: "Edgar Chang", term: "(Fall 2021 - Winter 2022)" },
    { name: "Tristan Stevens", term: "(Fall 2021 - Winter 2022)" },
    { name: "Gaby Le Bideau", term: "(Fall 2021 - Winter 2022)" },
    { name: "Jinho Yoon", term: "(Fall 2021)" },
    { name: "Arneet Kalra", term: "(Spring 2021 - Summer 2021)" },
    { name: "James Ting", term: "(Spring 2021 - Summer 2021)" },
    { name: "Paul", term: "(Spring 2021 - Summer 2021)" },
    { name: "Simarjit Bilkhu", term: "(Spring 2021 - Summer 2021)" },
    { name: "Zhekai Jiang", term: "(Spring 2021 - Summer 2021)" },
  ]);

  return (
    <>
      <main className="isolate">
        <div className="relative isolate -z-10">
          <Hero />
        </div>
        <AboutUsContent />

        <TeamContent title="Web Developers" team={currentDevelopers} />
        <TeamContent
          title="Previous Web Developers"
          team={previousDevelopers}
        />
      </main>
    </>
  );
};

export default AboutUsPage;
