import { BreadcrumbComponents } from "./components";
import FacultySection from "./pages/home/FacultySection";
import Heading from "./components/Heading";
import React from "react";
import Section from "./components/Section";

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-screen-laptop mx-auto">
      <BreadcrumbComponents />
      <Heading section_title="" />
      <Section subtitle="Mission and Vision">
        <p>
          Our mission is to provide a world-class education in computer science
          and foster cutting-edge research in collaboration with industry and
          academia. We aim to equip our students with the knowledge, skills, and
          mindset needed to thrive in a rapidly evolving technological
          landscape. Our vision is to be a leading hub of innovation, producing
          creative problem solvers and thought leaders in the field of computer
          science.
        </p>
      </Section>

      <Section subtitle="Departmental Overview">
        <p>
          Established in [year], the Computer Science Department at [NACEST] is
          renowned for its excellence in teaching and research. With a faculty
          team of [number] experienced educators and [number] dedicated staff
          members, we are committed to providing a stimulating and supportive
          learning environment for our students. Our department offers a wide
          range of academic programs, cutting-edge research opportunities, and
          state-of-the-art facilities.
        </p>
      </Section>

      <Section subtitle="Faculty and Staff">
        <p>
          Our department boasts a team of highly qualified and accomplished
          faculty members who are passionate about computer science education
          and research. With expertise in various subfields of computer science,
          our faculty members actively contribute to advancements in the
          discipline. They are dedicated mentors who guide and inspire our
          students to reach their full potential. Our committed staff members
          ensure the smooth functioning of the department and provide valuable
          support to students and faculty.
        </p>
        <div>
          Meet some of our esteemed faculty members:
          <ul>
            <li>
              Mr. Ike Innocent - Artificial Intelligence and Machine Learning
            </li>
            <li>Mr. Sath Gafa - Human-Computer Interaction</li>
            <li>Mis. Chidinma Nwafor - Data Science and Analytics</li>
          </ul>
        </div>
      </Section>
      <FacultySection></FacultySection>
    </div>
  );
};

export default AboutPage;
