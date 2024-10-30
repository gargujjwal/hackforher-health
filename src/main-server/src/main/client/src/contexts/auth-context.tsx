import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {ChildrenProps} from "@/types";
import {
  AuthenticatedUserResponse,
  LoginRequest,
  LoginResponse,
} from "@/types/backend-stubs";
import {AccessToken, fetchWithAuth, fetchWithoutAuth} from "@/utils/api";

type User = Omit<LoginResponse, "accessToken">;

type AuthContextType =
    | { status: "loading" }
    | { status: "authenticated"; user: User; logout: () => void }
    | {
  status: "unauthenticated";
  login: (credentials: LoginRequest) => void;
};

const AuthContext = createContext<AuthContextType>({status: "loading"});

export function AuthProvider({children}: ChildrenProps) {
  const [authState, setAuthState] = useState<AuthContextType>({
    status: "loading",
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const authenticatedUserQuery = useQuery({
    queryKey: ["auth", "user"],
    queryFn: () =>
        fetchWithAuth<AuthenticatedUserResponse>("/auth/me", {method: "GET"}),
    retry: 1,
  });
  const loginUserMutation = useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: (credentials: LoginRequest) =>
        fetchWithoutAuth<LoginResponse>("/auth/login", {
          method: "POST",
          body: JSON.stringify(credentials),
        }),
    onSuccess(res) {
      setAuthState({
        status: "authenticated",
        user: res,
        logout: logoutUserMutation.mutate,
      });
      AccessToken.setAccessToken(res.accessToken);
      queryClient.invalidateQueries({queryKey: ["auth", "user"]});
      navigate(`/dashboard/${res.role.toLowerCase()}`);
    },
  });
  const logoutUserMutation = useMutation({
    mutationKey: ["auth", "logout"],
    mutationFn: () =>
        fetchWithoutAuth<null>("/auth/logout", {method: "POST"}),
    onSuccess() {
      setAuthState({
        status: "unauthenticated",
        login: loginUserMutation.mutate,
      });
      AccessToken.clearAccessToken();
      queryClient.invalidateQueries({queryKey: ["auth", "user"]});
      navigate("/");
    },
  });

  useEffect(() => {
    switch (authenticatedUserQuery.status) {
      case "success":
        setAuthState({
          status: "authenticated",
          user: authenticatedUserQuery.data,
          logout: logoutUserMutation.mutate,
        });
        break;
      case "error":
        setAuthState({
          status: "unauthenticated",
          login: loginUserMutation.mutate,
        });
    }
  }, [authenticatedUserQuery.status]);

  return (
      <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
