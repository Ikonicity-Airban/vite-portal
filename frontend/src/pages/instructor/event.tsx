import {
  Button,
  Label,
  ListGroup,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { Types, defaultInstructor } from "../../api/reducer";
import { useContext, useEffect } from "react";
import { useMutation, useQuery } from "react-query";

import { AppContext } from "../../api/context";
import EventList from "../home/EventList";
import { IEvent } from "../../api/@types";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import Section from "../../components/Section";
import { TypeColumns } from "@inovua/reactdatagrid-community/types/TypeColumn";
import { toast } from "react-hot-toast";
import useAxiosPrivate from "../../api/hooks/useAxiosPrivate";
import { useForm } from "react-hook-form";
import useLocalStorage from "../../api/hooks/useLocalStorage";

function EventPage() {
  const http = useAxiosPrivate();
  const { handleSubmit, register, reset } = useForm<IEvent>();
  const [instructor] = useLocalStorage("instructor", defaultInstructor);
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    reset();
  }, [dispatch, reset]);

  const fetchEvent = async (): Promise<{
    count: number;
    events: IEvent[];
  }> => {
    const response = await http.get(`/events`);
    return response.data;
  };

  const createEvent = async (data: IEvent): Promise<IEvent> => {
    const response = await http.post<IEvent>(`/events`, data);
    return response.data;
  };

  const updateEvent = async (data: IEvent): Promise<IEvent> => {
    const response = await http.patch<IEvent>(`/events/${data._id}`, data);
    return response.data;
  };

  const deleteEvent = async (id: string): Promise<void> => {
    await http.delete(`/events/${id}`);
  };

  const { data, isLoading, refetch } = useQuery<{
    count: number;
    events: IEvent[];
  }>("events", fetchEvent);

  const createMutation = useMutation("events", createEvent, {
    onSuccess: () => {
      dispatch({
        type: Types.close,
        payload: null,
      });
      reset();
      toast.success("Created successfully");
      refetch();
    },
  });

  const updateMutation = useMutation("events", updateEvent, {
    onSuccess: () => {
      dispatch({
        type: Types.close,
        payload: null,
      });
      reset();
      toast.success("Updated successfully");
      refetch();
    },
  });

  const deleteMutation = useMutation(deleteEvent, {
    onSuccess: () => {
      toast.success("Deleted successfully");
      refetch();
    },
  });

  const onSubmit = (data) => {
    if (data._id) {
      updateMutation.mutate({
        ...data,
        instructor: `${instructor.lastName} ${instructor.firstName}`,
      });
    } else {
      delete data?._id;
      createMutation.mutate(data);
    }
  };

  const handleEdit = (course: IEvent) => {
    reset(course);
    dispatch({
      type: Types.open,
      payload: {
        header: "Update an event",
        buttonOK: "Submit",
        content: <RegisterForm />,
      },
    });
  };

  const handleCreate = () => {
    reset();
    dispatch({
      type: Types.open,
      payload: {
        header: "Create an event",
        buttonOK: "Submit",
        content: <RegisterForm />,
      },
    });
  };

  const handleDelete = (id: string) => {
    dispatch({
      type: Types.open,
      payload: {
        type: "Error",
        header: "Delete event",
        buttonOK: "OK",
        content: <p>Do you want to delete this event</p>,
        onOk: () => deleteMutation.mutate(id),
      },
    });
  };

  const columns: TypeColumns = [
    // { name: "_id", header: "ID", defaultWidth: 80, defaultFlex: 1 },
    { name: "title", header: "Title", defaultFlex: 1 },
    { name: "content", header: "Content", defaultFlex: 1 },
    { name: "type", header: "Type", defaultFlex: 1, editable: false },
    {
      name: "date",
      header: "Date Published",
      editable: false,
      defaultFlex: 1,
      render: ({ value }) => <>{new Date(value).toUTCString()}</>,
    },
    {
      name: "instructor",
      header: "By",
      editable: false,
      defaultFlex: 1,
      render: ({ value }) => <>{value}</>,
    },

    {
      name: "actions",
      header: "Actions",
      editable: false,
      defaultWidth: 100,
      render: ({ data }) => (
        <div className="flex items-center gap-4 justify-around p-2 cursor-pointer">
          <FaPen onClick={() => handleEdit(data)} />
          <FaTrash onClick={() => handleDelete(data._id)} />
        </div>
      ),
    },
  ];

  function handleTableEdit(editInfo) {
    updateMutation.mutate({
      ...editInfo?.data,
      [editInfo.columnId]: editInfo.value,
    });
  }

  const RegisterForm = () => (
    <form action="" className="w-full " onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap gap-4 mx-auto w-full items-center">
        <TextInput type="hidden" {...register("_id")} />
        <div className="relative w-full ">
          <div className="mb-2 block ">
            <Label htmlFor="">Event Title</Label>
          </div>
          <TextInput
            required
            className="placeholder:capitalize placeholder:mx-10"
            id="ass_title"
            // placeholder={label}
            {...register("title")}
          />
        </div>
        <div className="relative w-full ">
          <div className="mb-2 block ">
            <Label htmlFor="">Event content</Label>
          </div>
          <Textarea
            required
            className="placeholder:capitalize placeholder:mx-10 h-28"
            id="ass_title"
            // placeholder={label}
            {...register("content")}
          />
        </div>
        <div className="relative w-full ">
          <div className="mb-2 block ">
            <Label htmlFor="type">Notification Type</Label>
          </div>
          <Select
            required
            className="placeholder:capitalize placeholder:mx-10 h-28"
            id="type"
            // placeholder={label}
            {...register("type")}
          >
            <option value="news">News</option>
            <option value="event">Event</option>
          </Select>
        </div>
      </div>
      <div className="relative w-full my-6">
        <Button
          type="submit"
          className="w-full"
          isProcessing={createMutation.isLoading || updateMutation.isLoading}
          gradientDuoTone="greenToBlue"
        >
          Upload Event
        </Button>
      </div>
    </form>
  );

  return (
    <main className="my-10">
      <EventList events={data?.events} />
      <ListGroup>
        <Section subtitle="Events" title="Create, Edit, Delete Events">
          <Button onClick={handleCreate} gradientDuoTone="greenToBlue">
            <FaPlus className="mr-4" /> Add a new event
          </Button>
          <ReactDataGrid
            idProperty="id"
            dataSource={data?.events || []}
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
export default EventPage;
