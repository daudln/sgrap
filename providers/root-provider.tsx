import React from "react";
import QueryProvider from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";

interface RootProviderProps {
  children: React.ReactNode;
}

const RootProvider = ({ children }: RootProviderProps) => {
  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
};

export default RootProvider;
