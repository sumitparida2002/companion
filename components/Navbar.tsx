"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { MobileSidebar } from "./MobileSidebar";

const font = Poppins({ weight: "600", subsets: ["latin"] });

export const Navbar = () => {
  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 h-16 border-b border-primary/10 bg-secondary">
      <div className="flex items-center">
        <MobileSidebar />
        <Link href="/">
          <h1
            className={cn(
              "hidden md:block text-xl md:text-3xl font-bold text-primary",
              font.className
            )}
          >
            companion
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};
