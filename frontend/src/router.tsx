import {
  AdminLayout,
  InstructorLayout,
  StudentLayout,
} from "./layouts/DashboardLayout";
import { InstructorsPage, StudentsPage } from "./pages/admin/users";
import { LoginLayout, SignUpLayout } from "./layouts/AuthLayout";

import AboutPage from "./about";
import AdminAssignmentPage from "./pages/admin/assignment";
import AdminDashboard from "./pages/admin/dashboard";
import AdminEventPage from "./pages/admin/event";
import App from "./App";
import AssignmentPage from "./pages/student/assignment";
import ContactPage from "./contact";
import CoursePage from "./pages/admin/courses";
import ErrorPage from "./pages/error";
import EventPage from "./pages/instructor/event";
import { HomePage } from "./components";
import InstructorAssignmentPage from "./pages/instructor/assignment";
import InstructorDashboard from "./pages/instructor/Dashboard";
import InstructorProfilePage from "./pages/instructor/profile";
import MainLayout from "./layouts/MainLayout";
import NewsPage from "./pages/news";
import ResultPage from "./pages/student/result";
import SignUpPage from "./pages/signup";
import StaffPage from "./pages/staff";
import StudentCoursesPage from "./pages/student/courses";
import StudentDashboard from "./pages/student/Dashboard";
import StudentProfilePage from "./pages/student/profile";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
          {
            path: "latest-news",
            element: <NewsPage />,
          },
          {
            path: "contact-us",
            element: <ContactPage />,
          },
          {
            path: "about-us",
            element: <AboutPage />,
          },
          {
            path: "staff",
            element: <StaffPage />,
          },
        ],
      },
      {
        path: "",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "login",
            element: <LoginLayout />,
          },
          {
            path: "create-account",
            element: <SignUpLayout />,
            children: [
              {
                path: "student",
                element: <SignUpPage />,
              },
              {
                path: "instructor",
                element: <SignUpPage />,
              },
            ],
          },
        ],
      },
      {
        path: "/student",
        element: <StudentLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <StudentDashboard />,
          },
          {
            path: "my-courses",
            element: <StudentCoursesPage />,
          },
          {
            path: "assignment",
            element: <AssignmentPage />,
          },
          {
            path: "result",
            element: <ResultPage />,
          },
          {
            path: "my-profile",
            element: <StudentProfilePage />,
          },
        ],
      },
      {
        path: "/instructor",
        element: <InstructorLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <InstructorDashboard />,
          },
          {
            path: "assignment",
            element: <InstructorAssignmentPage />,
          },
          {
            path: "events",
            element: <EventPage />,
          },
          {
            path: "my-profile",
            element: <InstructorProfilePage />,
          },
        ],
      },
      {
        path: "/admin",
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        children: [
          { path: "", element: <AdminDashboard /> },
          { path: "assignment", element: <AdminAssignmentPage /> },
          { path: "events", element: <AdminEventPage /> },
          { path: "courses", element: <CoursePage /> },
          { path: "students", element: <StudentsPage /> },
          { path: "instructors", element: <InstructorsPage /> },
        ],
      },
    ],
  },
]);

export default router;
