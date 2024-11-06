import {useMutation, UseMutationResult, useQuery, useQueryClient,} from "@tanstack/react-query";
import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import {ChildrenProps} from "@/types";
import {LoginRequest, LoginResponse} from "@/types/backend-stubs";
import {AccessToken} from "@/utils/api";
import {authenticatedUser} from "@/react-query/queries";
import {loginUserMut, logoutUserMut} from "@/react-query/mutations";
import {BaseError} from "@/utils/error";

type User = Omit<LoginResponse, "accessToken">;

type AuthContextType =
  | { status: "loading" }
  | {
      status: "authenticated";
      user: User;
      logout: UseMutationResult<null, Error, void, unknown>;
    }
  | {
      status: "unauthenticated";
      login: UseMutationResult<LoginResponse, Error, LoginRequest, unknown>;
    };

const AuthContext = createContext<AuthContextType>({ status: "loading" });

export function AuthProvider({children}: Readonly<ChildrenProps>) {
  const [authState, setAuthState] = useState<AuthContextType>({
    status: "loading",
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const authenticatedUserQuery = useQuery({ ...authenticatedUser });
  const loginUserMutation = useMutation({
    ...loginUserMut,
    onSuccess(res) {
      setAuthState({
        status: "authenticated",
        user: res,
        logout: logoutUserMutation,
      });
      AccessToken.setAccessToken(res.accessToken);
      queryClient.invalidateQueries({ queryKey: loginUserMut.invalidateKeys });
      navigate(`/dashboard/${res.role.toLowerCase()}`);
    },
  });
  const logoutUserMutation = useMutation({
    ...logoutUserMut,
    onSuccess() {
      setAuthState({
        status: "unauthenticated",
        login: loginUserMutation,
      });
      AccessToken.clearAccessToken();
      queryClient.invalidateQueries({ queryKey: logoutUserMut.invalidateKeys });
      navigate("/");
    },
  });

  useEffect(() => {
    switch (authenticatedUserQuery.status) {
      case "success":
        setAuthState({
          status: "authenticated",
          user: authenticatedUserQuery.data,
          logout: logoutUserMutation,
        });
        break;
      case "error":
        setAuthState({
          status: "unauthenticated",
          login: loginUserMutation,
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

export const useAuthenticatedUser = (): {
  status: "authenticated";
  user: User;
  logout: UseMutationResult<null, Error, void, unknown>;
} => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  if (context.status === "loading" || context.status === "unauthenticated") {
    throw new BaseError("useAuth can't be used with unauthenticated user", {
      context,
    });
  }

  return context;
};
