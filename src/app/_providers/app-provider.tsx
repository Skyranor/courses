"use client";
import { AppSessionProvider } from "@/entities/session/app-session-provider";
import { ThemeProvider } from "@/features/theme/theme-provider";
import { queryClient } from "@/shared/api/query-client";
import { ComposeChildren } from "@/shared/lib/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ComposeChildren>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      />
      <AppSessionProvider />
      <QueryClientProvider client={queryClient} />
      {children}
    </ComposeChildren>
  );
}
