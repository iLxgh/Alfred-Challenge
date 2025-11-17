"use client";

import { useTheme } from "@/services/useTheme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useTheme();

  return <>{children}</>;
}
