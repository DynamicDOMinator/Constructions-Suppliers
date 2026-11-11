import { Almarai, Open_Sans, Tajawal } from "next/font/google";
import "./globals.css";
import AOSInit from "@/components/AOSInit";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { NotificationsProvider } from "@/context/NotificationsContext";

const almarai = Almarai({
  variable: "--font-almarai",
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  display: "swap",
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
      className={`${almarai.variable} ${openSans.variable} ${tajawal.variable} h-full antialiased overflow-x-hidden w-full max-w-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden w-full max-w-full bg-[#F9FAFC]" suppressHydrationWarning>
        <LanguageProvider>
          <AuthProvider>
            <NotificationsProvider>
              <AOSInit />
              {children}
            </NotificationsProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
