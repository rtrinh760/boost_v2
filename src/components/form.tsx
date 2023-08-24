import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";

interface FormProps {
  sessionId: string;
}

const Form = ({ sessionId }: FormProps) => {
  const [input, setInput] = useState("");
  const { isSignedIn } = useAuth();

  const ctx = api.useContext();

  const { data } = api.tabs.getAll.useQuery({
    session_id: sessionId,
  });

  const { mutate } = api.tabs.create.useMutation({
    onSuccess: () => {
      toast.success("Tab saved!");
      void ctx.tabs.getAll.invalidate();
    },
    onError: () => {
      toast.error("Failed to save tab. Please try again.");
    },
  });

  if (!isSignedIn) {
    return null;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        let tabExists = false;

        for (const tab of data || []) {
          if (tab.url.toLowerCase() === input.toLowerCase()) {
            tabExists = true;
          }
        }

        if (!tabExists) {
          mutate({ session_id: sessionId, url: input.toLowerCase() });
        } else {
          toast.error("Tab already exists!");
        }

        setInput("");
      }}
      className="group relative flex w-[300px] flex-1 flex-row sm:w-[450px]"
    >
      <input
        type="text"
        className=" bg-[#fcfbfe] px-4 py-2 align-middle text-[#0a0510] focus:outline-none"
        placeholder="Enter URL"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <button
        type="submit"
        className="flex-end absolute right-3 hidden translate-y-2 font-bold hover:text-[#0a0510] group-hover:block group-hover:text-[#0a0510]"
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </span>
      </button>
    </form>
  );
};

export default Form;
