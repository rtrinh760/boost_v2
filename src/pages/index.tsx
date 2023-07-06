import {
  SignInButton,
  useUser,
  SignUpButton,
  SignedOut,
  SignedIn,
  UserButton,
} from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Boost</title>
        <meta name="description" content="Tab Management App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col bg-[#181823]">
        <nav
          className="
          mx-auto
          flex
          w-full
          max-w-screen-xl
          flex-wrap
          items-center
          justify-between
          p-6
          text-lg text-gray-700
        "
        >
          <div className="flex space-x-3.5">
            <h1 className="flex justify-start whitespace-nowrap text-4xl">
              🚀
            </h1>
            <h1 className="text-extrabold flex justify-start whitespace-nowrap text-4xl text-white">
              Boost
            </h1>
          </div>
          <div
            id="navbar-menu"
            className="hidden w-full justify-end md:block md:w-auto"
          >
            <SignedOut>
              <div className="space-x-3 md:mt-0 md:flex-row">
                <SignInButton mode="modal">
                  <button className="flex-end rounded-lg px-4 py-1 font-bold text-white transition ease-in-out hover:-translate-y-0.5 hover:bg-white hover:text-black">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="flex-end rounded-lg border px-4 py-1 font-bold text-white transition ease-in-out hover:-translate-y-0.5 hover:bg-white hover:text-black">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </nav>
        <div className="align-center mx-auto my-auto flex h-screen w-screen flex-col items-center justify-center pb-10 text-center text-lg font-semibold text-white">
          <div className="flex flex-col items-center justify-center space-x-10 md:flex-row md:justify-between">
            <div>
              <h1 className="text-4xl font-bold">
                <div className="text-inline">
                  <span className="bg-gradient-to-r from-[#ff0080] to-[#7928ca] bg-clip-text text-transparent">
                    Boost
                  </span>{" "}
                  your productivity
                </div>
              </h1>
              <h2 className="pt-2 text-2xl font-bold">
                Save your tabs and access them anywhere
              </h2>
            </div>
            <div className="md:w-1/2">
              {/* TODO: replace with image of actual application */}
              <Image
                src="/computer.webp"
                alt="Image of a computer"
                width={600}
                height={600}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
