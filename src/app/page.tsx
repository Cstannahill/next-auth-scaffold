import Image from "next/image";
import Link from "next/link";
import { LogoIcon } from "./components/Icon";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex items-center space-x-4">
          <LogoIcon size="4xl" className="flex-shrink-0" />
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Next.js Authentication Scaffold
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            A complete authentication system with login, register, and dashboard pages.
          </p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            href="/login"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
          >
            Sign Up
          </Link>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg w-full max-w-2xl">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Features Included:</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• User registration with form validation</li>
            <li>• Secure login with error handling</li>
            <li>• Protected dashboard page</li>
            <li>• Logout functionality</li>
            <li>• API routes for authentication</li>
            <li>• Responsive design with Tailwind CSS</li>
          </ul>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Link
          href="/login"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <LogoIcon size="xs" className="flex-shrink-0" />
          Login
        </Link>
        <Link
          href="/register"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <LogoIcon size="xs" className="flex-shrink-0" />
          Register
        </Link>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <LogoIcon size="xs" className="flex-shrink-0" />
          Dashboard →
        </Link>
      </footer>
    </div>
  );
}
