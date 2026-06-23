import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LanguageProvider } from "@/components/LanguageContext";

export const metadata: Metadata = {
  title: {
    default: "SLDS",
    template: "%s · SLDS",
  },
  description:
    "SLDS is the design system for Sri Lanka's government digital services — maintained by GovTech Sri Lanka. Foundations, components, and guidelines for citizen-facing products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <LanguageProvider>
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
