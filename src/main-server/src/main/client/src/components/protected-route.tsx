import {Navigate} from "react-router-dom";

import LoadingScreen from "./ui/loading-screen";

import {useAuth} from "@/contexts/auth-context";
import {ChildrenProps} from "@/types";

function ProtectedRoute({children}: ChildrenProps) {
  const {status} = useAuth();

  switch (status) {
    case "authenticated":
      return children;
    case "unauthenticated":
      return <Navigate replace to="/auth/login"/>;
    case "loading":
      return <LoadingScreen/>;
  }
}

export default ProtectedRoute;
