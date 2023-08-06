import * as React from "react";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";
import SessionForm from "./sessionForm";
import Link from "next/link";
import { FadeLoader } from "react-spinners";

const Sidebar = () => {
  const { data: sessionData, isLoading: isSessionDataLoading } =
    api.sessions.getAll.useQuery();

  const ctx = api.useContext();

  const { mutate } = api.sessions.delete.useMutation({
    onSuccess: () => {
      void ctx.sessions.getAll.invalidate();
    },
    onError: () => {
      toast.error("Failed to delete session. Please try again.");
    },
  });

  if (isSessionDataLoading) {
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

  if (!sessionData) {
    toast.error("Unable to retrieve sessions. Please try again.");
    return <main className="flex min-h-screen flex-col bg-[#110619]"></main>;
  }

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-60 lg:flex-col">
      <div className="flex grow flex-col gap-y-10 overflow-y-auto border-r-2 border-[#20092f] pb-4 pl-2 pr-12">
        <div className="flex h-16 shrink-0 items-center">
          <h1 className="text-3xl font-bold"></h1>
        </div>
        <nav className="flex flex-1 flex-col">
          {sessionData.length > 0 &&
            sessionData.map((session) => (
              <div key={session.id}>
                <Link href={`/sessions/${session.id}`}>
                  <button className="flex-end w-full bg-[#20092f] py-1 font-bold text-white transition ease-in-out hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-10px_rgba(152,64,212,0.7)]">
                    {session.session_name}
                  </button>
                </Link>
                <button
                  className="flex-end absolute right-4 translate-y-2 font-bold text-gray-500 hover:text-white group-hover:block group-hover:text-white"
                  onClick={() => mutate({ id: session.id })}
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
            <SessionForm />
          </div>
          {/* <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                </ul>
              </li>
            </ul> */}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
