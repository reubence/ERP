import "tailwindcss/tailwind.css";
import { AppProps } from "next/app";
// @ts-ignore
import SideNavBar from "../components/layout/SideNavBar";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRouter } from "next/router";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [show, setShow] = useState(true);

  {
    if ("/auth/login" === router.asPath || "/auth/signup" === router.asPath) {
      return (
        <div className="h-screen">
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <ReactQueryDevtools position="bottom-right" />
          </QueryClientProvider>
        </div>
      );
    } else {
      return (
        <div className="h-screen">
          <QueryClientProvider client={queryClient}>
            <SideNavBar>
              <Component {...pageProps} />
              <Toaster />

              <ReactQueryDevtools position="bottom-right" />
            </SideNavBar>
          </QueryClientProvider>
        </div>
      );
    }
  }
}
