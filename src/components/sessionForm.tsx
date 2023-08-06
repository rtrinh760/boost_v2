import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";

const SessionForm = () => {
  const [input, setInput] = useState("");
  const { isSignedIn } = useAuth();

  const ctx = api.useContext();

  const { mutate } = api.sessions.create.useMutation({
    onSuccess: () => {
      void ctx.sessions.getAll.invalidate();
    },
    onError: () => {
      toast.error("Cannot create session. Please try again.");
    },
  });

  if (!isSignedIn) {
    return null;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        mutate({ session_name: input });
        setInput("");
      }}
      className="group"
    >
      <div className="flex items-center">
        <input
          type="text"
          className="w-3/4 bg-[#110619] px-2 py-2 text-white focus:outline-none"
          placeholder="Enter Session Name"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button
          type="submit"
          className="w-1/4 p-2 align-middle text-white focus:outline-none"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5 text-gray-500 hover:text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </span>
        </button>
      </div>
    </form>
  );
};

export default SessionForm;
