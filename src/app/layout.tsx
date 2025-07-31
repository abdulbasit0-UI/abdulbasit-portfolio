import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import Header from './components/Header';
import Footer from './components/Footer';
import DarkModeScript from "./DarkModeScript";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Abdulbasit | Backend Developer",
  description:
    "Backend engineer specializing in Node.js, Nest Js, and distributed systems.",
  metadataBase: new URL("https://yourportfolio.com"),
  openGraph: {
    title: "Abdulbasit | Backend Developer",
    description: "Building robust backend systems with modern tech.",
    url: "https://yourportfolio.com",
    siteName: "Abdulbasit Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary",
    site: "@AbsAbhsyn",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
          id="highlight-theme-light"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css"
          id="highlight-theme-dark"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <ThemeProvider attribute="class">
          <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200">
            <Header />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
