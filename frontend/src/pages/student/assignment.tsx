import { Card, ListGroup } from "flowbite-react";

import { IAssignment } from "../../api/@types";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import Section from "../../components/Section";
import { assignmentColumns } from "../../api/resource/columns";
import { truncateString } from "../../api/utils/truncateString";
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
  return (
    <main className="my-10">
      <ListGroup>
        <ListGroup.Item>
          <Section subtitle="New Assignments">
            <div className="overflow-auto z-10">
              {/* add new course */}
              {assignment?.count ? (
                <div className="grid mobile:grid-cols-2 tablet:grid-cols-3 gap-6">
                  {assignment?.assignments
                    .slice(0, 3)
                    .map((ass: IAssignment) => (
                      <Card className="text-left">
                        <h3 className="font-semibold mb-4 logo-clipped">
                          {ass.title}
                        </h3>
                        <p>{truncateString(ass.description, 50)}</p>
                        <p className="text-xs text-right text-gray-400">
                          {new Date(ass.createdAt || "").toUTCString()}
                        </p>
                      </Card>
                    ))}
                </div>
              ) : (
                <Card className="mx-auto">No Assignment</Card>
              )}
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
