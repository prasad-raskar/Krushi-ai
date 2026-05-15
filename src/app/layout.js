import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/context/LanguageContext";
import PWARegister from "@/components/PWARegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "कृषीAI — पुढच्या पिढीचे AI शेती व्यासपीठ",
  description: "AI-सक्षम कृषी सहाय्यक — रोग ओळख, हवामान बुद्धिमत्ता, उत्पादन अंदाज आणि थेट बाजार व्यापार. १ कोटी+ शेतकऱ्यांना सशक्त करत आहोत.",
  keywords: "कृषीAI, AI शेती, पीक स्कॅन, कृषी तंत्रज्ञान, स्मार्ट शेती, अचूक शेती",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "कृषीAI",
  },
  openGraph: {
    title: "कृषीAI — पुढच्या पिढीचे AI शेती व्यासपीठ",
    description: "कृत्रिम बुद्धिमत्तेने जगभरातील शेतकऱ्यांना सशक्त करत आहोत.",
    type: "website",
  },
  icons: {
    icon: "/icon-192x192.png",
    apple: "/icon-512x512.png",
  },
};

export const viewport = {
  themeColor: "#020804",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="mr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#020804] text-white selection:bg-emerald-500/30 selection:text-white">
        <LanguageProvider>
          <PWARegister />
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
