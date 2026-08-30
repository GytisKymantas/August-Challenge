import { useEffect, useRef } from "react";

type UseInfiniteScrollProps = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isError: boolean;

  fetchNextPage: () => void;
};

export function useInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  isError,
}: UseInfiniteScrollProps) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element) return;
    if (!hasNextPage) return;
    if (isFetchingNextPage) return;
    if (isError) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return loadMoreRef;
}
