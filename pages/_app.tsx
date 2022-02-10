import "tailwindcss/tailwind.css";
import { AppProps } from "next/app";
// @ts-ignore
import SideNavBar from "../components/layout/SideNavBar";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
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
          <body className="h-full">
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
          <QueryClientProvider client={queryClient}>
            <body className="h-full overflow-hidden">
              <SideNavBar>
                <Component {...pageProps} />
                {/* <ReactQueryDevtools position="bottom-right" /> */}
              </SideNavBar>
            </body>
          </QueryClientProvider>
        </html>
      );
    }
  }
}

export default MyApp;
