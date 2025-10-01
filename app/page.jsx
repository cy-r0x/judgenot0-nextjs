"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import userMoudle from "@/api/user/user";

export default function App() {
  const router = useRouter();

  useEffect(() => {
    const userRole = userMoudle.getUserRole();
    console.log(userRole);
    if (userRole === "admin") {
      router.push("/admin");
    } else if (userRole === "setter") {
      router.push("/setter");
    } else {
      router.push("/contests");
    }
  }, [router]);

  return null;
}
