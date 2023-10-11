import React, { ReactNode } from "react";
import Nav from "./Nav";
import Breadcrumbs from "./Breadcrumbs";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className="bg-gradient-to-r from-gray-800 to-cyan-200 min-h-screen">
    <Nav />
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <Breadcrumbs />
      {props.children}
    </div>
  </div>
);

export default Layout;
