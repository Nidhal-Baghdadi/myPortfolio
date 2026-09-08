"use client";

import { useTheme } from "@/context/themeContext";
import React from "react";

import Moon from "./models/Moon";
import Sun from "./models/Sun";

import RenderModel from "./RenderModel";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="fixed bottom-5 right-5 bg-black w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <RenderModel>
          <Sun />
        </RenderModel>
      ) : (
        <RenderModel>
          <Moon />
        </RenderModel>
      )}
    </button>
  );
}
