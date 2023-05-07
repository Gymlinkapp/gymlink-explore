import { ArrowRight, PaperPlane, PaperPlaneTilt } from "@phosphor-icons/react";
import PromptCountdown from "./PromptCountdown";
import { useEffect, useState } from "react";

type Props = {
  action: () => void;
};

type Prompt = {
  prompt: string;
};

export default function PromptModal({ action }: Props) {
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/social/getMostRecentPrompt`)
      .then((response) => response.json())
      .then((data) => {
        setPrompt(data.prompt);
      });
  }, []);

  console.log(prompt);
  return (
    <div className="absolute animate-fadeIn inset-0 bg-dark-400/75 w-full h-full z-50 grid place-items-center">
      <div className="animate-moveIn w-3/4 md:w-1/2 lg:w-1/3 flex flex-col items-end gap-2 overflow-hidden">
        <PromptCountdown />
        <div className="bg-dark-500 border-2 border-dark-400 border-dashed rounded-3xl w-full h-full p-6 flex flex-col">
          <div className="flex-[2]">
            <p className="text-dark-300 font-bold">Share you vibes</p>

            {prompt && (
              <div className="flex-[3]">
<p className="text-light-400">{prompt.prompt}</p>
              </div>
            )}


              <textarea
                className="w-full h-32 bg-dark-400 text-light-400 rounded-lg p-2 my-6 text-sm outline-dark-300 duration-200"
                placeholder="Share your vibe"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              
          </div>
          <div>
            <a
              onClick={action}
              className="cursor-pointer border-2 border-dashed border-dark-300 bg-dark-400 text-light-500 rounded-lg px-4 py-2 w-full h-fit flex flex-1 items-center justify-center hover:bg-dark-500 hover:text-light-500 transition-all"
            >
              <PaperPlaneTilt size={16} weight="fill" />
              <span className="ml-2 font-medium">Share your vibe</span>
            </a>
          </div>
        </div>
        <div className="flex gap-2">
          <a
            onClick={action}
            className="cursor-pointer border-[0.5px] border-light-500 bg-light-500 text-dark-500 rounded-lg px-4 py-2 w-fit h-fit flex items-center hover:bg-dark-500 hover:text-light-500 transition-all"
          >
            <ArrowRight size={16} weight="fill" />
            <span className="ml-2 font-medium">Skip</span>
          </a>
        </div>
      </div>
    </div>
  );
}
