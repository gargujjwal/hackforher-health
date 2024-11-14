import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {useState} from "react";
import toast from "react-hot-toast";
import {Outlet, useNavigate} from "react-router-dom";

import HelpFloatingButton from "./help-floating-button";
import ErrorBoundary from "./ui/error-boundary";

import {AuthProvider} from "@/contexts/auth-context";
import DefaultLayout from "@/layouts/default";
import NextUiProvider from "@/providers/next-ui";
import {
  ApiErrorCls,
  ensureError,
  RefreshAuthError,
  ValidationError,
} from "@/utils/error";

function Root() {
  const navigate = useNavigate();
  const [queryClient] = useState(
      () =>
          new QueryClient({
            defaultOptions: {
              queries: {
                staleTime: 1000 * 60 * 10, // 10 mins
              },
            },
            queryCache: new QueryCache({
              onError: error => {
                const err = ensureError(error);

                console.error("Error in api call", err.message);
                console.dir(err);
                if (err instanceof RefreshAuthError) {
                  navigate("/auth/login");
                } else if (err instanceof ApiErrorCls) {
                  toast.error(err.description);
                } else {
                  toast.error("Failed to connect to server, are you offline?");
                }
              },
            }),
            mutationCache: new MutationCache({
              onError: error => {
                const err = ensureError(error);

                console.error("Error in api call", err.message);
                console.dir(err);
                if (err instanceof RefreshAuthError) {
                  navigate("/auth/login");
                } else if (err instanceof ApiErrorCls) {
                  toast.error(err.message);
                } else if (err instanceof ValidationError) {
                  toast.error("Validation error, please check your inputs");
                } else {
                  toast.error("Failed to connect to server, are you offline?");
                }
              },
            }),
          }),
  );

  return (
      <ErrorBoundary>
        <NextUiProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <DefaultLayout>
                <Outlet/>
                <HelpFloatingButton/>
              </DefaultLayout>
            </AuthProvider>
          </QueryClientProvider>
        </NextUiProvider>
      </ErrorBoundary>
  );
}

export default Root;
