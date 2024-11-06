"use client";

import { useAuth } from "@/app/providers/authProvider";
import { loginSchema } from "@/app/validation/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { login, user } = useAuth();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    const userExists = await login(values);
    if (userExists) {
      router.push("/");
      console.log("User logged in");
    } else {
      console.log("Wrong email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 dark:bg-gray-950 transition-colors">
      <div className="w-full max-w-md p-8 bg-gray-800 dark:bg-gray-900 shadow-lg rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-200 dark:text-gray-100">
          Log In
        </h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              required
              className="mt-2 p-3 w-full border border-gray-600 dark:border-gray-700 rounded-md bg-gray-700 dark:bg-gray-800 text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
            />
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
              required
              className="mt-2 p-3 w-full border border-gray-600 dark:border-gray-700 rounded-md bg-gray-700 dark:bg-gray-800 text-gray-100 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring focus:ring-blue-500"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};
