import { Card, ListGroup } from "flowbite-react";
import { IResult, IStudent } from "../../api/@types";

import ReactDataGrid from "@inovua/reactdatagrid-community";
import Section from "../../components/Section";
import { defaultStudent } from "../../api/reducer";
import { resultColumns } from "../../api/resource/columns";
import useAxiosPrivate from "../../api/hooks/useAxiosPrivate";
import useLocalStorage from "../../api/hooks/useLocalStorage";
import { useQuery } from "react-query";

// const gridStyle = { minHeight: 550, minWidth: 860 };
function ResultPage() {
  const [student] = useLocalStorage<IStudent>("student", defaultStudent);
  const http = useAxiosPrivate();
  const { data: result } = useQuery(
    "result",
    async () => await http.get(`/results/${student._id}`)
  );
  return (
    <main className="my-10">
      <ListGroup>
        <ListGroup.Item>
          <Section subtitle="New results">
            <div className="overflow-auto z-10">
              {/* add new course */}
              <div className="grid mobile:grid-cols-2 tablet:grid-cols-3">
                {result?.data.map((ass: IResult) => (
                  <Card>{ass.level}</Card>
                ))}
              </div>
            </div>
            {/* all courses semester by semester list add and delete */}
          </Section>
        </ListGroup.Item>
        <ListGroup.Item>
          <Section subtitle="All results">
            <ReactDataGrid
              allowUnsort
              allowGroupSplitOnReorder
              checkboxColumn
              emptyText="No new result currently"
              columns={resultColumns}
              dataSource={result?.data || []}
            />
          </Section>
        </ListGroup.Item>
      </ListGroup>
    </main>
  );
}

export default ResultPage;
