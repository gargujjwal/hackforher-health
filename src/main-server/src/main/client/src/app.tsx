import toast, {Toaster} from "react-hot-toast";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import {MutationCache, QueryClient, QueryClientProvider,} from "@tanstack/react-query";
import {useState} from "react";

import NextUiProvider from "./providers/next-ui";
import {BaseError, ensureError, RefreshAuthError} from "./utils/error";
import {ChildrenProps} from "./types";
import LoadingScreen from "./components/ui/loading-screen";
import IndexPage from "./pages";
import LoginPage from "./pages/auth/login";
import {AuthProvider, useAuth} from "./contexts/auth-context";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      children: [
        {
          path: "",
          element: (
              <ProtectedRoute>
                <IndexPage/>
              </ProtectedRoute>
          ),
        },
        {path: "/login", element: <LoginPage/>},
        {
          path: "/dashboard/:role",
          element: (
              <ProtectedRoute>
                <p>Dashboard</p>
              </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
      <>
        <Toaster position="top-center" reverseOrder={true}/>
        <RouterProvider router={router}/>
      </>
  );
}

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
            mutationCache: new MutationCache({
              onError: (error) => {
                const err = ensureError(error);

                if (err instanceof RefreshAuthError) {
                  navigate("/login");
                } else if (err instanceof BaseError) {
                  console.error(err.message);
                  console.dir(err);
                  if (err.context.errorResponse.message) {
                    toast.error(err.context.errorResponse.message);
                  }
                } else {
                  console.error(err.message);
                  console.dir(err);
                  toast.error("Failed to connect to server, are you offline?");
                }
              },
            }),
          }),
  );

  return (
      <NextUiProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Outlet/>
          </AuthProvider>
        </QueryClientProvider>
      </NextUiProvider>
  );
}

function ProtectedRoute({children}: ChildrenProps) {
  const {status} = useAuth();

  switch (status) {
    case "authenticated":
      return children;
    case "unauthenticated":
      return <Navigate replace to="/login"/>;
    case "loading":
      return <LoadingScreen/>;
  }
}
