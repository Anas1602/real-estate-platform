import type { Metadata } from "next";
import "./globals.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import Link from "next/link";
import {
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

export const metadata: Metadata = {
  title: "GroupBuy Homes | Luxury Real Estate Group Buying",
  description:
    "Join forces with like-minded buyers to purchase luxury properties at unbeatable prices through our innovative group buying platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-12 w-12">
              <span className="font-serif text-3xl font-bold golden-gradient">
                GB
              </span>
            </div>
            <div>
              <span className="font-serif font-bold text-xl block leading-none text-foreground">
                GroupBuy
              </span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                Luxury Real Estate
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/properties"
              className="text-sm font-medium uppercase tracking-wider hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-primary after:transition-all">
              Properties
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm font-medium uppercase tracking-wider hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-primary after:transition-all">
              How It Works
            </Link>
            <Link
              href="/groups"
              className="text-sm font-medium uppercase tracking-wider hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-primary after:transition-all">
              Active Groups
            </Link>
            <Link
              href="/messages"
              className="text-sm font-medium uppercase tracking-wider hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[1px] after:bg-primary after:transition-all">
              Messages
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              href="/auth/login"
              className="hidden md:inline-block text-sm font-medium uppercase tracking-wider hover:text-primary transition-colors">
              Login
            </Link>
            <Link href="/auth/register" className="btn-primary">
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo & About */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center space-x-2">
              <div className="relative h-12 w-12">
                <span className="font-serif text-3xl font-bold text-white">
                  GB
                </span>
              </div>
              <div>
                <span className="font-serif font-bold text-xl block leading-none text-white">
                  GroupBuy
                </span>
                <span className="text-xs uppercase tracking-widest text-gray-300">
                  Luxury Real Estate
                </span>
              </div>
            </Link>
            <p className="text-gray-300 text-sm mt-4">
              A revolutionary platform that brings together like-minded
              individuals to purchase luxury properties at exceptional prices
              through collective buying power.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://instagram.com"
                className="text-gray-300 hover:text-white transition-colors">
                <FiInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                className="text-gray-300 hover:text-white transition-colors">
                <FiFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-300 hover:text-white transition-colors">
                <FiTwitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-300 hover:text-white transition-colors">
                <FiLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-serif text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/properties"
                  className="text-gray-300 hover:text-white transition-colors text-sm">
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="text-gray-300 hover:text-white transition-colors text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/groups"
                  className="text-gray-300 hover:text-white transition-colors text-sm">
                  Active Groups
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-white transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-white font-serif text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-gray-300 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-gray-300 hover:text-white transition-colors text-sm">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-gray-300 hover:text-white transition-colors text-sm">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white font-serif text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMail className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  hello@groupbuyhomes.com
                </span>
              </li>
              <li className="flex items-start">
                <FiPhone className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <FiMapPin className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  123 Luxury Lane, Suite 500
                  <br />
                  San Francisco, CA 94105
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} GroupBuy Homes. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
