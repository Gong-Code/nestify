"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/authProvider";

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const { user: currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      router.push("/log-in");
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null;
  }

  return <div>{children}</div>;
};

export default PublicLayout;
