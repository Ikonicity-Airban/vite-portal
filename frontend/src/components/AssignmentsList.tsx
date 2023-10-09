import { Button, Card } from "flowbite-react";

import { FaDownload } from "react-icons/fa";
import { IAssignment } from "../api/@types";
import Section from "./Section";
import { truncateString } from "../api/utils/truncateString";

type Props = {
  assignments?: IAssignment[];
};

const handleClick = (assId: string) => {
  console.log(assId);
};

const AssignmentsList = ({ assignments }: Props) => {
  return (
    <Section title="Assignments" subtitle="Recent Assignments">
      <div className="grid md:grid-cols-2 desktop:grid-cols-3 gap-4">
        {assignments?.map((assignment) => (
          <Card
            className="flex relative items-center justify-center text-center mx-2"
            key={assignment.title}
          >
            {new Date(Date.now()).getTime() >
              new Date(assignment.endDate || 0).getTime() && (
              <div className="inset-0 backdrop-blur-sm text-xl text-black font-light from-green-200 to-transparent bg-gradient-to-t absolute grid place-items-center">
                No more submissions for this Assignment
              </div>
            )}
            <h3 className="font-bold">{assignment.title}</h3>
            <h4>{assignment.course.code}</h4>
            <p className="text-sm text-left">
              {truncateString(assignment.description, 100)}
            </p>
            <p className="text-sm text-red-600 text-left">
              Deadline: Before{" "}
              {new Date(assignment.endDate || "").toUTCString()}
            </p>
            <Button
              onClick={() => handleClick(assignment._id)}
              className="cursor-pointer mx-auto space-x-4"
              fullSized
              size="sm"
              gradientDuoTone="greenToBlue"
            >
              <a
                href={assignment.file}
                download={`${assignment.course.code} ${assignment.title}`}
              >
                <FaDownload color="white" />
              </a>
              <span className="text-sm ml-4">Click here to down the file</span>
            </Button>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default AssignmentsList;
