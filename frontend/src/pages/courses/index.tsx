import { Button, Sidebar } from "flowbite-react";

import { BreadcrumbComponents } from "../../components";
import CoursesList from "./CoursesList";

export default function CoursePage() {
  return (
    <section className="">
      <div
        className="h-[50vh] min-w-full grid place-items-center relative"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/1452604857/photo/businessman-touching-the-brain-working-of-artificial-intelligence-automation-predictive.webp?b=1&s=170667a&w=0&k=20&c=iJp6e2C-l2lRmyG3ColHMpXe0QYrPnrfQQc2O6PsYC4=')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#013d]"></div>
        <h3 className="text-white font-bold z-[1]">Our Courses</h3>
      </div>
      <main>
        <div className="p-4 shadow-md">
          <BreadcrumbComponents />
        </div>
        <div className="flex p-4 flex-col mobile:flex-row">
          <Sidebar
            aria-label="Sidebar with content separator example"
            className="w-full mobile:w-60"
          >
            <Sidebar.Items>
              <h4 className="logo-clipped text-center p-2">All Courses</h4>
              <Sidebar.ItemGroup>
                <Sidebar.Item>Science</Sidebar.Item>
                <Sidebar.Item>Expert System</Sidebar.Item>
                <Sidebar.Item>Robotics</Sidebar.Item>
              </Sidebar.ItemGroup>
              <Sidebar.ItemGroup>
                <Button className="w-full" gradientDuoTone="greenToBlue">
                  Sign Up
                </Button>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
          <div className="p-6 w-full">
            <CoursesList />
          </div>
        </div>
      </main>
    </section>
  );
}
