import { useMutation, useQuery } from "react-query";

import { AppContext } from "../../api/context";
import { FaTrash } from "react-icons/fa";
import { IInstructor } from "../../api/@types";
import { ListGroup } from "flowbite-react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import Section from "../../components/Section";
import { TypeColumns } from "@inovua/reactdatagrid-community/types/TypeColumn";
import { Types } from "../../api/reducer";
import { toast } from "react-hot-toast";
import useAxiosPrivate from "../../api/hooks/useAxiosPrivate";
import { useContext } from "react";

export default function InstructorsPage() {
  const http = useAxiosPrivate();
  const { dispatch } = useContext(AppContext);
  // const [instructor] = useLocalStorage("instructor", defaultInstructor);

  const fetchInstructor = async (): Promise<{
    count: number;
    instructors: IInstructor[];
  }> => {
    const response = await http.get(`/instructors`);
    return response.data;
  };

  const updateInstructor = async (data: IInstructor): Promise<IInstructor> => {
    const response = await http.patch<IInstructor>(
      `/instructors/${data._id}`,
      data
    );
    return response.data;
  };

  const deleteInstructor = async (id: string): Promise<void> => {
    await http.delete(`/instructors/${id}`);
  };

  const { data, isLoading, refetch } = useQuery<{
    count: number;
    instructors: IInstructor[];
  }>("instructors", fetchInstructor);

  const updateMutation = useMutation("instructors", updateInstructor, {
    onSuccess: () => {
      dispatch({
        type: Types.close,
        payload: null,
      });
      toast.success("Updated successfully");
      refetch();
    },
  });

  const deleteMutation = useMutation(deleteInstructor, {
    onSuccess: () => {
      toast.success("Deleted successfully");
      refetch();
    },
  });

  const handleDelete = (id: string) => {
    dispatch({
      type: Types.open,
      payload: {
        type: "Error",
        header: "Delete Instructor",
        buttonOK: "OK",
        content: <p>Do you want to delete this instructor</p>,
        onOk: () => deleteMutation.mutate(id),
      },
    });
  };

  const columns: TypeColumns = [
    // { name: "_id", header: "ID" },
    {
      name: "actions",
      header: "actions",
      editable: false,
      defaultWidth: 100,
      render: ({ data }) => (
        <div className="flex items-center gap-4 justify-around p-2 cursor-pointer">
          <FaTrash onClick={() => handleDelete(data._id)} />
        </div>
      ),
    },
  ];

  function handleTableEdit(editInfo) {
    delete editInfo.data.file;
    updateMutation.mutate({
      ...editInfo?.data,
      [editInfo.columnId]: editInfo.value,
    });
  }

  return (
    <main className="my-10">
      <ListGroup>
        <Section subtitle="All instructors">
          <ReactDataGrid
            idProperty="id"
            dataSource={data?.instructors || []}
            columns={columns}
            loading={isLoading}
            onEditComplete={handleTableEdit}
            editable={true}
            style={{
              minHeight: 500,
            }}
            pagination
            defaultLimit={10}
          />
        </Section>
      </ListGroup>
    </main>
  );
}
