import type { Metadata } from "next";
import "./globals.css";
import AuthContextProvider from "./providers/authProvider";
import { BookingProvider } from "./contexts/BookingContext";

export const metadata: Metadata = {
  title: "Airbnb App",
  description: "Reserve an Airbnb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthContextProvider>
          <BookingProvider>{children}</BookingProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
