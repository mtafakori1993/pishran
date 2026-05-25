import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "پیشران",
  description:
    "به ابر اپلیکیشن پیشران خوش آمدید — خدمات اجتماعی، املاک، حمل‌ونقل هوشمند، ساختمان، غذا، تبلیغات و بیشتر.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" data-theme="dark" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
