import { Card, ListGroup, Progress } from "flowbite-react";

import AssignmentsList from "../../components/AssignmentsList";
import { AxiosResponse } from "axios";
import { Helmet } from "react-helmet";
import { IStudent } from "../../api/@types";
import Section from "../../components/Section";
import { getCourse } from "../../api/resource/course";
import useAxiosPrivate from "../../api/hooks/useAxiosPrivate";
import { useMemo } from "react";
import { useQuery } from "react-query";

// const defaultStyle: { [key: string]: string | number } = {
//   maxWidth: "960px",
// };

function StudentDashboard() {
  const http = useAxiosPrivate();
  const { data } = useQuery("course", getCourse, {
    cacheTime: 3600000,
    refetchInterval: 3600000,
  });

  const { data: assignment } = useQuery(
    "assignments",
    async () => await http.get("/assignments"),
    {
      cacheTime: 3600000,
      refetchInterval: 3600000,
    }
  );
  const { data: userInfo } = useQuery<AxiosResponse<IStudent>>(
    "student",
    async () => await http.get("/students/my-profile")
  );

  const cards = useMemo(
    () => [
      {
        id: "1",
        title: "Expert System",
        course: "com 423",
        progress: Math.floor(Math.random() * 80 + 20),
        className: "bg-gradient-to-r from-cyan-800 to-indigo-600",
      },
      {
        id: "2",
        title: "I.T Professtioal practice",
        course: "com 424",
        progress: Math.floor(Math.random() * 80 + 20),
        className: "bg-gradient-to-tr from-cyan-700 to-green-600",
      },
      {
        id: "3",
        title: "Computer graphics",
        course: "com 422",
        progress: Math.floor(Math.random() * 80 + 20),
        className: "bg-gradient-to-br from-indigo-900 to-blue-600",
      },
      {
        id: "4",
        title: "Computer security",
        course: "com 426",
        progress: Math.floor(Math.random() * 100 + 20),
        className: "bg-gradient-to-r from-red-300 to-pink-800",
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Dashboard | {userInfo?.data.firstName || "Student"}</title>
      </Helmet>

      <hr />
      <div className="h1 my-4">
        <h1 className="tablet:text-xl text-lg font-semibold leading-normal cursor-pointer border-l-2 border-red-700 pl-4">
          Welcome to your Portal Dashboard
        </h1>
        <h1 className="font-robo text-4xl border-l-2 font-thin logo-clipped border-indigo-300 pl-4">
          {userInfo?.data.firstName || "Enoch"}
        </h1>
      </div>
      <hr />
      <ListGroup>
        <ListGroup.Item>
          <Section title="My course progress">
            <div className="grid grid-cols-1 md:grid-cols-2 laptop:grid-cols-3 monitor:grid-cols-4 gap-4 w-full align-item-center text-white">
              {cards.map(({ className, title, course, id, progress }, i) => (
                <div
                  className={`block ${
                    i == 3 ? "laptop:hidden monitor:block" : ""
                  }`}
                  key={id}
                >
                  <Card className={className}>
                    <div className="flex justify-between">
                      <span className="my-1 space-y-2">
                        <h4>{title}</h4>
                        <p className="text-sm">{course}</p>
                      </span>
                    </div>
                    <Progress
                      progress={progress}
                      color={
                        progress < 40
                          ? "red"
                          : progress < 60
                          ? "yellow"
                          : "green"
                      }
                    />
                    <div className="flex justify-between">
                      <p>Progress</p>
                      <p>{progress}%</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </Section>
        </ListGroup.Item>
        <Section title="Assignments">
          <div className="overflow-auto w-full">
            <AssignmentsList
              assignments={assignment?.data.assignments.slice(0, 3)}
            />
          </div>
        </Section>
        <Section title="Notification">
          <center>No notification</center>
        </Section>
      </ListGroup>
    </div>
  );
}

export default StudentDashboard;
