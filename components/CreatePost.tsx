import { PaperPlaneTilt } from "@phosphor-icons/react";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  userId: string;
  setRefreshKey: Dispatch<SetStateAction<number>>;
};

export default function CreatePost({ userId, setRefreshKey }: Props) {
  const [content, setContent] = useState("");

  const createPost = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, content }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setRefreshKey((prev) => prev + 1);
        setContent("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="border-[0.5px] border-dark-400 rounded-xl p-6">
      <div>
        <h3 className="font-bold text-dark-300">Create a post</h3>
        <p className="text-sm text-light-400">
          Seek advice, answer questions or share your gym thoughts.
        </p>
      </div>
      <textarea
        className="w-full h-16 bg-dark-400 text-light-400 rounded-lg p-2 my-6 text-sm outline-dark-300 duration-200"
        placeholder="Share your vibe"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={createPost}
        className="cursor-pointer border-2 border-dashed border-dark-300 bg-dark-400 text-light-500 rounded-lg px-4 py-2 w-full h-fit flex flex-1 items-center justify-center hover:bg-dark-500 hover:text-light-500 transition-all"
      >
        <PaperPlaneTilt size={16} weight="fill" />
        <span className="ml-2 font-medium">Share your vibe</span>
      </button>
    </div>
  );
}
