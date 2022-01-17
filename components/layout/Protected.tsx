import { useRouter } from "next/router";
import useUser from "../../hooks/useUser";

export default function ProtectedWrapper({ children }: any) {
  const router = useRouter();
  const { isLoading, isError } = useUser();
  if (isLoading) {
    return <div className="h-screen grid place-items-center">Loading... </div>;
  }

  if (isError) {
    console.log("error hua bhai");
    router.push("/auth/login");
    return <div className="h-screen grid place-items-center">Loading... </div>;
  }

  return <div>{children}</div>;
}
