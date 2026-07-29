import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import Script from "next/script";

import { SkipLink } from "@/components/layout/site-header";
import { accessibilityBootstrapScript } from "@/features/accessibility-system/lib/bootstrap-script";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s · ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${syne.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="accessibility-bootstrap"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: accessibilityBootstrapScript }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground">
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
