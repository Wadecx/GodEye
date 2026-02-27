"use client";

import Image from "next/image";
import { CircleUserRound, LogOut } from 'lucide-react';
import { useEffect, useState } from "react";
import { getUser, logout, JWTPayload } from "@/utils/auth";

export const Header = () => {
  const [user, setUser] = useState<JWTPayload | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <header className="flex bg-black/10 backdrop-blur-xl h-20 items-center top-0 left-0 w-full fixed z-50 px-6 border-b border-white/10">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/images/GodEye.png"
            alt="Logo"
            width={50}
            height={50}
            unoptimized
          />
          <h2 className="uppercase font-bold text-white">GodEye</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CircleUserRound className="text-white w-5 h-5" />
            <span className="text-white text-sm">{user?.name || ''}</span>
          </div>
          <button
            onClick={logout}
            className="text-white hover:text-red-400 transition-colors"
            title="Déconnexion"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
