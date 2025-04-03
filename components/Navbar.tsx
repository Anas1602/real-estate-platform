"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  FiHome,
  FiUsers,
  FiMessageSquare,
  FiMenu,
  FiX,
  FiLogOut,
  FiUser,
} from "react-icons/fi";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { name: "Home", href: "/", icon: <FiHome className="mr-2" /> },
    {
      name: "Properties",
      href: "/properties",
      icon: <FiHome className="mr-2" />,
    },
    { name: "Groups", href: "/groups", icon: <FiUsers className="mr-2" /> },
    {
      name: "Messages",
      href: "/messages",
      icon: <FiMessageSquare className="mr-2" />,
    },
  ];

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-primary">
                GroupBuy Homes
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pathname === item.href
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                  }`}>
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {session ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/profile"
                  className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
                  <FiUser className="mr-2" />
                  {session.user?.name || "Profile"}
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
                  <FiLogOut className="mr-2" />
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-foreground bg-transparent hover:bg-muted">
                  Log in
                </Link>
                <Link
                  href="/auth/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark">
                  Sign up
                </Link>
              </div>
            )}
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none">
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 text-base font-medium ${
                  pathname === item.href
                    ? "bg-primary/10 text-primary border-l-4 border-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}>
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-border">
            {session ? (
              <div className="space-y-1">
                <Link
                  href="/profile"
                  className="flex items-center px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}>
                  <FiUser className="mr-3 h-6 w-6" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                  <FiLogOut className="mr-3 h-6 w-6" />
                  Sign out
                </button>
              </div>
            ) : (
              <div className="space-y-1 px-3">
                <Link
                  href="/auth/login"
                  className="flex justify-center w-full px-4 py-2 text-base font-medium text-foreground bg-muted rounded-md hover:bg-muted/80"
                  onClick={() => setMobileMenuOpen(false)}>
                  Log in
                </Link>
                <Link
                  href="/auth/register"
                  className="flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
                  onClick={() => setMobileMenuOpen(false)}>
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
