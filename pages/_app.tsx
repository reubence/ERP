import "tailwindcss/tailwind.css";
import { AppProps } from "next/app";
// @ts-ignore
import SideBar from "../components/Layout/SideBar-Nav";
import { supabase } from "../utils/supabaseClient";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ProtectedWrapper from "../components/Layout/Protected";
import { useRouter } from "next/router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  {
    if ("/auth/login" === router.asPath || "/auth/signup" === router.asPath) {
      return (
        <html className="h-full bg-cream-light">
          <body className="h-full overflow-hidden">
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
              <ReactQueryDevtools position="bottom-right" />
            </QueryClientProvider>
          </body>
        </html>
      );
    } else {
      return (
        <html className="h-full bg-cream-light">
          <body className="h-full overflow-hidden">
            <QueryClientProvider client={queryClient}>
              <SideBar>
                <Component {...pageProps} />
                <ReactQueryDevtools position="bottom-right" />
              </SideBar>
            </QueryClientProvider>
          </body>
        </html>
      );
    }
  }
}

export default MyApp;
