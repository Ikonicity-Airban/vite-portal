import { Button, Label, ListGroup, Select, TextInput } from "flowbite-react";
import { FaPen, FaTrash } from "react-icons/fa";
import { useContext, useEffect } from "react";
import { useMutation, useQuery } from "react-query";

import { AppContext } from "../../api/context";
import { IStudent } from "../../api/@types";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import Section from "../../components/Section";
import { TypeColumns } from "@inovua/reactdatagrid-community/types/TypeColumn";
import { Types } from "../../api/reducer";
import { toast } from "react-hot-toast";
import useAxiosPrivate from "../../api/hooks/useAxiosPrivate";
import { useForm } from "react-hook-form";

export function StudentsPage() {
  const http = useAxiosPrivate();
  const { handleSubmit, register, reset } = useForm<IStudent>();
  const { dispatch } = useContext(AppContext);
  // const [instructor] = useLocalStorage("student", defaultInstructor);
  useEffect(() => {
    reset();
  }, [dispatch, reset]);

  const fetchStudent = async (): Promise<{
    count: number;
    students: IStudent[];
  }> => {
    const response = await http.get(`/students`);
    return response.data;
  };

  const createStudent = async (data: IStudent): Promise<IStudent> => {
    const response = await http.post<IStudent>(`/students`, data);
    return response.data;
  };

  const updateStudent = async (data: IStudent): Promise<IStudent> => {
    const response = await http.patch<IStudent>(`/students/${data._id}`, data);
    return response.data;
  };

  const deleteStudent = async (id: string): Promise<void> => {
    await http.delete(`/students/${id}`);
  };

  const { data, isLoading, refetch } = useQuery<{
    count: number;
    students: IStudent[];
  }>("students", fetchStudent);
  const createMutation = useMutation("students", createStudent, {
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

  const updateMutation = useMutation("students", updateStudent, {
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

  const deleteMutation = useMutation(deleteStudent, {
    onSuccess: () => {
      toast.success("Deleted successfully");
      refetch();
    },
  });

  const onSubmit = (data) => {
    console.log(data);

    const student = {
      ...data,
    };
    if (student._id) {
      updateMutation.mutate(student);
    } else {
      delete student?._id;
      createMutation.mutate(student);
    }
  };

  const handleEdit = (course: IStudent) => {
    reset(course);
    dispatch({
      type: Types.open,
      payload: {
        header: "Update an student",
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
        header: "Delete student",
        buttonOK: "OK",
        content: <p>Do you want to delete this student</p>,
        onOk: () => deleteMutation.mutate(id),
      },
    });
  };

  const columns: TypeColumns = [
    // { name: "_id", header: "ID" },
    /* 
  coursesOffered?: ICourse[];
  level: number | 100 | 200 | 300 | 400;
  mat_no?: string;
  photoURL?: string;
  sex?: "male" | "female";
  mobile_phone?: string;
  contact_address?: string;
  year_of_graduation?: string; */
    {
      header: "FirstName",
      name: "firstName",
      defaultFlex: 1,
    },
    {
      header: "LastName",
      name: "lastName",
      defaultFlex: 1,
    },
    {
      header: "Course",
      name: "coursesOffered",
      defaultFlex: 1,
    },
    {
      header: "Level",
      name: "level",
      defaultFlex: 1,
    },
    {
      header: "Mat No",
      name: "mat_no",
      defaultFlex: 1,
    },
    {
      name: "actions",
      header: "actions",
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
    delete editInfo.data.file;
    updateMutation.mutate({
      ...editInfo?.data,
      [editInfo.columnId]: editInfo.value,
    });
  }

  const RegisterForm = () => (
    <form
      action=""
      className="space-y-6 md:space-y-0 grid grid-cols-1 md:grid-cols-2 gap-4 items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="space-y-3">
        <Label value="First Name" htmlFor="firstName" />
        <TextInput required {...register("firstName")} id="firstName" />
      </div>
      <div className="space-y-3">
        <Label value="Last Name" htmlFor="lastName" />
        <TextInput required id="lastName" {...register("lastName")} />
      </div>
      <div className="space-y-3">
        <Label value="Email" htmlFor="email" />
        <TextInput required disabled id="email" />
      </div>
      <div className="space-y-3">
        <Label value="Registration Number" htmlFor="mat_no" />
        <TextInput required disabled id="mat_no" />
      </div>

      <div className="space-y-3">
        <Label value="Sex" htmlFor="sex" />
        <Select id="sex" {...register("sex")}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Select>
      </div>

      <div className="space-y-3">
        <Label value="Year of Graduation" htmlFor="graduation" />
        <TextInput required disabled id="graduation" />
      </div>
      <div className="space-y-3">
        <Label value="Contact Address" htmlFor="contact_address" />
        <TextInput
          required
          id="contact_address"
          {...register("contact_address")}
        />
      </div>
      <div className="space-y-3">
        <Label value="Phone Number" htmlFor="mobile_phone" />
        <TextInput required id="mobile_phone" {...register("mobile_phone")} />
      </div>
      <div className="space-y-3">
        <Label value="Level" htmlFor="level" />
        <Select required id="level" {...register("level")}>
          {[100, 200, 300, 400].map((level) => (
            <option value={level} key={level}>
              {level} Level
            </option>
          ))}
        </Select>
      </div>
      <div className="md:col-span-2 py-6 w-full">
        <Button
          isProcessing={isLoading}
          className="w-full"
          type="submit"
          gradientDuoTone="greenToBlue"
        >
          Update
        </Button>
      </div>
    </form>
  );
  return (
    <main className="my-10">
      <ListGroup>
        <Section subtitle="All students">
          <ReactDataGrid
            idProperty="id"
            dataSource={data?.students || []}
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

export function InstructorsPage() {
  return <div>InstructorsPage</div>;
}
