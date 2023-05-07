import { useState, useEffect } from 'react';

const useAllPosts = (refreshKey: number) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/allPosts`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, [refreshKey]);

  return [posts, setPosts];
};

export default useAllPosts;
