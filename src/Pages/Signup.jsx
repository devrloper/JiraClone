import React from "react";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900">
      <form
        className="bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border-4 border-blue-400 dark:border-blue-800 w-full max-w-md"
      >
        <div className="px-8 py-10 md:px-10">
          <h2 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-white">
            Create an Account ✨
          </h2>
          <p className="text-center text-zinc-600 dark:text-zinc-400 mt-3">
            Join us and start your journey today.
          </p>

          {/* Full Name */}
          <div className="mt-10">
            <label
              className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              placeholder="John Doe"
              className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
              name="name"
              id="name"
              type="text"
            />
          </div>

          {/* Email */}
          <div className="mt-6">
            <label
              className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
              htmlFor="email"
            >
              Email
            </label>
            <input
              placeholder="you@example.com"
              className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
              name="email"
              id="email"
              type="email"
            />
          </div>

          {/* Password */}
          <div className="mt-6">
            <label
              className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
              htmlFor="password"
            >
              Password
            </label>
            <input
              placeholder="••••••••"
              className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
              name="password"
              id="password"
              type="password"
            />
          </div>

          {/* Confirm Password */}
          <div className="mt-6">
            <label
              className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              placeholder="••••••••"
              className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
              name="confirmPassword"
              id="confirmPassword"
              type="password"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-10">
            <button
              className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-800"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-blue-200 dark:bg-zinc-800">
          <div className="text-sm text-blue-900 dark:text-blue-300 text-center">
            Already have an account?{" "}
            <a className="font-medium underline" href="#">
              Login
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
