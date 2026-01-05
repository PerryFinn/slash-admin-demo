import { MutationCache, QueryCache, QueryClient, type QueryKey } from "@tanstack/react-query";
import { message } from "antd";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
  queryCache: new QueryCache({
    // 由 React Query 接管的请求发生错误统一上报到 sentry
    onError: (_error, query) => {
      try {
        const errorMessage = (query.meta?.errorMessage as string) ?? "";
        if (errorMessage) {
          message.error(errorMessage);
        }
      } catch (error) {
        console.error("onError 发生了错误", error);
      }
    },
    onSuccess(_data, query) {
      const successMessage = (query.meta?.successMessage as string) ?? "";
      if (successMessage) {
        message.success(successMessage);
      }
    },
  }),
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      if (mutation.meta?.successMessage && !mutation.meta?.skipToast) {
        message.success(mutation.meta.successMessage as string);
      }
      const invalidatesQuery = mutation.meta?.invalidatesQuery as QueryKey;
      if (invalidatesQuery) {
        queryClient.invalidateQueries({ queryKey: invalidatesQuery });
      }
    },
    onError(_error, _variables, _context, mutation) {
      if (mutation.meta?.errorMessage && !mutation.meta?.skipToast) {
        message.error(mutation.meta.errorMessage as string);
      }
    },
  }),
});

export { queryClient };
