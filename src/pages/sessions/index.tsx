import {
  UserButton,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Sidebar from "~/components/sidebar";

// new colors

// 'text': '#0a0510',
// 'background': '#fcfbfe',
// 'primary': '#6c34ad',
// 'secondary': '#e2d4f2',
// 'accent': '#7839c0',

const Dashboard: NextPage = () => {
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
          <div className="flex min-h-screen flex-col items-center bg-[#fcfbfe] text-[#0a0510]">
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
                <h1 className=" text-[#0a0510] text-extrabold flex justify-start whitespace-nowrap text-4xl">
                  Boost
                </h1>
              </div>
              <div id="navbar-menu" className="relative w-auto justify-end">
                <div className="flex flex-row space-x-10">
                  <Link href="/">
                    <button className="text-white flex-end rounded-lg bg-[#6c34ad] px-4 py-1 font-bold transition ease-in-out hover:-translate-y-0.5 hover:bg-[#9b44ff]">
                      Home
                    </button>
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            </nav>
          </div>
        </main>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default Dashboard;
