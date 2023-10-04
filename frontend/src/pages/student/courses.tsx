import { AxiosResponse } from "axios";
import CoursesList from "../courses/CoursesList";
import { IStudent } from "../../api/@types";
import { ListGroup } from "flowbite-react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import Section from "../../components/Section";
import { courseColumns } from "../../api/resource/columns";
import useAxiosPrivate from "../../api/hooks/useAxiosPrivate";
import { useQuery } from "react-query";
import { useState } from "react";

const gridStyle = { minHeight: 550, minWidth: 860 };

function StudentCoursesPage() {
  const [activateRowOnFocus] = useState(true);

  const http = useAxiosPrivate();

  const { data: userInfo } = useQuery<AxiosResponse<IStudent>>(
    "student",
    async () => await http.get("/students/my-profile"),
    {
      refetchOnWindowFocus: true,
    }
  );

  console.log(
    "🚀 ~ file: courses.tsx:20 ~ StudentCoursesPage ~ userInfo:",
    userInfo
  );

  return (
    <main className="my-10">
      <ListGroup>
        <ListGroup.Item>
          <Section title="Registered Courses">
            <div className="overflow-auto z-10">
              {/* add new course */}

              <ReactDataGrid
                idProperty="id"
                checkboxColumn
                style={gridStyle}
                activateRowOnFocus={activateRowOnFocus}
                columns={courseColumns}
                dataSource={userInfo?.data?.coursesOffered || []}
              />
            </div>
            {/* all courses semester by semester list add and delete */}
          </Section>
        </ListGroup.Item>
        <ListGroup.Item>
          <Section title="Available courses">
            <CoursesList />
          </Section>
        </ListGroup.Item>
      </ListGroup>
    </main>
  );
}

export default StudentCoursesPage;
