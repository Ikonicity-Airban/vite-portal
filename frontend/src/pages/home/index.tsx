import { Button, Carousel } from "flowbite-react";

import { BreadcrumbComponents } from "../../components";
import { FaArrowRight } from "react-icons/fa";
import FacultySection from "./FacultySection";
import ProgramsSection from "./ProgramSection";
import Section from "../../components/Section";

export default function HomeComponent() {
  return (
    <main>
      <main className="min-h-[60vh] md:min-h-[80vh] relative rounded-2xl overflow-hidden">
        <div className="relative inset-0 -z-1">
          <Carousel
            className="h-[60vh] md:h-screen object-fill"
            indicators={false}
            slideInterval={7000}
          >
            {[1, 2, 3, 4].map((num, idx) => (
              <img
                src={`carousel/${num}.jpg`}
                className="h-auto"
                key={idx}
                alt={idx.toString()}
                style={{ objectFit: "cover", height: "100%" }}
                loading="lazy"
              />
            ))}
          </Carousel>
        </div>
        <div className="absolute p-2 min-h-[60vh] inset-0 bg-[#023c] grid place-items-center">
          <div
            id="title"
            className="flex flex-col space-y-20 max-w-6xl z-[10] p-3 font-bold select-none"
          >
            <h1 className="logo-clipped text-center title-design font-bold md:text-7xl text-white ">
              Computer Science Departmental Portal
            </h1>
            <a
              href="/login"
              className="mx-auto flex items-center justify-center text-white"
            >
              <Button
                gradientDuoTone={"greenToBlue"}
                size="sm"
                className="text-white"
              >
                Go to Login
                <FaArrowRight className="mx-3" />
              </Button>
            </a>
          </div>
        </div>
      </main>
      <div className="max-w-screen-laptop mx-auto p-4">
        <BreadcrumbComponents />
        <Section
          title=""
          subtitle="Welcome to the Academic Departmental Portal!"
        >
          <p className="text-base leading-loose">
            We're glad you're here and hope you find our website to be a
            valuable resource for all your academic needs. Our department is
            dedicated to providing students with a comprehensive and engaging
            education that prepares them for success in their chosen careers.
          </p>
        </Section>
        <Section subtitle="What We Offer?">
          <p className="text-base leading-loose">
            We offer a range of programs and courses that are designed to meet
            the needs of students at all levels, from ND1 to HND2 and beyond.
            You can browse our course offerings, view our academic calendar, and
            stay up-to-date with the latest news and events happening in our
            department. Whether you're a current student, a prospective student,
            or just interested in learning more about our department, we invite
            you to explore our website www.NACEST.org and discover all that we
            have to offer. Thank you for visiting computer science department
          </p>
          <ProgramsSection />
        </Section>
        <FacultySection />
      </div>
    </main>
  );
}
