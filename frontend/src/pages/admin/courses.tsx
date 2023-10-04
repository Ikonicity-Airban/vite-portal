import {
  Button,
  Label,
  ListGroup,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { ICourse, IInstructor } from "../../api/@types";
import { useMutation, useQuery } from "react-query";

import { AppContext } from "../../api/context";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import Section from "../../components/Section";
import { TypeColumns } from "@inovua/reactdatagrid-community/types/TypeColumn";
import { Types } from "../../api/reducer";
import { toast } from "react-hot-toast";
import useAxiosPrivate from "../../api/hooks/useAxiosPrivate";
import { useContext } from "react";
import { useForm } from "react-hook-form";

const CoursePage = () => {
  const { register, handleSubmit, reset } = useForm<ICourse>();
  const { dispatch } = useContext(AppContext);
  const http = useAxiosPrivate();

  const fetchCourses = async (): Promise<{
    count: number;
    courses: ICourse[];
  }> => {
    const response = await http.get(`/courses`);
    return response.data;
  };
  const fetchInstructors = async (): Promise<{
    count: number;
    instructors: IInstructor[];
  }> => {
    const response = await http.get(`/instructors`);
    return response.data;
  };

  const createCourse = async (data: ICourse): Promise<ICourse> => {
    const response = await http.post<ICourse>(`/courses`, data);
    return response.data;
  };

  const updateCourse = async (data: ICourse): Promise<ICourse> => {
    const response = await http.patch<ICourse>(`/courses/${data._id}`, data);
    return response.data;
  };

  const deleteCourse = async (id: string): Promise<void> => {
    await http.delete(`/courses/${id}`);
  };
  const { data: instructor, isLoading } = useQuery<{
    count: number;
    instructors: IInstructor[];
  }>("instructor", fetchInstructors);

  const { data: courses, refetch } = useQuery<{
    count: number;
    courses: ICourse[];
  }>("courses", fetchCourses);

  const createMutation = useMutation("courses", createCourse, {
    onSuccess: () => {
      dispatch({
        type: Types.close,
        payload: null,
      });
      refetch();
      reset();
      toast.success("Updated successfully");
    },
  });

  const updateMutation = useMutation("courses", updateCourse, {
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

  const deleteMutation = useMutation(deleteCourse, {
    onSuccess: () => {
      toast.success("Deleted successfully");
    },
  });

  const onSubmit = (data: ICourse) => {
    if (data._id) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
    // reset();
    dispatch({
      type: Types.close,
      payload: null,
    });
  };

  const handleEdit = (course) => {
    dispatch({
      type: Types.open,
      payload: {
        header: "Course Registration",
        buttonOK: "Submit",
        content: <RegisterForm />,
      },
    });
    reset(course);
  };

  function handleTableEdit(editInfo) {
    updateMutation.mutate({
      ...editInfo?.data,
      [editInfo.columnId]: editInfo.value,
    });
  }

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const columns: TypeColumns = [
    { name: "_id", header: "ID", defaultWidth: 80, defaultFlex: 1 },
    { name: "title", header: "Course Name", defaultFlex: 1 },
    { name: "code", header: "Course Code", defaultFlex: 1 },
    {
      name: "actions",
      header: "Actions",
      defaultWidth: 100,
      render: ({ data }) => (
        <div className="flex items-center gap-4 justify-around p-2">
          <FaPen onClick={() => handleEdit(data)} className="cursor-pointer" />
          <FaTrash
            onClick={() => handleDelete(data._id)}
            className="cursor-pointer"
          />
        </div>
      ),
    },
  ];

  const RegisterForm = () => (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-screen-tablet w-full mx-auto text-left"
    >
      <div className="space-y-6">
        {/* <input type="hidden" {...register("_id")} /> */}

        <div>
          <Label>Course Title</Label>
          <TextInput type="text" {...register("title", { required: true })} />
        </div>

        <div>
          <Label>Course Code</Label>
          <TextInput
            type="text"
            maxLength={3}
            {...register("code", { required: true })}
          />
        </div>
        <div>
          <Label htmlFor="desc">Course Description</Label>
          <Textarea
            id="desc"
            className="h-32"
            {...register("description", { required: true })}
          />
        </div>
        <div>
          <Label htmlFor="desc">Course Lecturer</Label>
          <Select {...register("instructor")}>
            {instructor?.instructors.map(({ _id, lastName, firstName }) => (
              <option value={_id} key={_id}>
                {firstName} - {lastName}
              </option>
            ))}
          </Select>
        </div>
        <div className="w-full">
          <Button
            type="submit"
            className="w-full"
            gradientDuoTone="greenToBlue"
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );

  return (
    <Section title="Courses" subtitle="All Courses">
      <Button
        gradientDuoTone="greenToBlue"
        className="w-fit float-right"
        onClick={() => handleEdit({})}
      >
        <FaPlus className="mx-4" /> Add a new course
      </Button>
      <ListGroup>
        <ReactDataGrid
          idProperty="id"
          loading={isLoading}
          dataSource={courses?.courses || []}
          columns={columns}
          editable={true}
          style={{
            minHeight: 500,
          }}
          onEditComplete={handleTableEdit}
          pagination
          defaultLimit={10}
        />
      </ListGroup>
    </Section>
  );
};

export default CoursePage;
