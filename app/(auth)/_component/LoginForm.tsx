"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/app/providers/authProvider";
import { loginSchema } from "@/app/schema/loginSchema";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/app/(root)/_component/Navbar";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuth();

  const formSchema = loginSchema;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
  });

  const loginImage = "/assets/images/loginImage.jpg";

  const onSubmit = async (values: LoginFormValues) => {
    const userExists = await login(values);
    if (userExists) {
      router.push("/");
      console.log("User logged in");
      toast.success("User logged in successfully");
    } else {
      console.log("Wrong email or password");
    }
  };

  return (
    <>
      <header className="hidden md:block">
        <Navbar />
      </header>
      <div className="flex flex-col md:flex-row h-screen">
        <div className="relative w-full h-1/2 md:w-1/2 md:h-full">
          <Image
            src={loginImage}
            alt="Login image"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className="md:w-1/2 flex justify-center items-center bg-[--color-background] p-4 md:p-0">
          <div className="w-full max-w-lg mx-auto p-6">
            <h1 className="text-4xl font-bold mb-10 text-left">Log In</h1>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-lg font-bold mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="shadow appearance-none border border-blue-500 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter Email"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    Please enter a valid email address.
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-lg font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border border-blue-500 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  {...form.register("password")}
                />
                {form.formState.errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    Please enter your password.
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Log In
                </button>
              </div>
            </form>
            <p className="text-center text-[--color-text-primary] text-xs mt-10">
              Not a member?
            </p>
            <p className="text-center text-gray-500 text-xs mt-1">
              <Link
                href="/register"
                className="text-[--color-text-primary] hover:text-blue-700 underline"
              >
                create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
