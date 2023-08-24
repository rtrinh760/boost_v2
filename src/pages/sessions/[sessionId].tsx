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
import { useRouter } from "next/router";
import Sidebar from "~/components/sidebar";
import { Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";

const Session: NextPage = () => {
  const router = useRouter();
  const sessionId = router.query.sessionId?.toString() || "";
  const [input, setInput] = useState("");

  const { data: sessionData } = api.sessions.getOne.useQuery({
    id: sessionId,
  });

  const { data: tabData, isLoading: isLoadingTabs } = api.tabs.getAll.useQuery({
    session_id: sessionId,
  });

  const { data: notesData } = api.notes.getAll.useQuery({
    session_id: sessionId,
  });

  const ctx = api.useContext();

  const { mutate } = api.tabs.delete.useMutation({
    onSuccess: () => {
      void ctx.tabs.getAll.invalidate();
    },
  });

  const { mutate: createNotes } = api.notes.create.useMutation();

  const { mutate: updateNotes } = api.notes.update.useMutation();

  useEffect(() => {
    if (notesData && notesData[0]) {
      setInput(notesData[0].content);
    }
  }, [notesData]);

  if (isLoadingTabs) {
    return (
      <main className="flex min-h-screen flex-col bg-[#fcfbfe]">
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

  if (!sessionData || !tabData) {
    return <main className="flex min-h-screen flex-col bg-[#fcfbfe]"></main>;
  }

  return (
    <>
      <SignedIn>
        <Head>
          <title>Boost</title>
          <meta name="description" content="Tab Management App" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="block">
          <div>
            <Sidebar />
          </div>
          <div className="flex min-h-screen flex-col items-center bg-[#fcfbfe] text-[#f4eafa]">
            <nav
              className="
                mb-12
                flex
                w-full
                max-w-screen-xl
                flex-wrap
                items-center
                justify-between
                p-8
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
              <div className="relative w-auto justify-end">
                <div className="flex flex-row space-x-10">
                  <Link href="/">
                    <button className="flex-end rounded-lg bg-[#6c34ad] px-4 py-1 font-bold transition ease-in-out hover:-translate-y-0.5 hover:bg-[#9b44ff]">
                      Home
                    </button>
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            </nav>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-extrabold flex pb-10 text-6xl text-[#0a0510]">
                {sessionData[0]?.session_name}
              </h1>
              {tabData.length > 0 &&
                tabData.map((tab) => (
                  <div
                    className="group relative flex w-[300px] flex-1 flex-row sm:w-[450px]"
                    key={tab.id}
                  >
                    <Tab {...tab} />

                    <button
                      className="flex-end absolute right-3 hidden translate-y-2 font-bold hover:text-[#0a0510] group-hover:block group-hover:text-[#0a0510]"
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
              <div className="w-[300px] sm:w-[600px]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!notesData || !notesData[0])
                      createNotes({ session_id: sessionId, content: input });
                    else if (input != notesData[0].content) {
                      updateNotes({ id: notesData[0].id, content: input });
                    }
                  }}
                  className="group"
                >
                  <Textarea
                    variant="flat"
                    label="Notes"
                    labelPlacement="outside"
                    placeholder="Enter session notes here."
                    value={input}
                    classNames={{
                      input:
                        "px-2 text-[#0a0510] bg-zinc-100 border rounded-md border-2 border-zinc-400 placeholder-zinc-400",
                      label: "py-1 text-zinc-400",
                    }}
                    className="w-full pt-5 text-xl text-zinc-600"
                    onChange={(event) => setInput(event.target.value)}
                  />
                  <button className="flex-end ml-4 mt-1 rounded-lg bg-[#6c34ad] px-4 py-1 font-bold transition ease-in-out hover:bg-[#9b44ff]">
                    Update
                  </button>
                </form>
              </div>
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
