import { useEffect, useState } from 'react';

export interface UseMostRecentPromptsState {
  prompt: Prompt | null;
  loading: boolean;
  error: Error | null;
}

export interface Prompt{
  id: string
  prompt: string;
}

const useGetMostRecentPrompt = (): UseMostRecentPromptsState => {
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/social/getMostRecentPrompt`
        );
        const data = await response.json();
        setPrompt(data.prompt as Prompt);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { prompt, loading, error };
};

export default useGetMostRecentPrompt;
