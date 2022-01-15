import "tailwindcss/tailwind.css";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRouter } from "next/router";
import SideBar from "../components/Layout/Sidebar";

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
