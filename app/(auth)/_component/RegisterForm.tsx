"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/app/schema/registerSchema";
import { z } from "zod";
import { useAuth } from "@/app/providers/authProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/app/(root)/_component/Navbar";

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const formSchema = registerSchema;

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const { register } = useAuth();

  const registerImage = "/assets/images/registerImage.jpg";

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const uid = await register(values);
      if (!uid) {
        throw new Error("Registration failed, no ID returned");
      }
      console.log("User registered successfully");
      router.push("/log-in");
      form.reset();
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <>
      <header className="hidden md:block">
        <Navbar />
      </header>
      <div className="flex flex-col md:flex-row h-screen">
        <div className="md:w-1/2 h-1/2 md:h-full">
          <img
            src={registerImage}
            alt="Register image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 flex justify-center items-center bg-[--color-background] p-4 md:p-0">
          <div className="w-full max-w-lg mx-auto p-6">
            <h1 className="text-4xl font-bold mb-10 text-left">Register</h1>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-lg font-bold mb-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Enter First Name"
                  {...form.register("firstName")}
                  className="shadow appearance-none border border-blue-500 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {form.formState.errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-lg font-bold mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Enter Last Name"
                  {...form.register("lastName")}
                  className="shadow appearance-none border border-blue-500 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {form.formState.errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.lastName.message}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-lg font-bold mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  {...form.register("email")}
                  className="shadow appearance-none border border-blue-500 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.email.message}
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
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  {...form.register("password")}
                  className="shadow appearance-none border border-blue-500 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {form.formState.errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-lg font-bold mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  {...form.register("confirmPassword")}
                  className="shadow appearance-none border border-blue-500 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {form.formState.errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {form.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
            <p className="text-center text-[--color-text-primary] text-xs mt-10">
              Already have an account?
            </p>
            <p className="text-center text-[--color-text-primary] text-xs mt-1">
              <Link
                href="/log-in"
                className="text-[--color-text-primary] hover:text-blue-700 underline"
              >
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
