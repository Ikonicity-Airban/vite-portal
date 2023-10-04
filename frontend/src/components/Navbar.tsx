import { Button, Navbar } from "flowbite-react";
import { Link, NavLink, NavLinkProps } from "react-router-dom";

import LogoComponent from "./LogoComponent";

const navLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "News",
    link: "/latest-news",
  },
  {
    name: "Contact Us",
    link: "/contact-us",
  },
  {
    name: "About Us",
    link: "/about-us",
  },
  {
    name: "Staff",
    link: "/staff",
  },
];

export default function NavbarComponent() {
  const activeLink: NavLinkProps["className"] = ({ isActive, isPending }) =>
    `text-base lg:px-2 py-1 mx-auto md:mx-0 font-medium order-1 ${
      isPending
        ? "text-gray-700"
        : isActive
        ? "border-primary md:border-b-2 logo-clipped"
        : ""
    }`;

  return (
    <Navbar
      fluid
      rounded
      className="z-[50] shadow bg-[#fff9] backdrop-blur-lg sticky top-0 w-full"
    >
      <div className="flex-[1.9] flex items-center space-x-4">
        <div className="md:hidden px-2">
          <Navbar.Toggle />
        </div>

        <Link to="/">
          <LogoComponent />
        </Link>
      </div>
      <div className=" hidden md:order-1 sm:mx-0 mobile:flex tablet:justify-end tablet:flex-[2]">
        <Button
          className="px-4 bg-primary shadow-md text-white"
          size="sm"
          gradientDuoTone={"greenToBlue"}
        >
          <Link to="/login" className="hover:text-white">
            Login
          </Link>
        </Button>
      </div>
      <Navbar.Collapse className="">
        <div className="order-2 mx-auto mobile:hidden">
          <Button
            size="sm"
            className="px-4 bg-primary shadow-md my-6 text-white"
            gradientDuoTone={"greenToBlue"}
          >
            <Link to="/login" className="hover:text-white">
              Login
            </Link>
          </Button>
        </div>
        {navLinks.map(({ name, link }) => (
          <NavLink to={link} title="Home" className={activeLink} key={name}>
            {name}
          </NavLink>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}
