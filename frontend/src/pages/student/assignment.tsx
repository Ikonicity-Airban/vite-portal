import { Card, ListGroup } from "flowbite-react";

import { IAssignment } from "../../api/@types";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import Section from "../../components/Section";
import { assignmentColumns } from "../../api/resource/columns";
import useAxiosPrivate from "../../api/hooks/useAxiosPrivate";
import { useQuery } from "react-query";

// const gridStyle = { minHeight: 550, minWidth: 860 };
function AssignmentPage() {
  const http = useAxiosPrivate();

  const { data: assignment } = useQuery(
    "assignments",
    async (): Promise<{
      count: number;
      assignments: IAssignment[];
    }> => {
      const response = await http.get<{
        count: number;
        assignments: IAssignment[];
      }>(`/assignments`);
      return response.data;
    }
  );
  console.log(
    "🚀 ~ file: assignment.tsx:14 ~ AssignmentPage ~ assignment:",
    assignment
  );

  return (
    <main className="my-10">
      <ListGroup>
        <ListGroup.Item>
          <Section subtitle="New Assignments">
            <div className="overflow-auto z-10">
              {/* add new course */}
              <div className="grid mobile:grid-cols-2 tablet:grid-cols-3">
                {assignment?.assignments.map((ass: IAssignment) => (
                  <Card>
                    <h3>{ass.title}</h3>
                    <h4>{ass.description}</h4>
                    <h4>{ass.description}</h4>
                  </Card>
                ))}
              </div>
            </div>
            {/* all courses semester by semester list add and delete */}
          </Section>
        </ListGroup.Item>
        <ListGroup.Item>
          <Section subtitle="All assignments">
            <ReactDataGrid
              allowUnsort
              allowGroupSplitOnReorder
              checkboxColumn
              emptyText="No new assignment currently"
              columns={assignmentColumns}
              dataSource={assignment?.assignments || []}
            />
          </Section>
        </ListGroup.Item>
      </ListGroup>
    </main>
  );
}

export default AssignmentPage;
