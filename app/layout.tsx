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
  title: {
    default: "ProfileGlow: AI Dating Profile Optimizer & Audit",
    template: "%s | ProfileGlow",
  },
  description:
    "AI dating profile optimizer for Tinder, Hinge, and Bumble. Upload photos and bio to get an instant makeover report with photo rankings, bio rewrites, and conversation openers.",
  alternates: {
    canonical: "https://profileglow.tech",
  },
  verification: {
    google: "GcBRaC6lh3pDGXBrzPzfvaarwG36lHIy94WnH",
  },
  openGraph: {
    title: "ProfileGlow: AI Dating Profile Optimizer (Tinder, Hinge, Bumble)",
    description:
      "AI-powered dating profile audit, photo rankings, bio rewrites, and conversation openers engineered for more quality matches on Tinder, Hinge, and Bumble.",
    url: "https://profileglow.tech",
    siteName: "ProfileGlow",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "ProfileGlow AI Dating Profile Optimizer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProfileGlow: AI Dating Profile Optimizer (Tinder, Hinge, Bumble)",
    description:
      "AI-powered dating profile audit, photo rankings, bio rewrites, and conversation openers engineered for more quality matches on Tinder, Hinge, and Bumble.",
    images: ["/og-default.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
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
        {/* Microsoft Clarity Tracking */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "z68nij6rnd");
          `}
        </Script>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
