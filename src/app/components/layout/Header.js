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

  const [showDropdown, setShowDropdown] = useState(false);

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

  const linkStyle =
    "hover:underline hover:decoration-[3px] hover:decoration-[#f60d0d] hover:underline-offset-4 px-2 py-1 rounded-md transition-all duration-200 ease-in-out hover:bg-[#f60d0d]/10";

  return (
    <header className="flex items-center justify-between relative px-6 py-4 shadow bg-white">
      <Link className="text-primary font-semibold text-2xl" href="/">
        Inventec
      </Link>
      <nav className="flex items-center gap-5 text-gray-600 font-semibold relative">
        <Link className={linkStyle} href="/">Home</Link>
        <Link className={linkStyle} href="/product">Product</Link>
        {status === "authenticated" && session.data?.user?.role === "admin" && (
          <Link className={linkStyle} href="/createproduct">
            Create Product
          </Link>
        )}

        {/* Developer dropdown container */}
        <div
          className="relative"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button
            className={`focus:outline-none ${linkStyle}`}
            type="button"
            aria-haspopup="true"
            aria-expanded={showDropdown}
          >
            Developer
          </button>

          {showDropdown && (
            <div className="absolute top-full left-0 bg-white border rounded-lg shadow-lg min-w-[160px] z-50 overflow-hidden">
              <Link
                href="/developer/qc01"
                className="block px-5 py-3 hover:bg-[#f60d0d] hover:text-white transition-all duration-150"
                onClick={() => setShowDropdown(false)}
              >
                QC01
              </Link>
              <Link
                href="/developer/nvidia-jetson"
                className="block px-5 py-3 hover:bg-[#f60d0d] hover:text-white transition-all duration-150"
                onClick={() => setShowDropdown(false)}
              >
                Nvidia Jetson
              </Link>
            </div>
          )}
        </div>

        <Link className={linkStyle} href="/about">About</Link>
        <Link className={linkStyle} href="/contact">Contact</Link>
      </nav>

      <nav className="flex items-center gap-4 text-gray-600 font-semibold">
        {status === "authenticated" && (
          <>
            <span className="justify-center flex text-gray-400 text-xs">
              {session.data?.user?.email}
            </span>
            <button
              onClick={() => signOut()}
              className="bg-primary rounded-full text-white px-4 py-2 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-150"
            >
              Logout
            </button>
          </>
        )}
        {status === "unauthenticated" && (
          <>
            <Link className={linkStyle} href="/login">Login</Link>
            <Link
              className="bg-primary rounded-full text-white px-4 py-2 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-150"
              href="/register"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
