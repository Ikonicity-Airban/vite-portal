import {
  FaFacebookF,
  FaInstagramSquare,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import { Footer } from "flowbite-react";
import LogoComponent from "./LogoComponent";

export default function FooterComponent() {
  return (
    <Footer
      container
      className="text-sm bg-gradient-to-t from-blue-950 to-green-900 text-white "
    >
      <div className="w-full max-w-screen-desktop mx-auto">
        <div className="">
          <div className="mx-0 mb-10">
            <LogoComponent />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6 font-thin">
            <div>
              <Footer.Title title="about" className="text-white" />
              <Footer.LinkGroup col className="text-white text-sm">
                <Footer.Link href="#">Flowbite</Footer.Link>
                <Footer.Link href="#">Tailwind CSS</Footer.Link>
                <Footer.Link href="#">Academic calender</Footer.Link>
                <Footer.Link href="#">Event calender</Footer.Link>
                <Footer.Link href="#">Admission calender</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" className="text-white" />
              <Footer.LinkGroup col className="text-white text-sm">
                <Footer.Link href="#">Github</Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
                <Footer.Link href="#">NACEST campus life</Footer.Link>
                <Footer.Link href="#">Online community</Footer.Link>
                <Footer.Link href="#">Event</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Student" className="text-white" />
              <Footer.LinkGroup col className="text-white text-sm">
                <Footer.Link href="http://localhost:5173/login">
                  Student Information
                </Footer.Link>
                <Footer.Link href="#">Course Information</Footer.Link>
                <Footer.Link href="#">Schedule of classes</Footer.Link>
                <Footer.Link href="#">Technical services</Footer.Link>
                <Footer.Link href="#">Black Board(portal)</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" className="text-white" />
              <Footer.LinkGroup col className="text-white text-sm">
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms & Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            by="Ikonicity Airban™"
            href="#"
            year={2022}
            className="text-white text-sm"
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaLinkedinIn></FaLinkedinIn>
            </a>
            <a href="#">
              <FaYoutube></FaYoutube>
            </a>
            <a href="#">
              <FaInstagramSquare></FaInstagramSquare>
            </a>
          </div>
        </div>
      </div>
    </Footer>
  );
}
