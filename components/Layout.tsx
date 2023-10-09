import React, { ReactNode } from "react";
import Header from "./Header";
import Nav from "./Nav";
import Breadcrumbs from "./Breadcrumbs";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
    <Nav />
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <Breadcrumbs />
      {props.children}
    </div>
  </div>
);

export default Layout;
