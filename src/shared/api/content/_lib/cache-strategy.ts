import { QueryClient } from "@tanstack/react-query";

export interface CacheStrategy {
  fetch<T>(key: unknown[], getData: () => Promise<T>): Promise<T>;
}

export class DummyCacheStrategy implements CacheStrategy {
  async fetch<T>(key: unknown[], getData: () => Promise<T>): Promise<T> {
    return await getData();
  }
}

export class ReactQueryCacheStrategy implements CacheStrategy {
  private timer: NodeJS.Timeout;

  constructor(
    private queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
        },
      },
    }),
  ) {
    this.timer = setInterval(
      () => {
        queryClient.refetchQueries();
      },
      60 * 60 * 1000,
    );
  }

  async fetch<T>(key: unknown[], getData: () => Promise<T>): Promise<T> {
    return await this.queryClient.fetchQuery({
      queryKey: key,
      queryFn: getData,
    });
  }

  stopRefetching() {
    clearInterval(this.timer);
  }
}
