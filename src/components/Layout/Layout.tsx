import { Fragment, ReactNode } from "react";
import MainHeader from "./MainHeader";

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
