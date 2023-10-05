import "../App.css";

import { Avatar, Dropdown, Navbar, Sidebar } from "flowbite-react";
import {
  FaBookOpen,
  FaBoxOpen,
  FaDiceFour,
  FaNewspaper,
  FaPagelines,
  FaRegUser,
  FaSignOutAlt,
  FaUser,
  FaUserEdit,
  FaUserGraduate,
} from "react-icons/fa";
import { IInstructor, IStudent } from "../api/@types";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Types, defaultInstructor, defaultStudent } from "../api/reducer";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "../api/context";
import { BreadcrumbComponents } from "../components";
import LogoComponent from "../components/LogoComponent";
import useAxiosPrivate from "../api/hooks/useAxiosPrivate";
import useLocalStorage from "../api/hooks/useLocalStorage";

const studentSideLinks = [
  { name: "Dashboard", link: "", icon: <FaDiceFour /> },
  { name: "Courses", link: "my-courses", icon: <FaBookOpen /> },
  { name: "Assignment", link: "assignment", icon: <FaBoxOpen /> },
];
const instructorSideLinks = [
  { name: "Dashboard", link: "", icon: <FaDiceFour /> },
  { name: "Assignment", link: "assignment", icon: <FaBoxOpen /> },
  { name: "Events", link: "events", icon: <FaNewspaper /> },
  { name: "Profile", link: "my-profile", icon: <FaUserEdit /> },
];

const AdminSideLinks = [
  { name: "Dashboard", link: "", icon: <FaDiceFour /> },
  { name: "News & Events", link: "events", icon: <FaNewspaper /> },
  { name: "Courses", link: "courses", icon: <FaPagelines /> },
  { name: "Students", link: "students", icon: <FaUserGraduate /> },
  { name: "Instructor", link: "instructors", icon: <FaRegUser /> },
];

export const StudentLayout = () => {
  const [toggle, setToggle] = useState(false);
  const { dispatch } = useContext(AppContext);
  const [width, setWidth] = useState<number>(window.innerWidth);

  const navigate = useNavigate();
  const http = useAxiosPrivate();
  const [student, setStudent] = useLocalStorage<IStudent>(
    "student",
    defaultStudent
  );

  useEffect(() => {
    let fetched = false;
    const fetchUser = async () => {
      const res = await http.get<IStudent>("students/my-profile");
      const user = res.data;
      setStudent(user);
    };

    !fetched && fetchUser();
    return () => {
      fetched = true;
    };
  }, []);

  useEffect(() => {
    function resize(e: UIEvent) {
      setWidth(e.view?.innerWidth || window.innerWidth);
      window.innerWidth > 640 && setToggle(false);
    }
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (!student.userId) {
      navigate("/login");
    }
  });

  if (student.userId)
    return (
      <section
        className="h-screen mx-auto w-full relative"
        // onClick={() => setToggle(false)}
      >
        {/* header */}

        <Navbar
          fluid
          rounded
          className="fixed -ml-1 top-0 w-full z-50 bg-[#ffffffaa] backdrop-blur-lg"
        >
          <div className="flex-[1.9] flex gap-6 items-center">
            <div className="tablet:hidden px-2">
              <Navbar.Toggle onClick={() => setToggle(!toggle)} />
            </div>
            <Link to="/">
              <LogoComponent />
            </Link>
          </div>
          <div className="p-2 md:pr-4">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  rounded
                  bordered
                  img={student.photoURL}
                  placeholderInitials={
                    student.userId
                      ? student.userId?.email.slice(0, 2).toUpperCase()
                      : ""
                  }
                  status="online"
                />
              }
            >
              <Link to="my-profile">
                <Dropdown.Header>
                  <span className="logo-clipped">
                    {student.firstName} {student.lastName}
                  </span>
                  <div className="">{student.userId.email}</div>
                </Dropdown.Header>
                <Dropdown.Item>
                  <div className="px-4">Profile</div>
                </Dropdown.Item>
              </Link>
              <Dropdown.Item
                href="/login"
                onClick={() =>
                  dispatch({
                    type: Types.logout,
                    payload: null,
                  })
                }
              >
                <div className="px-4">Logout</div>
              </Dropdown.Item>
            </Dropdown>
          </div>
        </Navbar>
        {/* main section */}
        <Sidebar
          id="logo-sidebar"
          aria-label="Sidebar" /* className="h-screen fixed shadow-lg" */
          className="float-left fixed -mt-1 left-0 z-40 mobile:w-3/5 sm:w-64  transition-transform h-screen border-r border-gray-100 dark:border-gray-800"
          style={{
            transform:
              toggle || width > 639 ? "translateX(0%)" : "translateX(-100%)",
          }}
        >
          <Sidebar.ItemGroup>
            {studentSideLinks.map(({ name, icon, link }) => (
              <div className="p-4 mt-10" key={name}>
                <NavLink
                  to={link}
                  className={({ isActive }) =>
                    `${isActive ? "text-primary" : "text-gray-500"}`
                  }
                  onClick={() => setToggle(false)}
                >
                  <div className="text-xs sm:text-sm flex items-center gap-6 ">
                    <span>{icon}</span>
                    <span>{name}</span>
                  </div>
                </NavLink>
              </div>
            ))}
          </Sidebar.ItemGroup>
        </Sidebar>
        <main className="min-h-screen tablet:ml-64 p-4 relative mt-16 dark:bg-gray-900">
          {toggle && (
            <div
              className="inset-0 absolute bg-[#1129] select-none"
              onClick={() => setToggle(!toggle)}
              onFocus={() => setToggle(!toggle)}
            ></div>
          )}
          <BreadcrumbComponents />
          <Outlet />
        </main>
        {/* </div> */}
      </section>
    );
};

export const InstructorLayout = () => {
  const [toggle, setToggle] = useState(false);
  const [width, setWidth] = useState<number>(window.innerWidth);
  // const navigate = useNavigate();
  const http = useAxiosPrivate();
  const { dispatch } = useContext(AppContext);
  const [instructor, setInstructor] = useLocalStorage<IInstructor>(
    "instructor",
    defaultInstructor
  );

  useEffect(() => {
    let fetched = false;
    const fetchUser = async () => {
      const res = await http.get<IInstructor>("Instructors/my-profile");
      const user = res.data;
      console.log(
        "🚀 ~ file: DashboardLayout.tsx:194 ~ fetchUser ~ user:",
        user
      );
      setInstructor(user);
    };

    !fetched && fetchUser();
    return () => {
      fetched = true;
    };
  }, []);

  useEffect(() => {
    function resize(e: UIEvent) {
      setWidth(e.view?.innerWidth || window.innerWidth);
      window.innerWidth > 640 && setToggle(false);
    }
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // useEffect(() => {
  //   if (!instructor.userId) {
  //     navigate("/login");
  //   }
  // });

  return (
    <>
      <Navbar
        fluid
        rounded
        className="fixed -ml-1 top-0 w-full z-50 bg-[#ffffffaa] shadow backdrop-blur-lg"
      >
        <div className="flex items-center">
          <div className="tablet:hidden px-2">
            <Navbar.Toggle />
          </div>
          <Link to="/">
            <LogoComponent />
          </Link>
        </div>
        <span className="logo-clipped font-semibold uppercase">
          Instructor Dashboard
        </span>
        <div className="p-2 md:pr-4">
          <Dropdown
            arrowIcon={false}
            className="text-gray-500"
            inline
            label={
              <Avatar
                rounded
                bordered
                img={instructor?.photoURL}
                placeholderInitials={instructor.userId?.email
                  ?.slice(0, 2)
                  .toUpperCase()}
                status="online"
              />
            }
          >
            <Dropdown.Header>
              <h4 className="font-semibold">
                {instructor.firstName} - {instructor.lastName}
              </h4>
              <h5 className="text-primary">{instructor.userId?.email}</h5>
            </Dropdown.Header>
            <Link to="my-profile">
              <Dropdown.Item icon={FaUser}>
                <div className="px-4">Profile</div>
              </Dropdown.Item>
            </Link>
            <Dropdown.Item
              icon={FaSignOutAlt}
              href="/login"
              onClick={() =>
                dispatch({
                  type: Types.logout,
                  payload: null,
                })
              }
            >
              <div className="px-4">Logout</div>
            </Dropdown.Item>
          </Dropdown>
        </div>
      </Navbar>
      <Sidebar
        id="logo-sidebar"
        aria-label="Sidebar" /* className="h-screen fixed shadow-lg" */
        className="float-left fixed -mt-1 left-0 z-40 mobile:w-3/5 sm:w-64  transition-transform h-screen border-r border-gray-100 dark:border-gray-800"
        style={{
          transform:
            toggle || width > 639 ? "translateX(0%)" : "translateX(-100%)",
        }}
      >
        <Sidebar.ItemGroup>
          {instructorSideLinks.map(({ name, icon, link }) => (
            <div className="p-4 mt-10" key={name}>
              <NavLink
                to={link}
                className={({ isActive }) =>
                  `${isActive ? "text-primary" : "text-gray-500"}`
                }
                onClick={() => setToggle(false)}
              >
                <div className="text-xs sm:text-sm flex items-center gap-6 ">
                  <span>{icon}</span>
                  <span>{name}</span>
                </div>
              </NavLink>
            </div>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar>
      <main className="min-h-screen tablet:ml-64 p-4 relative mt-16 dark:bg-gray-900">
        <BreadcrumbComponents />
        <Outlet />
      </main>
    </>
  );
};

export const AdminLayout = () => {
  const [toggle, setToggle] = useState(false);
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    function resize(e: UIEvent) {
      setWidth(e.view?.innerWidth || window.innerWidth);
      window.innerWidth > 640 && setToggle(false);
    }
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  return (
    <>
      <Navbar
        fluid
        rounded
        className="fixed -ml-1 top-0 w-full z-50 bg-[#ffffffaa] backdrop-blur-lg"
      >
        <div className="">
          <div className="tablet:hidden px-2">
            <Navbar.Toggle />
          </div>
          <Link to="/">
            <LogoComponent />
          </Link>
        </div>
        <span className="uppercase font-black">Super Admin Dashboard</span>
        <div className="p-2 md:pr-4">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                rounded
                bordered
                // placeholderInitials={user.email.slice(0, 2).toUpperCase()}
                status="online"
              />
            }
          >
            <Link to="my-profile">
              <Dropdown.Item icon={FaUser}>
                <div className="px-4">Profile</div>
              </Dropdown.Item>
            </Link>
            <Dropdown.Item href="/login" icon={FaSignOutAlt}>
              <div className="px-4">Logout</div>
            </Dropdown.Item>
          </Dropdown>
        </div>
      </Navbar>
      <Sidebar
        id="logo-sidebar"
        aria-label="Sidebar" /* className="h-screen fixed shadow-lg" */
        className="float-left fixed -mt-1 left-0 z-40 mobile:w-3/5 sm:w-64  transition-transform h-screen border-r border-gray-100 dark:border-gray-800"
        style={{
          transform:
            toggle || width > 639 ? "translateX(0%)" : "translateX(-100%)",
        }}
      >
        <Sidebar.ItemGroup>
          {AdminSideLinks.map(({ name, icon, link }) => (
            <div className="p-4 mt-10" key={name}>
              <NavLink
                to={link}
                className={({ isActive }) =>
                  `${isActive ? "text-primary" : "text-gray-500"}`
                }
                onClick={() => setToggle(false)}
              >
                <div className="text-xs sm:text-sm flex items-center gap-6 ">
                  <span>{icon}</span>
                  <span>{name}</span>
                </div>
              </NavLink>
            </div>
          ))}
        </Sidebar.ItemGroup>
      </Sidebar>
      <main className="min-h-screen tablet:ml-64 p-4 relative mt-16 dark:bg-gray-900">
        <BreadcrumbComponents />
        <Outlet />
      </main>
    </>
  );
};
