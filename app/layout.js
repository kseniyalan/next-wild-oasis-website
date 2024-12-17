import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

import "@/app/_styles/globals.css";

import { Josefin_Sans } from "next/font/google";

// Load the Josefin Sans font from Google Fonts
const josefin = Josefin_Sans({
  subsets: ["latin"], // Load only the Latin character set  
  display: "swap",
});

// %s will be replaced with the page title
export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  // Description for SEO for the whole site
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>Copyright by The Wild Oasis</footer>
      </body>
    </html>
  );
}
