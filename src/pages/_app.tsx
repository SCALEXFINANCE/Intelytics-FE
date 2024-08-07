import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Analytics } from "@vercel/analytics/react";
import { Share_Tech_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./ErrorBoundary";

const inter = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={inter.className}>
        <ErrorBoundary>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ErrorBoundary>
      </main>
      <Analytics />
      <Toaster />
    </>
  );
}
