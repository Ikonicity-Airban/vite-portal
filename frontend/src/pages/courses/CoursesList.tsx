import CoursesComponent from "./CoursesComponent";
import { ICourse } from "../../api/@types";
import { Spinner } from "flowbite-react";
import { getCourse } from "../../api/resource/course";
import { useQuery } from "react-query";

export default function CoursesList() {
  const { data, isLoading } = useQuery<
    { courses: ICourse[]; count: number },
    Error
  >("courses", getCourse);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 desktop:grid-cols-3 gap-10 w-full align-item-center">
      {isLoading && <Spinner></Spinner>}
      {data?.count ? (
        data.courses?.map((course, idx) => (
          <CoursesComponent course={course} key={idx} />
        ))
      ) : (
        <p className="col-span-4 text-center">No Courses</p>
      )}
    </div>
  );
}
