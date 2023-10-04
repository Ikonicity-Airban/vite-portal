import { Card } from "flowbite-react";
import React from "react";
import Section from "../../components/Section";

const ProgramsSection: React.FC = () => {
  const programs = [
    {
      title: "Bachelor of Science in Computer Science",
      description:
        "Our undergraduate program provides a comprehensive education in computer science, covering topics such as algorithms, data structures, software engineering, artificial intelligence, and more.",
    },
    {
      title: "Master of Science in Computer Science",
      description:
        "Our master's program offers advanced coursework and research opportunities for students interested in deepening their knowledge and expertise in computer science.",
    },
    {
      title: "Ph.D. in Computer Science",
      description:
        "Our Ph.D. program focuses on cutting-edge research in various areas of computer science. Students work closely with faculty mentors to pursue their research interests.",
    },
  ];

  return (
    <Section subtitle="Our Programs">
      <div className="container mx-auto px-4">
        <div className="my-6">
          <p>
            We offer a range of programs and courses that are designed to meet
            the needs of students at all levels, from undergraduate to graduate
            and beyond. On our website, you'll find information about our
            faculty members, their research interests, and their contact
            information. You can also browse our course offerings, view our
            academic calendar, and stay up-to-date with the latest news and
            events happening in our department. Whether you're a current
            student, a prospective student, or just interested in learning more
            about our department, we invite you to explore our website and
            discover all that we have to offer. Thank you for visiting and we
            look forward to hearing from you soon!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <Card key={index} className="animate-fade-in">
              <div className="flex flex-col h-full">
                <h4 className="text-center font-bold mb-4 logo-clipped">
                  {program.title}
                </h4>
                <p className="text-base leading-loose">{program.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default ProgramsSection;
