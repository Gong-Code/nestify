"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase.config";
import { useAuth } from "@/app/providers/authProvider";

import { Calendar, CircleUserRound, LogOut } from "lucide-react";
import { NavbarSearch } from "@/app/components/SearchInputs";

export const Navbar = () => {
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const [searchValue, setSearchValue] = useState("");

  const logo = "/assets/images/logo.png";

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      router.push("/");
    } catch (error) {
      const appError = {
        message:
          error instanceof Error
            ? error.message
            : "An error occurred while signing out",
        code: error instanceof Error ? undefined : error,
      };
      console.log("Error signing out", appError);
    }
  };

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      {/* Mobile view */}
      <span className="py-6 border-b shadow-md justify-center flex gap-6 items-center md:hidden">
        <NavbarSearch
          value={searchValue}
          onChange={handleSearchInput}
          placeholder="Search..."
        />
        {!currentUser ? (
          <button
            className="bg-[--color-primary] hover:bg-[--color-primary-hover] px-3 py-2 rounded-full flex items-center gap-1.5"
            onClick={() => router.push("/log-in")}
          >
            <CircleUserRound className="size-6 text-[--color-text-secondary]" />
            <p className="text-[--color-text-secondary]">Log in</p>
          </button>
        ) : (
          <>
            <button
              className="bg-[--color-primary] hover:bg-[--color-primary-hover] px-3 py-2 rounded-full flex items-center gap-1.5"
              onClick={() => router.push("/user")}
            >
              <CircleUserRound className="size-6 text-[--color-text-secondary]" />
              <p className="text-[--color-text-secondary]">My account</p>
            </button>
            <button
              className="bg-[--color-primary] hover:bg-[--color-primary-hover] px-3 py-2 rounded-full flex items-center gap-1.5"
              onClick={handleLogout}
            >
              <LogOut className="size-6 text-[--color-text-secondary]" />
              <p className="text-[--color-text-secondary]">Log out</p>
            </button>
          </>
        )}
      </span>
      {/* Desktop view */}
      <div className="border-b shadow-md px-8 justify-between items-center py-4 hidden md:flex">
        <div className="flex items-center gap-4">
          <div
            className="cursor-pointer transition-all hover:translate-x-0.5"
            onClick={() => router.push("/")}
          >
            <Image src={logo} alt="Logo" width={150} height={50} />
          </div>
          {currentUser ? (
            <>
              <button
                className="flex items-center gap-1.5 bg-[--color-primary] hover:bg-[--color-primary-hover] px-3 py-2 rounded-full"
                onClick={() => router.push("/booking")}
              >
                <Calendar className="text-[--color-text-secondary] size-6" />
                <p className="text-[--color-text-secondary]">Booking</p>
              </button>

              <button
                className="flex items-center gap-1.5 bg-[--color-primary] hover:bg-[--color-primary-hover] px-3 py-2 rounded-full"
                onClick={() => router.push("/user")}
              >
                <CircleUserRound className="text-[--color-text-secondary] size-6" />
                <p className="text-[--color-text-secondary]">My account</p>
              </button>

              <button
                className="flex items-center gap-1.5 bg-[--color-primary] hover:bg-[--color-primary-hover] px-3 py-2 rounded-full"
                onClick={handleLogout}
              >
                <LogOut className="text-[--color-text-secondary] size-6" />
                <p className="text-[--color-text-secondary]">Log out</p>
              </button>
            </>
          ) : (
            <button
              className="bg-[--color-primary] gap-1.5 hover:bg-[--color-primary-hover] px-3 py-2 rounded-full flex items-center"
              onClick={() => router.push("/log-in")}
            >
              <CircleUserRound className="text-[--color-text-secondary] size-6" />
              <p className="text-[--color-text-secondary]">Log in</p>
            </button>
          )}
        </div>
        <NavbarSearch
          value={searchValue}
          onChange={handleSearchInput}
          placeholder="Search..."
        />
      </div>
    </div>
  );
};
