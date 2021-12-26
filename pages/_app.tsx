import "tailwindcss/tailwind.css";
import { AppProps } from "next/app";
import SideBar from "../components/layout/SideBar-Nav";
import { supabase } from "../utils/supabaseClient";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <html className="h-full bg-cream-light">
      <body className="h-full overflow-hidden">
        <SideBar>
          <Component {...pageProps} />
        </SideBar>
      </body>
    </html>
  );
}

export default MyApp;
