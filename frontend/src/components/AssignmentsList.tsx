import { Card } from "flowbite-react";
import { FaDownload } from "react-icons/fa";
import { IAssignment } from "../api/@types";
import Section from "./Section";

type Props = {
  assignments: IAssignment[];
};

const handleClick = (assId: string) => {
  console.log(assId);
};

const AssignmentsList = ({ assignments }: Props) => {
  return (
    <Section title="Assignments" subtitle="Recent Assignments">
      <div className="grid mobile:grid-cols-2 md:grid-cols-3 gap-4">
        {assignments.map((assignment) => (
          <Card
            className="flex items-center justify-center text-center mx-2"
            key={assignment.title}
          >
            <h3 className="font-bold">{assignment.title}</h3>
            <p className="text-sm">{assignment.description.slice(0, 120)}</p>
            <h4>{assignment.course.code}</h4>
            <span
              onClick={() => handleClick(assignment._id)}
              className="cursor-pointer mx-auto"
            >
              <a
                href={assignment.file}
                download={`${assignment.course.code} ${assignment.title}`}
              >
                <FaDownload size={30} color="gray" />
              </a>
            </span>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default AssignmentsList;
