import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

import LoadingScreen from "./components/ui/loading-screen";
import { AuthProvider, useAuth } from "./contexts/auth-context";
import DefaultLayout from "./layouts/default";
import IndexPage from "./pages";
import LoginPage from "./pages/auth/login";
import SignupPage from "./pages/auth/signup";
import DoctorDashboard from "./pages/dashboard/doctor";
import PatientDashboard from "./pages/dashboard/patient";
import ErrorPage from "./pages/error";
import NotFoundPage from "./pages/not-found";
import NextUiProvider from "./providers/next-ui";
import { ChildrenProps } from "./types";
import {
  ApiErrorCls,
  ensureError,
  RefreshAuthError,
  ValidationError,
} from "./utils/error";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: (
            <ProtectedRoute>
              <IndexPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "auth",
          children: [
            { path: "login", element: <LoginPage /> },
            { path: "signup", element: <SignupPage /> },
          ],
        },
        {
          path: "dashboard/patient",
          element: (
            <ProtectedRoute>
              <PatientDashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "dashboard/doctor",
          element: (
            <ProtectedRoute>
              <DoctorDashboard />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <RouterProvider router={router} />
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
    <NextUiProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <DefaultLayout>
            <Outlet />
          </DefaultLayout>
        </AuthProvider>
      </QueryClientProvider>
    </NextUiProvider>
  );
}

function ProtectedRoute({ children }: ChildrenProps) {
  const { status } = useAuth();

  switch (status) {
    case "authenticated":
      return children;
    case "unauthenticated":
      return <Navigate replace to="/auth/login" />;
    case "loading":
      return <LoadingScreen />;
  }
}
