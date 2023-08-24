import {
  SignInButton,
  SignUpButton,
  SignedOut,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Boost</title>
        <meta name="description" content="Tab Management App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center  text-[#0a0510]">
        <nav
          className="
          ms:p-12
          mx-auto
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
            <h1 className="text-extrabold flex justify-start whitespace-nowrap text-4xl text-[#0a0510]">
              Boost
            </h1>
          </div>
          <div id="navbar-menu" className="relative w-auto justify-end">
            <SignedOut>
              <div className="space-x-3 md:mt-0 md:flex-row">
                <SignInButton mode="modal" redirectUrl="/sessions">
                  <button className="text-white flex-end rounded-lg bg-[#44078a] px-4 py-1 font-bold transition ease-in-out hover:-translate-y-0.5">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal" redirectUrl="/sessions">
                  <button className="text-white flex-end rounded-lg bg-[#6c34ad] px-4 py-1 font-bold transition ease-in-out hover:-translate-y-0.5 hover:bg-[#9b44ff]">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
            <SignedIn>
              <div className="flex flex-row space-x-10">
                <Link href="/sessions">
                  <button className="text-white flex-end rounded-lg bg-[#6c34ad] px-4 py-1 font-bold transition ease-in-out hover:-translate-y-0.5 hover:bg-[#9b44ff]">
                    Sessions
                  </button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        </nav>
        <div className="align-center mx-auto my-auto flex h-screen w-screen flex-col items-center justify-center text-center text-lg font-semibold text-[#0a0510]">
          <div className="flex flex-col items-center justify-center space-x-10 md:flex-row md:justify-between">
            <div>
              <h1 className="text-4xl font-bold">
                <div className="text-inline">
                  <span className="bg-gradient-to-r from-[#6c34ad] to-[#7839c0] bg-clip-text text-transparent">
                    Boost
                  </span>{" "}
                  your productivity
                </div>
              </h1>
              <h2 className="pt-5 text-2xl font-bold">
                Store your tabs and access them anywhere, anytime.
              </h2>
            </div>
            <div className="md:w-1/2 md:items-center">
              <Image
                src="/demo2.png"
                alt="Image of demo"
                width={600}
                height={600}
                className="rounded-xl border border-white z-20"
              />
              <div className="w-80 h-80 bg-[#6c34ad] absolute top-1/2 left-1/2 blur-2xl -z-10 opacity-60 rounded-full overflow-hidden"></div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="relative z-10 flex justify-center py-5 text-center text-4xl font-bold">
            <span className="z-10">Browse stress-free</span>
            <svg
              className="absolute h-2 w-7/12 translate-y-8"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="100%" height="100%" fill="#6c34ad" />
            </svg>
          </h1>
          <p className="text-xl">
            Let our extension do the heavy lifting with features such as:
          </p>
        </div>
        <div className="h-600">
          <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <div>
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
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 mt-4 text-2xl font-bold">
                  Easy Bookmarking
                </h3>
                <p className="text-lg">
                  Save links in your current window with the click of a button.
                </p>
              </div>
              <div>
                <div>
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
                      d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 mt-4 text-2xl font-bold">Cloud Saving</h3>
                <p className="text-lg">
                  Keep track of sessions at all times without worry.
                </p>
              </div>
              <div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 mt-4 text-2xl font-bold">
                  Session Sharing
                </h3>
                <p className="text-lg">
                  Quickly share sessions with a link that lets users view and
                  edit your session.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
