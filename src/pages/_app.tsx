import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Analytics } from "@vercel/analytics/react";
import { Share_Tech_Mono } from 'next/font/google'

const inter = Share_Tech_Mono({
  subsets: ['latin'],
  weight: "400"
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <main className={inter.className}>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
      <Analytics />
    </>
  );
}
