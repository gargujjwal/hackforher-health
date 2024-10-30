import {useAuth} from "@/contexts/auth-context";

function IndexPage() {
  const auth = useAuth();

  if (auth.status !== "authenticated") return null;

  const {user, logout} = auth;

  return (
      <div>
        <h1>Welcome, {user.firstName}</h1>
        <button onClick={logout}>Logout</button>
      </div>
  );
}

export default IndexPage;
