import {
  ArrowRight,
  PaperPlane,
  PaperPlaneTilt,
  X,
} from '@phosphor-icons/react';
import PromptCountdown from './PromptCountdown';
import { useEffect, useState } from 'react';
import useGetMostRecentPrompt from '@/hooks/useGetMostRecentPrompt';
import { useUser } from '@clerk/nextjs';

type Props = {
  action: () => void;
  prompt: Prompt;
  actionSkipAction: () => void;
};

type Prompt = {
  id: string;
  prompt: string;
};

export default function PromptModal({
  action,
  prompt,
  actionSkipAction,
}: Props) {
  const [answer, setAnswer] = useState<string>('');
  const { user } = useUser();

  const answerPrompt = async () => {
    if (!prompt) return;
    if (!user) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/social/answerPrompt`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.emailAddresses[0].emailAddress,
            promptId: prompt.id,
            answer: answer,
          }),
        }
      );
      const data = await res.json();

      localStorage.setItem('answeredPrompt', JSON.stringify(true));
      if (data.success) {
        action();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='absolute animate-fadeIn inset-0 bg-dark-400/75 w-full h-full z-50 grid place-items-center'>
      <div className='animate-moveIn w-3/4 md:w-1/2 lg:w-1/3 flex flex-col items-end gap-2 overflow-hidden'>
        <PromptCountdown />
        <div className='bg-dark-500 border-2 border-dark-400 border-dashed rounded-3xl w-full h-full p-6 flex flex-col'>
          <div className='flex-[2]'>
            <div className='w-full flex justify-between items-center'>
              <p className='text-dark-300 font-bold'>Share you vibes</p>
              <div onClick={actionSkipAction}>
                <X size={20} className='cursor-pointer' />
              </div>
            </div>

            {prompt && (
              <div className='flex-[3]'>
                <p className='text-light-400'>{prompt.prompt}</p>
              </div>
            )}

            <textarea
              className='w-full h-32 bg-dark-400 text-light-400 rounded-lg p-2 my-6 text-sm outline-dark-300 duration-200'
              placeholder='Share your vibe'
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <div>
            <a
              onClick={() => {
                answerPrompt();
                action();
              }}
              className='cursor-pointer border-2 border-dashed border-dark-300 bg-dark-400 text-light-500 rounded-lg px-4 py-2 w-full h-fit flex flex-1 items-center justify-center hover:bg-dark-500 hover:text-light-500 transition-all'
            >
              <PaperPlaneTilt size={16} weight='fill' />
              <span className='ml-2 font-medium'>Share your vibe</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
