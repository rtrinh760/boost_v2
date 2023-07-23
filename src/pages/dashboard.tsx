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
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const Dashboard: NextPage = () => {
  const { data, isLoading } = api.tabs.getAll.useQuery();

  const ctx = api.useContext();

  const { mutate } = api.tabs.delete.useMutation({
    onSuccess: () => {
      toast.success("Tab deleted!");
      void ctx.tabs.getAll.invalidate();
    },
  });

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col bg-zinc-900">
        <div className="flex flex-1 flex-col items-center justify-center px-20 text-center">
          <FadeLoader
            color="rgb(199 210 254)"
            loading={true}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      </main>
    );
  }

  if (!data) {
    return redirect("/error");
  }

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
          {data.length > 0 && data.map((tab) => (
            <div className="flex flex-1 flex-row items-center justify-center px-20 text-center" key={tab.id}>
              <Tab {...tab} />
              <button
                className="flex-end rounded-lg border px-4 py-1 font-bold text-white transition ease-in-out hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-200 hover:text-black"
                onClick={() => mutate({ id: tab.id })}
              >
                Delete
              </button>
            </div>
          ))}
          {data.length == 0 && (
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
