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
      {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" /> */}
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