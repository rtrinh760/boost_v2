import { useAuth, UserButton, SignedIn, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { api } from "~/utils/api";

type Tab = {
  url: string;
  id: string;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
};

const TabList = (props: Tab) => {
  const tab = props;
  return (
    <div
      key={tab.id}
      className="flex flex-col items-center justify-center px-20 text-center"
    >
      <div className="p-2">{tab.url}</div>
    </div>
  );
};

const Form = () => {
  const [input, setInput] = useState("");
  const { isSignedIn } = useAuth();

  const { mutate } = api.tab.postMessage.useMutation();

  if (!isSignedIn) {
    return null;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutate({ url: input });
        setInput("");
      }}
    >
      <input
        type="text"
        className="border-2 border-zinc-800 bg-neutral-900 px-4 py-2 text-white focus:outline-none"
        placeholder="Enter URL"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <button
        type="submit"
        className="border-2 border-zinc-800 bg-[#26263d] p-2 text-white focus:outline-none"
        onClick={() => mutate({ url: input })}
      >
        Submit
      </button>
    </form>
  );
};

const Dashboard: NextPage = () => {

  const { data, isLoading } = api.tab.getAll.useQuery();

  // if (isLoading) {
  //   return (
  //     <div className="flex flex-1 flex-col items-center justify-center px-20 text-center">
  //       <div className="p-2 text-black">Loading...</div>
  //     </div>
  //   );
  // }

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
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </nav>
        <div className="flex flex-1 flex-col items-center justify-center px-20 text-center">
          <Form />
        </div>
        {data && (
          <div className="flex flex-1 flex-col items-center justify-center px-20 text-center">
            {data.map((tab) => (
              <TabList {...tab} key={tab.id} />
            ))}
          </div>
        )}
        {!data && (
          <div className="flex flex-1 flex-col items-center justify-center px-20 text-center">
            <div className="p-2 text-white">No tabs!</div>
          </div>
        )}
      </main>
    </>
  );
};

export default Dashboard;
