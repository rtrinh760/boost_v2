import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";

const Form = () => {
  const [input, setInput] = useState("");
  const { isSignedIn } = useAuth();

  const ctx = api.useContext();

  const { mutate } = api.tabs.create.useMutation({
    onSuccess: () => {
      toast.success("Tab saved!");
      void ctx.tabs.getAll.invalidate();
    },
    onError: () => {
      toast.error("Invalid URL! Please try again.");
    }
  });

  if (!isSignedIn) {
    return null;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        mutate({ url: input.toLowerCase() });
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
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
