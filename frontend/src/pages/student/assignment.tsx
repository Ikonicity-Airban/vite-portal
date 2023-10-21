import AssignmentsList from "../../components/AssignmentsList";
import { IAssignment } from "../../api/@types";
import { ListGroup } from "flowbite-react";
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

  return (
    <main className="my-10">
      <ListGroup>
        <ListGroup.Item>
          <Section subtitle="New Assignments">
            <AssignmentsList
              assignments={assignment?.assignments.slice(0, 3)}
            />
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
