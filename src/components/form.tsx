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

  const { mutate } = api.tabs.create.useMutation({
    onSuccess: () => {
      toast.success("Tab saved!");
      void ctx.tabs.getAll.invalidate();
    },
    onError: () => {
      toast.error("URL is invalid. Please try again.");
    }
  });

  if (!isSignedIn) {
    return null;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        mutate({  session_id: sessionId, url: input.toLowerCase() });
        setInput("");
      }}
      className="pl-40 group">
      <input
        type="text"
        className=" bg-[#110619] align-middle px-4 py-2 text-white focus:outline-none"
        placeholder="Enter URL"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <button
        type="submit"
        className="p-2 align-middle absolute text-white focus:outline-none"
      >
        <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
</span>
      </button>
    </form>
  );
};

export default Form;
