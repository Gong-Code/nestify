"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/app/schema/registerSchema";
import { createUser } from "@/app/lib/user.db";
import { z } from "zod";
import { useAuth } from "@/app/providers/authProvider";

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const formSchema = registerSchema;

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
  });

  const { register } = useAuth();

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const uid = await register(values);
      if (!uid) {
        throw new Error("Registration failed, no ID returned");
      }
      console.log("User registered successfully");
      form.reset();
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 dark:bg-gray-950 transition-colors">
      <div className="w-full max-w-md p-8 bg-gray-800 dark:bg-gray-900 shadow-lg rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-200 dark:text-gray-100">
          Register
        </h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-300"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              {...form.register("firstName")}
              className="mt-2 p-3 w-full border border-gray-600 dark:border-gray-700 rounded-md bg-gray-700 dark:bg-gray-800 text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
            />
            {form.formState.errors.firstName && (
              <p className="text-red-500">
                {form.formState.errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-300"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              {...form.register("lastName")}
              className="mt-2 p-3 w-full border border-gray-600 dark:border-gray-700 rounded-md bg-gray-700 dark:bg-gray-800 text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
            />
            {form.formState.errors.lastName && (
              <p className="text-red-500">
                {form.formState.errors.lastName.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...form.register("email")}
              className="mt-2 p-3 w-full border border-gray-600 dark:border-gray-700 rounded-md bg-gray-700 dark:bg-gray-800 text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
            />
            {form.formState.errors.email && (
              <p className="text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...form.register("password")}
              className="mt-2 p-3 w-full border border-gray-600 dark:border-gray-700 rounded-md bg-gray-700 dark:bg-gray-800 text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
            />
            {form.formState.errors.password && (
              <p className="text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...form.register("confirmPassword")}
              className="mt-2 p-3 w-full border border-gray-600 dark:border-gray-700 rounded-md bg-gray-700 dark:bg-gray-800 text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-red-500">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring focus:ring-blue-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
