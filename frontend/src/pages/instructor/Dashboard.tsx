import { IAssignment, IInstructor } from "../../api/@types";

import AssignmentsList from "../../components/AssignmentsList";
import { AxiosResponse } from "axios";
import { Helmet } from "react-helmet";
import { ListGroup } from "flowbite-react";
import Section from "../../components/Section";
import useAxiosPrivate from "../../api/hooks/useAxiosPrivate";
import { useQuery } from "react-query";

// const defaultStyle: { [key: string]: string | number } = {
//   maxWidth: "960px",
// };

function InstructorDashboard() {
  const http = useAxiosPrivate();

  const { data: assignment } = useQuery(
    "assignments",
    async (): Promise<{
      count: number;
      assignments: IAssignment[];
    }> => {
      const response = await http.get(`/assignments`);
      return response.data;
    },
    {
      cacheTime: 3600000,
      refetchInterval: 3600000,
    }
  );
  const { data: userInfo } = useQuery<AxiosResponse<IInstructor>>(
    "instructor",
    async () => await http.get("/instructors/my-profile")
  );

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Dashboard | {userInfo?.data.lastName || "instructor"}</title>
      </Helmet>

      <hr />
      <div className="h1 my-4">
        <h1 className="tablet:text-xl text-lg font-semibold leading-normal cursor-pointer border-l-2 border-red-700 pl-4">
          Welcome to your Portal Dashboard
        </h1>
        <h1 className="font-robo text-4xl border-l-2 font-thin logo-clipped border-indigo-300 pl-4">
          {userInfo?.data.lastName || "Enoch"}
        </h1>
      </div>
      <hr />
      <ListGroup>
        <AssignmentsList assignments={assignment?.assignments || []} />
      </ListGroup>
    </div>
  );
}

export default InstructorDashboard;
