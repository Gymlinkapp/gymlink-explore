"use client";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AppleLogo, ChatText, Eye, Heart } from "@phosphor-icons/react";
import { COLORS } from "@/utils/colors";

export type Post = {
  id: string;
  createdAt: Date;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    images: string[];
  };
  updatedAt: Date;
  content: string;
  userId: string;
  tags: string[];
  comments: [];
  likes: [];
  views: [];
};

const PostStat = ({
  icon,
  stat,
}: {
  icon: React.ReactNode;
  stat: string | number;
}) => {
  return (
    <div className="flex flex-row items-center">
      {icon}
      <div className="text-secondaryWhite text-xs ml-2 font-ProstoOne">
        {stat}
      </div>
    </div>
  );
};

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [sendToDb, setSendToDb] = useState<boolean>(false);

  const [posts, setPosts] = useState<Post[] | null>(null);

  // fetch posts
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/allPosts`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);

  useEffect(() => {
    if (
      isSignedIn &&
      user &&
      user.emailAddresses[0] &&
      user.firstName &&
      user.lastName
    ) {
      setEmailAddress(user.emailAddresses[0].emailAddress);
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }

    if (emailAddress && firstName && lastName) {
      setSendToDb(true);
    }
  }, [isSignedIn, user, emailAddress, firstName, lastName]);

  /* useEffect(() => { */
  /*   if (sendToDb) { */
  /*     fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/baseWebAccount`, { */
  /*       method: "POST", */
  /*       body: JSON.stringify({ */
  /*         baseWebAccount: true, */
  /*         email: emailAddress, */
  /*         firstName: firstName, */
  /*         lastName: lastName, */
  /*       }), */
  /*     }) */
  /*       .then((response) => { */
  /*         if (response.ok) { */
  /*           console.log("User created in db"); */
  /*           setSendToDb(false); */
  /*         } */
  /*       }) */
  /*       .catch((error) => { */
  /*         console.log(error); */
  /*       }); */
  /*   } */
  /* }, [sendToDb]); */

  if (!isLoaded || !user) {
    return null;
  }

  if (!posts) {
    return <p>Loading...</p>;
  }

  return (
    <div className="relative overflow-y-hidden h-screen">
      <div className="absolute animate-fadeIn inset-0 bg-dark-400/75 w-full h-full z-50 grid place-items-center">
        <div className="animate-moveIn w-3/4 md:w-1/2 lg:w-1/3 h-1/2 bg-dark-500 rounded-3xl flex flex-col overflow-hidden">
          <div className="h-1/4 grid place-items-center relative flex-1">
            <Image
              src="/init-modal-bg.png"
              alt="modal-bg"
              fill
              className="object-cover z-10"
            />
            <div className="absolute inset-0 bg-dark-500/50 z-10" />
            <h2 className="font-bold text-xl z-20">Explore Gymlink</h2>
          </div>
            <div className="p-6 flex text-light-400 flex-col gap-2 flex-[2]">
              <p className="font-medium">
                Explore our app features and data, and see how Gymlink can help
                you find like-minded gym goers nearby.
              </p>
              <p>
                Get a sneak peek at our community&apos;s posts, questions, and
                answers.
              </p>
          </div>

          <div className="flex-[0.5] px-6">
          <a
            href="#"
            className="bg-light-500 text-dark-500 rounded-lg px-4 py-2 flex items-center"
          >
            <AppleLogo color="#000" size={16} weight="fill" />
            <span className="ml-2 font-medium">Download</span>
          </a>
          </div>
        </div>
      </div>
      <main className="flex flex-row max-w-4xl mx-auto min-h-screen h-screen">
        <div className="flex-1 border-r-[0.5px] border-dark-400 h-full flex flex-col items-center gap-4 pt-4">
          <UserButton />
          <a
            href="#"
            className="bg-light-500 text-dark-500 rounded-lg px-4 py-2 flex items-center"
          >
            <AppleLogo color="#000" size={16} weight="fill" />
            <span className="ml-2 font-medium">Download</span>
          </a>
        </div>
        <div className="flex-[4] flex flex-col gap-2 px-2 overflow-y-auto h-full">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col bg-dark-400 p-6 rounded-xl"
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-row items-center gap-2">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative">
                    <Image
                      src={post.user?.images[0]}
                      className="object-cover w-full h-full"
                      alt={`${post.user.firstName} profile picture`}
                      fill
                    />
                  </div>
                  <h4>{post.user.firstName}</h4>
                </div>
                <span className="text-sm text-dark-300">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <p className="text-light-400 pt-6">{post.content}</p>
              <div className="w-full flex flex-row justify-evenly mt-6">
                <PostStat
                  icon={
                    <Heart
                      size={18}
                      weight="fill"
                      color={COLORS.tertiaryDark}
                    />
                  }
                  stat={post.likes?.length}
                />
                <PostStat
                  icon={
                    <Eye size={18} weight="fill" color={COLORS.tertiaryDark} />
                  }
                  stat={post.views?.length}
                />
                <PostStat
                  icon={
                    <ChatText
                      size={18}
                      weight="fill"
                      color={COLORS.tertiaryDark}
                    />
                  }
                  stat={post.comments?.length}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 border-l-[0.5px] border-dark-400 flex justify-center h-full"></div>
      </main>
    </div>
  );
}
