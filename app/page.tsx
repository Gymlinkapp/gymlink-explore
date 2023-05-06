"use client";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";

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
    <main className="flex flex-row max-w-4xl mx-auto min-h-screen">
      <div className="flex-1 border-r-[0.5px] border-dark-400 flex flex-col items-center gap-4 pt-4">
        <UserButton />
        <a href="#" className="bg-light-500 text-dark-500 rounded-lg px-4 py-2">Download</a>
      </div>
      <div className="flex-[4] flex flex-col gap-2 px-2">
        {posts.map((post) => (
          <div key={post.id} className="flex flex-col bg-dark-400 p-6 rounded-xl">
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
              <span className="text-sm text-dark-300">{new Date(post.createdAt).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}</span>
            </div>
            <p className="text-light-400 pt-6">{post.content}</p>
          </div>
        ))}
      </div>
      <div className="flex-1 border-l-[0.5px] border-dark-400 flex justify-center">
      </div>
    </main>
  );
}
