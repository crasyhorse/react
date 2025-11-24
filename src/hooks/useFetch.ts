import { useEffect, useState } from "react";

export const useFetch = (fetchFn: () => Promise<any>, initialValue: any) => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<{
    message: string;
  } | null>();
  const [data, setData] = useState(initialValue);

  useEffect(() => {
      (async () => {
      setIsFetching(true);
      try {
        const response = await fetchFn();
        setData(response);
      } catch (error) {
        let message: string = "";
        if (error instanceof Error) {
          message = error.message;
        }
        setError({
          message: message || "Failed to fetch data!",
        });
      }
      setIsFetching(false);
      })();
  }, []);

  return { isFetching, error, data, setData };
};
