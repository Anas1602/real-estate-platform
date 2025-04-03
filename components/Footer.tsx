import Link from "next/link";
import {
  FiHeart,
  FiMail,
  FiPhone,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">GroupBuy Homes</h3>
            <p className="text-muted-foreground text-sm leading-6 mb-4">
              Connecting home buyers to collectively negotiate better deals on
              real estate properties.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground">
                <FiFacebook />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground">
                <FiTwitter />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground">
                <FiInstagram />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground">
                <FiLinkedin />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/properties"
                  className="text-muted-foreground hover:text-foreground">
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/groups"
                  className="text-muted-foreground hover:text-foreground">
                  Active Groups
                </Link>
              </li>
              <li>
                <Link
                  href="/developers"
                  className="text-muted-foreground hover:text-foreground">
                  Developers
                </Link>
              </li>
              <li>
                <Link
                  href="/success-stories"
                  className="text-muted-foreground hover:text-foreground">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/how-it-works"
                  className="text-muted-foreground hover:text-foreground">
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/investor-guide"
                  className="text-muted-foreground hover:text-foreground">
                  Investor Guide
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <FiMail className="mr-2 text-muted-foreground" />
                <a
                  href="mailto:info@groupbuyhomes.com"
                  className="text-muted-foreground hover:text-foreground">
                  info@groupbuyhomes.com
                </a>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-2 text-muted-foreground" />
                <a
                  href="tel:+1234567890"
                  className="text-muted-foreground hover:text-foreground">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} GroupBuy Homes. All rights
              reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy-policy"
                className="text-xs text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-xs text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link
                href="/cookie-policy"
                className="text-xs text-muted-foreground hover:text-foreground">
                Cookie Policy
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-muted-foreground">
            <p className="flex items-center justify-center">
              Made with <FiHeart className="mx-1 text-error" /> for home buyers
              everywhere
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
