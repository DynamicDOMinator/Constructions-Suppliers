import { Geist, Geist_Mono, Tajawal } from "next/font/google";
import "./globals.css";
import AOSInit from "@/components/AOSInit";
import { AuthProvider } from "@/context/AuthContext";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CONSTRUCTIONS SUPPLIERS",
  description: "CONSTRUCTIONS SUPPLIERS",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={` ${tajawal.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <AuthProvider>
          <AOSInit />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
