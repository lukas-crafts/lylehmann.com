import { Theme } from "@radix-ui/themes";
import type { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
  className?: string;
}

export default function ThemeProvider({
  children,
  className,
}: ThemeProviderProps) {
  return (
    <Theme
      appearance="inherit"
      accentColor="orange"
      grayColor="slate"
      panelBackground="solid"
      scaling="100%"
      radius="medium"
      className={className}
    >
      {children}
    </Theme>
  );
}
