"use client";

import Image from "next/image";
import { CircleUserRound, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { getUser, logout, JWTPayload } from "@/utils/auth";
import { HatGlasses } from 'lucide-react';

export const Header = () => {
  const [user, setUser] = useState<JWTPayload | null>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <header className="flex h-20 items-center bg-black/50 backdrop-blur-3xl backdrop-saturate-150 sticky top-10 z-50 max-w-7/10 mx-auto rounded-full border border-white/10">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <HatGlasses className="text-white w-6 h-6" />
          <h2 className="uppercase font-bold text-white">GodEye</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CircleUserRound className="text-white w-5 h-5" />
            <span className="text-white text-sm">{user?.name || ""}</span>
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
