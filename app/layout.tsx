import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const GA_ID = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-KGW87C9PCH";

export const metadata: Metadata = {
  metadataBase: new URL("https://profileglow.tech"),
  title: "ProfileGlow: Dating Profile Optimization",
  description:
    "Upload your dating profile photos and bio to get a complete makeover report with rewritten bios, photo rankings, and conversation openers.",
  verification: {
    google: "GcBRaC6lh3pDGXBrzPzfvaarwG36lHIy94WnH",
  },
  openGraph: {
    title: "ProfileGlow: AI Dating Profile Doctor",
    description:
      "Get an evidence-based audit for Hinge, Bumble, and Tinder. Photo critiques, bio rewrites, and conversation openers.",
    url: "https://profileglow.tech",
    siteName: "ProfileGlow",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "ProfileGlow Dating Profile Optimization",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProfileGlow: AI Dating Profile Doctor",
    description:
      "Get an evidence-based audit for Hinge, Bumble, and Tinder. Photo critiques, bio rewrites, and conversation openers.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Analytics Tracking */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
