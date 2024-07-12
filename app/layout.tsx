import { GeistSans } from "geist/font/sans";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          {children}
          <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
            <p className="font-bold">
              <a href="https://giacomocap.github.io/blog" target="_blank" rel="noopener noreferrer">
                Giacomo Cappellozza {(new Date()).getFullYear()}
              </a>
            </p>
          </footer>
        </main>
      </body>
    </html>
  );
}
