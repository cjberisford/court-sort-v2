import React, { ReactNode } from "react";
import Header from "./Header";
import Nav from "./Nav";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Nav />
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">{props.children}</div>
  </div>
);

export default Layout;
