import React, { ReactNode } from "react";
import Nav from "./Nav";
import Breadcrumbs from "./Breadcrumbs";
import { ThemeProvider } from "./theme-provider";
import { Input } from "./ui/input";

type Props = {
  children: ReactNode;
  width: String;
};

const Layout: React.FC<Props> = (props) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <div className="bg-background text-foreground flex flex-col min-h-screen">
      {/* <Nav /> */}
      <div className={`${props.width === 'full' ? "min-w-screen" : "mx-auto max-w-6xl px-2 sm:px-8 md:px-8 lg:px-8"} flex flex-col grow w-full`}>
        {props.children}
      </div>
    </div>
  </ThemeProvider>
);

export default Layout;


// <div className="flex justify-between">
// <div>
//   {/* <Breadcrumbs /> */}
// </div>
// <div className="my-2">
//   {/* <Input placeholder="Search..." /> */}
// </div>
// </div>