import { useAuth } from "@/contexts/auth-context";
import DefaultLayout from "@/layouts/default";

function IndexPage() {
  const auth = useAuth();

  if (auth.status !== "authenticated") return null;

  const { user, logout } = auth;

  return (
    <DefaultLayout>
      <h1>Welcome, {user.firstName}</h1>
      <button onClick={logout}>Logout</button>
    </DefaultLayout>
  );
}

export default IndexPage;
