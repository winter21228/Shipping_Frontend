import React from "react";
import { Link } from "react-router-dom";

import { PATH_AUTH } from "../routes/paths";

export default function LoginLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col w-full bg-white">
      {/* Header */}
      <header className="fixed w-full grow-0 z-10 flex items-center justify-around h-20 px-8 border-b bg-white">
        <div className="flex flex-row items-center gap-8">
          <Link to="/" className="flex items-center space-x-2 py-2 max-h-20">
            <img src="/favicon/logo.png" alt="logo" className="h-16" />
          </Link>
          <nav className="hidden md:flex items-center space-x-8 text-base font-medium">
            <Link to="#" className="font-bold text-xl hover:text-sky-500">
              Rates
            </Link>
            <Link to="#" className="font-bold text-xl hover:text-sky-500">
              Features
            </Link>
            <Link to="#" className="font-bold text-xl hover:text-sky-500">
              Support
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to={PATH_AUTH.login}
            className="text-black font-bold text-xl hover:text-sky-500"
          >
            Login
          </Link>
          <Link
            to={PATH_AUTH.register}
            className="px-4 py-2 border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white font-bold rounded-lg transition"
          >
            Create a FREE account
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex w-full items-center justify-center py-8 bg-white mt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full flex flex-col h-16 md:flex-row items-center justify-center md:justify-between px-8 py-6 text-sm border-t text-gray-500 bg-white space-y-2 md:space-y-0 z-20">
        <div className="flex space-x-4">
          <Link to="#" className="hover:underline">
            Privacy Policy
          </Link>
          <Link to="#" className="hover:underline">
            Terms of Use
          </Link>
          <Link to="#" className="hover:underline">
            DPA
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link to="#" className="hover:underline">
            Cookies Notice
          </Link>
          <Link to="#" className="hover:underline">
            Manage Your Privacy & Data Settings
          </Link>
        </div>
      </footer>
    </div>
  );
}
