import {FormEvent, useState} from "react";
import {Navigate} from "react-router-dom";

import LoadingScreen from "@/components/ui/loading-screen";
import {useAuth} from "@/contexts/auth-context";

function LoginPage() {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (auth.status === "authenticated") {
    return (
        <Navigate replace to={`/dashboard/${auth.user.role.toLowerCase()}`}/>
    );
  } else if (auth.status === "loading") {
    return <LoadingScreen/>;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    auth.login({email, password});
  };

  return (
      <form onSubmit={handleSubmit}>
        <input
            required
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            required
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
  );
}

export default LoginPage;
