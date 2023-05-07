
export type User = {
  id: string
  email: string
  phoneNumber: string
  firstName: string
  lastName: string
  password: string
  age: number
  bio: string | null
  gender: string | null
  race: string | null
  images: string[] 
  tags:  string[]
  longitude: number | null
  latitude: number | null
  authSteps: number
  isBot: boolean
  streak: number
  tempJWT: string | null
  verificationCode: string | null
  verified: boolean | null
  gymId: string | null
  createdAt: Date
  updatedAt: Date
  chatId: string | null
  splitId: string | null
  userId: string | null
  userPrompts: UserPrompt[] 
}

export type UserPrompt = {
    answer: string,
    hasAnswered: boolean,
    id: string,
    promptId: string,
  }


export interface UseUserByEmailState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

import { useEffect, useState } from 'react';

const useGetUserByEmail = (email: string | null): UseUserByEmailState => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!email) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/getByEmail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data= await response.json();
        setUser(data.user as User);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  return { user, loading, error };
};

export default useGetUserByEmail;
