import "./globals.css";
import { NavBar } from "../../components/NavBar";
import { CreateThread } from "../../components/CreateThread";
import { Inter } from "next/font/google";
import Feed from "../../components/Feed";
import { TanstackProvider } from "../../components/providers/tanstack-provider";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  weight: ["400", "500"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Instantiate QueryClient on the client-side

  return (
    <html lang="en" className={inter.variable}>
      <body className={"antialiased"}>
        <TanstackProvider>
          <NavBar />
          <Feed>
            <CreateThread />
          </Feed>
        </TanstackProvider>
      </body>
    </html>
  );
}
