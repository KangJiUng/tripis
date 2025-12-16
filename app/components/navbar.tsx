"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import HomeIcon from "../icons/home-icon";
import CommunityIcon from "../icons/community-icon";
import PlusIcon from "../icons/plus-icon";
import PlanIcon from "../icons/plan-icon";
import ExpenseIcon from "../icons/expense-icon";

export default function NavBar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-13 bg-white border-t flex items-center justify-between px-6 z-50">

      <Link href="/" className="flex-1 flex flex-col items-center justify-end h-full pb-1">
        <div className="flex items-center justify-center h-4 mb-1">
          <HomeIcon color={isActive("/") ? "var(--color-black)" : "var(--color-inactive)"} />
        </div>
        <span className={`text-regular12 ${isActive("/") ? "text-black" : "text-inactive"}`}>
          여행홈
        </span>
      </Link>

      <Link href="/community" className="flex-1 flex flex-col items-center justify-end h-full pb-1">
        <div className="flex items-center justify-center h-4 mb-1">
          <CommunityIcon color={isActive("/community") ? "var(--color-black)" : "var(--color-inactive)"} />
        </div>
        <span className={`text-regular12 ${isActive("/community") ? "text-black" : "text-inactive"}`}>
          커뮤니티
        </span>
      </Link>

      <Link href="/plan/create" className="flex-1 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
          <PlusIcon />
        </div>
      </Link>

      <Link href="/plan" className="flex-1 flex flex-col items-center justify-end h-full pb-1">
        <div className="flex items-center justify-center h-4 mb-1">
          <PlanIcon color={isActive("/plan") ? "var(--color-black)" : "var(--color-inactive)"} />
        </div>
        <span className={`text-regular12 ${isActive("/plan") ? "text-black" : "text-inactive"}`}>
          일정
        </span>
      </Link>

      <Link href="/expense" className="flex-1 flex flex-col items-center justify-end h-full pb-1">
        <div className="flex items-center justify-center h-4 mb-1">
          <ExpenseIcon color={isActive("/expense") ? "var(--color-black)" : "var(--color-inactive)"} />
        </div>
        <span className={`text-regular12 ${isActive("/expense") ? "text-black" : "text-inactive"}`}>
          가계부
        </span>
      </Link>
    </nav>
  );
}
