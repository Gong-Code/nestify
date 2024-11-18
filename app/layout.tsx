import type { Metadata } from "next";
import "./globals.css";
import AuthContextProvider from "./providers/authProvider";
import { BookingProvider } from "./contexts/BookingContext";
import { Toaster } from "react-hot-toast";

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
          <BookingProvider>
            <>
              <Toaster />
              {children}
            </>
          </BookingProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
