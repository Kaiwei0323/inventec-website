'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Header() {
  const session = useSession();
  const status = session.status;
  const [hasRedirected, setHasRedirected] = useState(false);
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session.data);
  }, [status, session.data]);

  useEffect(() => {
    if (status === "authenticated" && !hasRedirected) {
      router.push("/");
      setHasRedirected(true);
    }
    if (status === "unauthenticated") {
      setHasRedirected(false);
    }
  }, [status, hasRedirected, router]);

  const linkStyle = "hover:text-primary hover:underline transition-colors duration-200 text-gray-600 font-medium";

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link className="flex items-center space-x-2" href="/">
            <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-600 bg-clip-text text-transparent">
              Inventec
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link className={linkStyle} href="/">Home</Link>
            <Link className={linkStyle} href="/product">Products</Link>
            {status === "authenticated" && session.data?.user?.role === "admin" && (
              <Link className={linkStyle} href="/createproduct">Create Product</Link>
            )}

            <Link className={linkStyle} href="/developer">Developer</Link>
            <Link className={linkStyle} href="/about">About</Link>
            <Link className={linkStyle} href="/contact">Contact</Link>
          </nav>

          {/* Auth Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {status === "authenticated" ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">{session.data?.user?.email}</span>
                <button
                  onClick={() => signOut()}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-600 font-medium hover:text-primary hover:underline transition-colors duration-200">Sign in</Link>
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md transition-colors duration-200" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link href="/product" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md transition-colors duration-200" onClick={() => setIsMobileMenuOpen(false)}>Products</Link>
            {status === "authenticated" && session.data?.user?.role === "admin" && (
              <Link href="/createproduct" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md transition-colors duration-200" onClick={() => setIsMobileMenuOpen(false)}>Create Product</Link>
            )}
            <Link href="/developer" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md transition-colors duration-200" onClick={() => setIsMobileMenuOpen(false)}>Developer</Link>
            <Link href="/about" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md transition-colors duration-200" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <Link href="/contact" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md transition-colors duration-200" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          </div>
          <div className="border-t border-gray-200 pb-3 pt-4">
            {status === "authenticated" ? (
              <div className="space-y-1 px-2">
                <div className="px-3 py-2 text-sm text-gray-500">{session.data?.user?.email}</div>
                <button
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md transition-colors duration-200"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="space-y-1 px-2">
                <Link href="/login" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md transition-colors duration-200" onClick={() => setIsMobileMenuOpen(false)}>Sign in</Link>
                <Link href="/register" className="block px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary rounded-md transition-colors duration-200" onClick={() => setIsMobileMenuOpen(false)}>Sign up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
