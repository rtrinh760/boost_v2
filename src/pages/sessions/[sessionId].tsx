import {
  UserButton,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import Form from "~/components/form";
import Tab from "~/components/tab";
import Link from "next/link";
import { FadeLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Sidebar from "~/components/sidebar";

/*
  'text': '#f4eafa',
  'background': '#110619',
  'primary': '#561c7d',
  'secondary': '#280d3a',
  'accent': '#9840d4',
  */

const Session: NextPage = () => {
  const router = useRouter();
  const sessionId = router.query.sessionId?.toString();

  if (!sessionId) {
    toast.error("Session does not exist. Please try again.");
    return <main className="flex min-h-screen flex-col bg-[#110619]"></main>;
  }

  const { data: tabData, isLoading: isLoadingTabs } = api.tabs.getAll.useQuery({
    session_id: sessionId,
  });

  const ctx = api.useContext();

  const { mutate } = api.tabs.delete.useMutation({
    onSuccess: () => {
      void ctx.tabs.getAll.invalidate();
    },
  });

  if (isLoadingTabs) {
    return (
      <main className="flex min-h-screen flex-col bg-[#110619]">
        <div className="flex flex-1 flex-col items-center justify-center px-20 text-center">
          <FadeLoader
            color="rgb(152 64 212)"
            loading={true}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </main>
    );
  }

  if (!isLoadingTabs && !tabData) {
    toast.error("Unable to retrieve tabs. Please try again.");
    return <main className="flex min-h-screen flex-col bg-[#110619]"></main>;
  }

  return (
    <>
      <SignedIn>
        <Head>
          <title>Boost</title>
          <meta name="description" content="Tab Management App" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <div>
            <Sidebar />
          </div>
          <div className="flex min-h-screen flex-col items-center bg-[#110619] text-[#f4eafa]">
            <nav
              className="
                ms:p-12
                mx-auto
                mb-12
                flex
                w-full
                max-w-screen-xl
                flex-wrap
                items-center
                justify-between
                p-6
                md:p-8
              "
            >
              <div className="flex space-x-3.5">
                <h1 className="flex justify-start whitespace-nowrap text-4xl">
                  🚀
                </h1>
                <h1 className="text-extrabold flex justify-start whitespace-nowrap text-4xl">
                  Boost
                </h1>
              </div>
              <div id="navbar-menu" className="relative w-auto justify-end">
                <div className="flex flex-row space-x-10">
                  <Link href="/">
                    <button className="flex-end rounded-lg bg-[#561c7d] px-4 py-1 font-bold transition ease-in-out hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-10px_rgba(152,64,212,0.7)]">
                      Home
                    </button>
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            </nav>
            {tabData.length > 0 &&
              tabData.map((tab) => (
                <div
                  className="group relative flex flex-row px-40"
                  key={tab.id}
                >
                  <Tab {...tab} />

                  <button
                    className="flex-end absolute right-3 hidden translate-y-2 font-bold hover:text-white group-hover:block group-hover:text-white"
                    onClick={() => mutate({ id: tab.id })}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              ))}
            <div>
              <Form sessionId={sessionId} />
            </div>
          </div>
        </main>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default Session;
