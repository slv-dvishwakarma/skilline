import { Metadata } from "next";
import "./globals.css";
import { ParentContainer } from "@/components/ParentContainer";
import { Header } from "@/components/template/Header";
import { Footer } from "@/components/template/Footer";
import Providers from "@/Redux/Providers";
import { startMirageServer } from "../miragejs/server";
export const metadata: Metadata = {
  title: "Skilline",
  description: "Learning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  startMirageServer();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto"
          rel="stylesheet"
        />
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
