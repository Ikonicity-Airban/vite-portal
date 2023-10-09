import {
  Button,
  Label,
  ListGroup,
  Modal,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import {
  FaBook,
  FaDownload,
  FaGraduationCap,
  FaPen,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import { IAssignment, ICourse, IInstructor } from "../../api/@types";
import { Types, defaultInstructor } from "../../api/reducer";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

import { AppContext } from "../../api/context";
import FileUpload from "../../components/UploadFile";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import Section from "../../components/Section";
import { TypeColumns } from "@inovua/reactdatagrid-community/types/TypeColumn";
import { toast } from "react-hot-toast";
import useAxiosPrivate from "../../api/hooks/useAxiosPrivate";
import { useForm } from "react-hook-form";
import useLocalStorage from "../../api/hooks/useLocalStorage";

function InstructorAssignmentPage() {
  const http = useAxiosPrivate();
  const { handleSubmit, register, reset } = useForm<IAssignment>();
  const { dispatch } = useContext(AppContext);
  const [instructor] = useLocalStorage("instructor", defaultInstructor);
  const [file, setFile] = useState<string>("");
  const [isModalOpen, setModal] = useState(false);
  const [mode, setMode] = useState<"Edit" | "Create">("Create");

  const closeModal = () => setModal(false);
  const showModal = () => setModal(true);

  useEffect(() => {
    reset();
  }, [dispatch, reset]);

  const fetchAssignment = async (): Promise<{
    count: number;
    assignments: IAssignment[];
  }> => {
    const response = await http.get(`/assignments`);
    return response.data;
  };

  const createAssignment = async (data: IAssignment): Promise<IAssignment> => {
    const response = await http.post<IAssignment>(`/assignments`, data);
    return response.data;
  };

  const updateAssignment = async (data: IAssignment): Promise<IAssignment> => {
    const response = await http.patch<IAssignment>(
      `/assignments/${data._id}`,
      data
    );
    return response.data;
  };

  const deleteAssignment = async (id: string): Promise<void> => {
    await http.delete(`/assignments/${id}`);
  };

  const { data, isLoading, refetch } = useQuery<{
    count: number;
    assignments: IAssignment[];
  }>("assignments", fetchAssignment);

  const createMutation = useMutation("assignments", createAssignment, {
    onSuccess: () => {
      closeModal();
      reset();
      toast.success("Created successfully");
      refetch();
    },
  });

  const updateMutation = useMutation("assignments", updateAssignment, {
    onSuccess: () => {
      closeModal();
      reset();
      toast.success("Updated successfully");
      refetch();
    },
  });

  const deleteMutation = useMutation(deleteAssignment, {
    onSuccess: () => {
      toast.success("Deleted successfully");
      refetch();
    },
  });

  const onSubmit = (data) => {
    const assignment = {
      ...data,
      file,
      course: instructor.courseTeaching?._id,
      instructor: instructor._id || "",
    };
    if (assignment._id) {
      updateMutation.mutate(assignment);
    } else {
      delete assignment?._id;
      createMutation.mutate(assignment);
      setFile("");
    }
  };

  const handleEdit = (course: IAssignment) => {
    setMode("Edit");
    reset(course);
    setFile(course.file);
    showModal();
  };

  const handleCreate = () => {
    setMode("Create");
    reset();
    showModal();
  };

  const handleDelete = (id: string) => {
    dispatch({
      type: Types.open,
      payload: {
        type: "Error",
        header: "Delete assignment",
        buttonOK: "OK",
        content: <p>Do you want to delete this assignment</p>,
        onOk: () => deleteMutation.mutate(id),
      },
    });
  };

  const columns: TypeColumns = [
    // { name: "_id", header: "ID", defaultWidth: 80, defaultFlex: 1 },
    { name: "title", header: "Title", defaultFlex: 1 },
    { name: "description", header: "Description", defaultFlex: 1 },
    {
      name: "course",
      editable: false,
      header: "Course",
      defaultFlex: 1,
      render: ({ value }: { value: ICourse }) => (
        <span>
          {value.title} - {value.code}
        </span>
      ),
    },
    {
      name: "instructor",
      editable: false,
      header: "Course Instructor",

      defaultFlex: 1,
      render: ({ value }: { value: IInstructor }) => (
        <span>
          {value.lastName} - {value.firstName}
        </span>
      ),
    },
    {
      name: "file",
      header: "File",
      editable: false,

      render: (value) => {
        const fileName = `${value.data.course.code} ${value.data.title}`;

        return (
          <center>
            <a
              href={value.data.file}
              download={fileName}
              className="cursor-pointer"
            >
              <FaDownload />
            </a>
          </center>
        );
      },
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

  //click and edit functionality
  function handleTableEdit(editInfo) {
    delete editInfo.data.file;
    updateMutation.mutate({
      ...editInfo?.data,
      [editInfo.columnId]: editInfo.value,
    });
  }

  // the registration form
  const RegisterForm = () => (
    <form action="" className="w-full " onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap gap-4 mx-auto w-full items-center">
        <TextInput type="hidden" {...register("_id")} />
        <div className="relative w-full ">
          <div className="mb-2 block ">
            <Label htmlFor="">Assignment Title</Label>
          </div>
          <span className="absolute z-10 right-4 bottom-[20%] text-gray-500">
            <FaBook></FaBook>
          </span>
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
            <Label htmlFor="">Assignment Description</Label>
          </div>
          <Textarea
            required
            className="placeholder:capitalize placeholder:mx-10 h-28 px-4"
            id="ass_title"
            // placeholder={label}
            {...register("description")}
          />
        </div>
        <div className="relative w-full ">
          <Select
            defaultValue={100}
            required
            placeholder="select a level"
            {...register("level")}
          >
            <option disabled>Select a level</option>
            {[100, 200, 300, 400].map((level) => (
              <option value={level} key={level}>
                {level}
              </option>
            ))}
          </Select>
        </div>
        <div className="w-full ">
          <div className="mb-2 block ">
            <Label htmlFor="course">Course</Label>
          </div>
          <TextInput
            icon={FaGraduationCap}
            required
            disabled
            placeholder={
              instructor.courseTeaching?.title +
                " - " +
                instructor.courseTeaching?.code || "No course"
            }
            className="placeholder:capitalize placeholder:mx-10"
            id="course"
            // placeholder={label}
          />
        </div>
        <div className="relative w-full ">
          <FileUpload setFile={setFile} />
        </div>
      </div>
      <div className="relative w-full my-6">
        <Button
          type="submit"
          className="w-full"
          isProcessing={createMutation.isLoading || updateMutation.isLoading}
          gradientDuoTone="greenToBlue"
        >
          {mode} Assignment
        </Button>
      </div>
    </form>
  );

  return (
    <main className="my-10">
      <Modal size="xl" show={isModalOpen} dismissible onClose={closeModal}>
        <Modal.Header className="text-sm">{mode} Assignment</Modal.Header>
        <Modal.Body>
          <div className="flex p-4 items-center gap-6">
            <span className="text-sm flex-1">
              <RegisterForm />
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button size="sm" color="gray" onClick={closeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <ListGroup>
        <Section subtitle="All assignments">
          <Button onClick={handleCreate} gradientDuoTone="greenToBlue">
            <FaPlus className="mr-4" /> Add a new assignment
          </Button>
          <ReactDataGrid
            idProperty="id"
            dataSource={data?.assignments || []}
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
export default InstructorAssignmentPage;
