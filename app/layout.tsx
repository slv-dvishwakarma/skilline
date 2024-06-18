import { Metadata } from "next";
import "./globals.css"; 
import { ParentContainer } from "@/components/ParentContainer";
import { Header } from "@/components/template/Header";
import { Footer } from "@/components/template/Footer";
import { Poppins, Roboto } from 'next/font/google';

const poppins = Poppins({
  weight: [
    '100', '200', '300', '400', '500', '600', '700', '800', '900'
  ],
  style: [
    'normal', 'italic'
  ],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const roboto = Roboto({
  weight: [
    '100', '300', '400', '500', '700', '900'
  ],
  style: [
    'normal', 'italic'
  ],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Skilline",
  description: "Learning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} ${poppins.variable}`}>
      <head>
      </head>
      <body>
        <ParentContainer className="bg-primary">
          <Header />
        </ParentContainer>
        {children}
        <ParentContainer className="bg-footer_bg">
          <Footer />
        </ParentContainer>
      </body>
    </html>
  );
}