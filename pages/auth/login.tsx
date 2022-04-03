/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

import { LockClosedIcon } from "@heroicons/react/solid";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin({ email, password });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    loginMutation.mutate();
  };
  if (loginMutation.isSuccess) {
    router.push("/data");
  }

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full flex items-center justify-center py-12   px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-teal-400.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            {/* <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <a
                href="#"=
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                start your 14-day free trial
              </a>
            </p> */}
          </div>
          <form
            className="mt-8 space-y-6"
            method="POST"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm ">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#065D8C] focus:ring-[#065D8C] border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-[#065D8C] hover:text-[#065D8C]"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#065D8C] hover:bg-[#084F76] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#065D8C]"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {loginMutation.isLoading ? (
                    <svg
                      viewBox="-1.5 0 259 259"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      preserveAspectRatio="xMidYMid"
                      className="w-5 h-5 animate-spin text-secondary-100"
                    >
                      <g fill="rgba(20, 184, 166)">
                        <path d="M1.20368953,96.5716086 C1.20368953,96.9402024 0.835095614,97.6773903 0.835095614,98.0459843 C0.835095614,101.36333 3.41525309,104.312081 7.10119236,104.312081 L59.0729359,104.312081 C61.6530934,104.312081 63.496063,102.837706 64.6018448,100.626142 C75.2910686,77.0361305 98.8810798,61.1865916 125.788436,61.1865916 C163.016423,61.1865916 193.241125,91.4112936 193.241125,128.63928 C193.241125,165.867267 163.016423,196.091969 125.788436,196.091969 C98.5124859,196.091969 75.2910686,179.873835 64.6018448,157.021013 C63.496063,154.440855 61.6530934,152.96648 59.0729359,152.96648 L7.10119236,152.96648 C3.78384701,152.96648 0.835095614,155.546637 0.835095614,159.232575 C0.835095614,159.60117 0.835095614,160.338357 1.20368953,160.706952 C15.5788527,216.733228 66.0762205,258.015748 126.157031,258.015748 C197.295658,258.015748 255.164905,200.146502 255.164905,129.007874 C255.164905,57.8692464 197.295658,0 126.157031,0 C66.0762205,0 15.5788527,41.2825197 1.20368953,96.5716086 L1.20368953,96.5716086 Z" />
                      </g>
                    </svg>
                  ) : (
                    <LockClosedIcon
                      className="h-5 w-5 text-[#EFFDFA] group-hover:text-[#14B8A6]"
                      aria-hidden="true"
                    />
                  )}
                </span>
                {!loginMutation.isLoading ? "Sign in" : "Loading..."}
              </button>
            </div>
            {loginMutation.isError && (
              <div className="border-red-500 py-2 text-sm text-red-500 font-medium rounded-md border-2 justify-center flex">
                {(loginMutation.error as Error).message + ". Try Again"}{" "}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
