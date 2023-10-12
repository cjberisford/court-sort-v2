import React, { ReactNode } from "react";
import Nav from "./Nav";
import Breadcrumbs from "./Breadcrumbs";
import { ThemeProvider } from "./theme-provider";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >  <div className="bg-background text-foreground min-h-screen">
      <Nav />
      <div className="mx-auto max-w-6xl px-2 md:px-4 lg:px-8">
        <Breadcrumbs />
        {props.children}
      </div>
    </div>
  </ThemeProvider>
);

export default Layout;
