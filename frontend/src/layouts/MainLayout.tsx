import { FooterComponent, NavbarComponent } from "../components";
import { Outlet, useLocation } from "react-router-dom";

import { Helmet } from "react-helmet";

function MainLayout() {
  const path = useLocation().pathname;
  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="A home of computer geniuses and greater minds"
        />
        <title>
          CSDP | {path.split("/")[1].split("-").join(" ") || "Home"}
        </title>
      </Helmet>{" "}
      {/* header */}
      <NavbarComponent />
      {/* main body */}
      <div className="min-h-[70vh] w-full">
        {/* the children auth */}
        <Outlet />
      </div>
      <FooterComponent />
      {/* footer */}
    </div>
  );
}

export default MainLayout;
