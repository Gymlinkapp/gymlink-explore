'use client';
import { UserButton, useUser, SignInButton } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { AppleLogo, PaperPlaneTilt, Plus } from '@phosphor-icons/react';
import InitialExploreModal from '@/components/InitialExploreModal';
import PromptModal from '@/components/PromptModal';
import useGetMostRecentPrompt from '@/hooks/useGetMostRecentPrompt';
import useGetUserByEmail from '@/hooks/useGetUserByEmail';
import syncDailyPrompt from '@/utils/syncDailyPrompt';
import CreatePost from '@/components/CreatePost';
import useAllPosts from '@/hooks/usePosts';
import SkeletonPosts from '@/components/skeletonPosts';
import PromptCountdown from '@/components/PromptCountdown';
import type { Post } from '@/utils/post';
import PostCard from '@/components/Post';
import Banner from '@/components/Banner';

export default function Home() {
  const { isSignedIn, user } = useUser();
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const [showInitialModal, setShowInitialModal] = useState<boolean>(true);
  const [showPromptModal, setShowPromptModal] = useState<boolean>(false);
  const [answeredInitialPrompt, setAnsweredInitialPrompt] =
    useState<boolean>(false);

  const [sendToDb, setSendToDb] = useState<boolean>(false);
  const [sentToDb, setSentToDb] = useState<boolean>(false);
  const [createPost, setCreatePost] = useState<boolean>(false);
  const { user: userFromGymlink, loading: userLoading } = useGetUserByEmail(
    user?.emailAddresses[0].emailAddress || emailAddress
  );
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const { prompt, loading: promptLoading } = useGetMostRecentPrompt();
  const { posts, loading: postsLoading } = useAllPosts(refreshKey);

  useEffect(() => {
    // store a value to decide if the user has seen the modals before
    if (typeof window !== 'undefined') {
      // Access localStorage only when the window object is available
      setShowInitialModal(
        JSON.parse(localStorage.getItem('showInitialModal') || 'true')
      );
      setShowPromptModal(
        JSON.parse(localStorage.getItem('showPromptModal') || 'false')
      );
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Access localStorage only when the window object is available
      const storedSendToDb = JSON.parse(
        localStorage.getItem('sendToDb') || 'false'
      );
      setSendToDb(storedSendToDb);

      const storedSentToDb = JSON.parse(
        localStorage.getItem('sentToDb') || 'false'
      );
      setSentToDb(storedSentToDb);
    }
  }, []);

  useEffect(() => {
    const hasAnsweredPrompt = JSON.parse(
      localStorage.getItem('answeredPrompt') || 'false'
    );
    setAnsweredInitialPrompt(hasAnsweredPrompt);

    if (isSignedIn && emailAddress && firstName && lastName) {
      setShowInitialModal(false);
    }
    if (isSignedIn && !hasAnsweredPrompt && prompt) {
      localStorage.setItem('showInitialModal', JSON.stringify(false));
      setShowInitialModal(false);
      localStorage.setItem('showPromptModal', JSON.stringify(true));
      setShowPromptModal(true);
    }

    if (isSignedIn && hasAnsweredPrompt) {
      localStorage.setItem('showInitialModal', JSON.stringify(false));
      setShowInitialModal(false);
      localStorage.setItem('showPromptModal', JSON.stringify(false));
      setShowPromptModal(false);
    }
  }, [isSignedIn, prompt, emailAddress, firstName, lastName]);

  useEffect(() => {
    if (isSignedIn && user && user.emailAddresses[0]) {
      setEmailAddress(user.emailAddresses[0].emailAddress);
      setFirstName(user.firstName || 'User');
      setLastName(user.lastName || 'Name');
    }
    console.log(user);
    if (isSignedIn && user && !sentToDb) {
      setSendToDb(true);
    }
  }, [isSignedIn, user, sentToDb]);

  useEffect(() => {
    if (sendToDb && !sentToDb && emailAddress) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/baseWebAccount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          baseWebAccount: true,
          email: emailAddress,
          firstName: firstName,
          lastName: lastName,
        }),
      })
        .then((response) => {
          if (response.ok) {
            console.log('User created in db');
            localStorage.setItem('sentToDb', JSON.stringify(true));
            setSendToDb(false);
            setSentToDb(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log(emailAddress, firstName, lastName);
  }, [sendToDb, sentToDb, emailAddress, firstName, lastName]);

  if (!posts || postsLoading || promptLoading || !prompt) {
    return (
      <main className='flex flex-row max-w-xl mx-auto min-h-screen h-screen relative'>
        <SkeletonPosts />
      </main>
    );
  }

  return (
    <div className='relative overflow-y-hidden h-screen'>
      <Banner />
      {showInitialModal && <InitialExploreModal />}
      {user && true && (
        <PromptModal
          prompt={prompt}
          action={() => {
            setShowPromptModal(false);
            setAnsweredInitialPrompt(true);
          }}
          actionSkipAction={() => setShowPromptModal(false)}
        />
      )}
      <main className='flex flex-row max-w-5xl mx-auto min-h-screen h-screen relative'>
        <button
          onClick={() => setCreatePost(!createPost)}
          className='absolute bottom-32 right-4 bg-accent p-6 rounded-full'
        >
          <Plus className='text-light-500' size={20} />
        </button>
        <div className='hidden md:flex flex-1 border-r-[0.5px] border-dark-400 h-full flex-col items-center gap-4 pt-4'>
          {!isSignedIn && <SignInButton mode='modal' />}
          {isSignedIn && <UserButton />}
          <a
            href='https://testflight.apple.com/join/NTM6DRrW'
            className='bg-light-500 text-dark-500 rounded-lg px-4 py-2 flex items-center'
          >
            <AppleLogo color='#000' size={16} weight='fill' />
            <span className='ml-2 font-medium'>Download</span>
          </a>
        </div>
        <div className='flex-[2] flex flex-col gap-2 px-2  h-full mt-4'>
          <div className='flex md:hidden flex-1 border-r-[0.5px] border-dark-400 h-full items-center justify-between gap-4 py-4'>
            {!isSignedIn && <SignInButton mode='modal' />}
            {isSignedIn && <UserButton />}
            <a
              href='https://testflight.apple.com/join/NTM6DRrW'
              className='bg-light-500 text-dark-500 rounded-lg px-4 py-2 flex items-center'
            >
              <AppleLogo color='#000' size={16} weight='fill' />
              <span className='ml-2 font-medium'>Download</span>
            </a>
          </div>
          {createPost && userFromGymlink && (
            <CreatePost
              userId={userFromGymlink.id}
              setRefreshKey={setRefreshKey}
            />
          )}
          <ul className='overflow-y-auto flex flex-col gap-2'>
            {posts.map((post: Post) => (
              <PostCard post={post} key={post.id} />
            ))}
          </ul>
        </div>
        <div className='hidden md:flex flex-1 border-l-[0.5px] border-dark-400 justify-center h-full px-2 pt-4'>
          {!showPromptModal && (
            <div className='flex flex-col gap-2'>
              <div className='flex justify-end w-full'>
                <PromptCountdown />
              </div>

              <div className='p-4 border-2 border-dark-400 border-dashed rounded-xl h-fit'>
                <p className='text-dark-300 font-bold text-xs'>My vibe</p>

                {prompt && (
                  <div className='flex-[3]'>
                    <p className='text-light-400 text-sm'>{prompt.prompt}</p>
                  </div>
                )}
                {!answeredInitialPrompt && (
                  <a
                    onClick={() => setShowPromptModal(true)}
                    className='cursor-pointer border-2 border-dashed border-dark-300 bg-dark-400 text-light-500 rounded-lg px-4 py-2 w-full h-fit flex flex-1 items-center justify-center hover:bg-dark-500 hover:text-light-500 transition-all'
                  >
                    <PaperPlaneTilt size={16} weight='fill' />
                    <span className='ml-2 font-medium text-xs'>
                      Share your vibe
                    </span>
                  </a>
                )}

                {answeredInitialPrompt &&
                  userFromGymlink &&
                  userFromGymlink.userPrompts && (
                    <p className='text-light-500 text-base mt-4'>
                      {
                        syncDailyPrompt(prompt.id, userFromGymlink.userPrompts)
                          ?.answer
                      }
                    </p>
                  )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
