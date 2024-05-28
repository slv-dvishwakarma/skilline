import { Metadata } from "next";
import "./globals.css";
import { ParentContainer } from "@/components/ParentContainer";
import { Header } from "@/components/template/Header";
import { Footer } from "@/components/template/Footer";
import Providers from "@/Redux/Providers";
import { startMirageServer } from "../miragejs/server";
import { Roboto, Poppins } from 'next/font/google'


export const metadata: Metadata = {
  title: "Skilline",
  description: "Learning Platform",
};


const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  startMirageServer();
  return (
    <html lang="en" className={` ${poppins.className}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        
        <link
          href="https://cdn.quilljs.com/1.0.0/quill.snow.css"
          rel="stylesheet"
        />

        <script src="https://cdn.quilljs.com/1.0.0/quill.js"></script>
      </head>
      <body>
        <Providers>
          <ParentContainer className="bg-primary">
            <Header />
          </ParentContainer>
          {children}
          <ParentContainer className="bg-footer_bg">
            <Footer />
          </ParentContainer>
        </Providers>
      </body>
    </html>
  );
}
