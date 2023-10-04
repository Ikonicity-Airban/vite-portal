import { Card, Tooltip } from "flowbite-react";
import { FaKey, FaQuestionCircle } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";

import { BreadcrumbComponents } from "../components";
import LoginPage from "../pages/login";

export function LoginLayout() {
  return (
    <div className="max-w-screen-desktop mx-auto">
      <div className="m-6">
        <BreadcrumbComponents />
      </div>
      <main className="flex flex-col items-center justify-center space-y-5 my-9 p-2 relative">
        <div className="absolute left-[10%] -top-2 md:left-[37%] flex items-center gap-3">
          <FaQuestionCircle />
          <Tooltip
            trigger="hover"
            content={
              <>
                <span>
                  This Login is for all users just fill in your credentials"
                </span>
              </>
            }
            className="absolute min-w-[300px]"
          >
            <span className="cursor">Help</span>
          </Tooltip>
        </div>{" "}
        <LoginPage />
        <Card className="w-full max-w-sm">
          <h5 className="text-center space-y-4 text-sm">
            Don't have an account?
          </h5>
          <div className="text-gray-600 dark:text-gray-400 flex mx-auto space-x-2">
            <FaKey />
            <Link
              to="/create-account/student"
              preventScrollReset={false}
              className="logo-clipped"
            >
              Sign up now
            </Link>
          </div>
        </Card>
      </main>
    </div>
  );
}
export function SignUpLayout() {
  return (
    <main className="flex flex-col w-full items-center justify-center space-y-5 smallScreens:p-4 mb-10">
      <div className="flex mt-4 rounded-md items-center justify-evenly text-xs">
        <div className="absolute left-[25%] flex items-center gap-3">
          <FaQuestionCircle />
          <Tooltip
            trigger="hover"
            content={
              <ol className="space-y-4 list-decimal list-inside p-4">
                <h4>Need help registering?</h4>
                <li>Click on student to register as a student</li>
                <li>
                  Likewise, Click on Instructor to register as an Instructor
                </li>
              </ol>
            }
            className="absolute min-w-[400px]"
          >
            <a href="#">Help</a>
          </Tooltip>
        </div>
        <NavLink
          to="student"
          replace
          className={({ isActive }) =>
            `text-center p-2 after:h-1 ${
              isActive ? "text-3xl logo-clipped uppercase" : ""
            }`
          }
        >
          Student
        </NavLink>
        <NavLink
          replace
          to="instructor"
          className={({ isActive }) =>
            `text-center transition-[font-size]  duration-300 ${
              isActive ? "text-3xl logo-clipped uppercase" : ""
            }`
          }
        >
          Instructor
        </NavLink>
      </div>
      <Outlet />
      <Card className="w-full max-w-md">
        <h5 className="text-center text-sm space-y-4">
          Already have an account?
        </h5>
        <div className="text-gray-500 dark:text-gray-400 flex mx-auto space-x-2">
          <FaKey />
          <Link to="/login" className="logo-clipped">
            Login
          </Link>
        </div>
      </Card>
    </main>
  );
}
