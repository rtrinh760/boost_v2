import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import Form from "~/components/form";
import Tab from "~/components/tab";
import Link from "next/link";

const Dashboard: NextPage = () => {
  const { data, isLoading } = api.tabs.getAll.useQuery();

  // if (isLoading) {
  //   return (
  //     <div className="flex flex-1 flex-col items-center justify-center px-20 text-center">
  //       <div className="p-2 text-black">Loading...</div>
  //     </div>
  //   );
  // }

  return (
    <>
    <SignedIn>
      <Head>
        <title>Boost</title>
        <meta name="description" content="Tab Management App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col bg-zinc-900">
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
              <div className="flex flex-row space-x-10">
                <Link href="/">
                  <button className="flex-end rounded-lg border px-4 py-1 font-bold text-white transition ease-in-out hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-200 hover:text-black">
                    Home
                  </button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
          </div>
        </nav>
        <div className="flex flex-1 flex-col items-center justify-center px-20 text-center">
          <Form />
        </div>
        {data && (
          <div className="flex flex-1 flex-col items-center justify-center px-20 text-center">
            {data.map((tab) => (
              <Tab {...tab} key={tab.id} />
            ))}
          </div>
        )}
        {!data && (
          <div className="flex flex-1 flex-col items-center justify-center px-20 text-center">
            <div className="p-2 text-white">No tabs!</div>
          </div>
        )}
      </main>
    </SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
    </>
  );
};

export default Dashboard;
