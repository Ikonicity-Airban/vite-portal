import { BreadcrumbComponents } from "../components";
import { Card } from "flowbite-react";
import { IInstructor } from "../api/@types";
import Section from "../components/Section";
import useAxiosPrivate from "../api/hooks/useAxiosPrivate";
import { useQuery } from "react-query";

function StaffPage() {
  const http = useAxiosPrivate();

  const fetchEvent = async (): Promise<{
    count: number;
    instructors: IInstructor[];
  }> => {
    const response = await http.get(`/instructors`);
    return response.data;
  };

  const { data } = useQuery<{
    count: number;
    instructors: IInstructor[];
  }>("events", fetchEvent);

  return (
    <div className="mx-auto max-w-screen-desktop w-full my-10">
      <BreadcrumbComponents />
      <Section title="Staff Collection" subtitle="Our Amazing Staff">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data?.count ? (
            data.instructors.map((ins, index) => (
              <Card
                key={index}
                imgSrc={ins.photoURL || ""}
                className="animate-fade-in"
              >
                <h3 className="font-bold logo-clipped">
                  {ins.firstName} {ins.lastName}
                </h3>
                <p className="text-gray-600 text-sm dark:text-gray-400">
                  {ins.title}
                </p>
                <p className="text-gray-600 text-sm dark:text-gray-400">
                  {ins.userId?.email}
                </p>
                <p className="text-gray-700 dark:text-gray-200">
                  {ins.courseTeaching?.code} {ins.courseTeaching?.title}
                </p>
              </Card>
            ))
          ) : (
            <Card>No Staff available</Card>
          )}
        </div>
      </Section>
    </div>
  );
}

export default StaffPage;
