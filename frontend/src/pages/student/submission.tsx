import { Button, ListGroup, Modal, Select } from "flowbite-react";
import { IAssignment, ISubmission } from "../../api/@types";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";

import { AppContext } from "../../api/context";
import AssignmentsList from "../../components/AssignmentsList";
import { FaPlus } from "react-icons/fa";
import FileUpload from "../../components/UploadFile";
import Section from "../../components/Section";
import { defaultStudent } from "../../api/reducer";
import { toast } from "react-hot-toast";
import useAxiosPrivate from "../../api/hooks/useAxiosPrivate";
import { useForm } from "react-hook-form";
import useLocalStorage from "../../api/hooks/useLocalStorage";

function SubmissionPage() {
  const http = useAxiosPrivate();
  const { handleSubmit, register, reset } = useForm<ISubmission>();
  const { dispatch } = useContext(AppContext);
  const [student] = useLocalStorage("students", defaultStudent);
  const [file, setFile] = useState<string>("");
  const [isModalOpen, setModal] = useState(false);
  const [mode, setMode] = useState<"Edit" | "Create">("Create");

  const closeModal = () => setModal(false);
  const showModal = () => setModal(true);

  useEffect(() => {
    reset();
  }, [dispatch, reset]);

  const fetchSubmission = async (): Promise<{
    count: number;
    submissions: ISubmission[];
  }> => {
    const response = await http.get(`/submissions`);
    return response.data;
  };

  const fetchAssignment = async (): Promise<{
    count: number;
    assignments: IAssignment[];
  }> => {
    const response = await http.get(`/assignments`);
    return response.data;
  };

  const { data: assignments } = useQuery("assignments", fetchAssignment);

  const createSubmission = async (data: ISubmission): Promise<ISubmission> => {
    const response = await http.post<ISubmission>(`/submissions`, data);
    return response.data;
  };

  const createMutation = useMutation("submissions", createSubmission, {
    onSuccess: () => {
      closeModal();
      reset();
      toast.success("Created successfully");
    },
  });

  const onSubmit = (data) => {
    const submission = {
      ...data,
      file,

      student: student._id || "",
    };

    createMutation.mutate(submission);
    setFile("");
  };

  const handleCreate = () => {
    setMode("Create");
    reset();
    showModal();
  };

  // the Registration form
  const RegisterForm = () => (
    <form action="" className="w-full " onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap gap-4 mx-auto w-full items-center">
        <div className="relative w-full ">
          <Select
            defaultValue={100}
            required
            placeholder="select a assignment"
            {...register("assignment")}
          >
            <option disabled>Select a level</option>
            {assignments?.assignments &&
              assignments.assignments?.map((assignment) => (
                <option value={assignment._id} key={assignment._id}>
                  {assignment.title} - {assignment.course.code}
                </option>
              ))}
          </Select>
        </div>
        <div className="relative w-full ">
          <FileUpload setFile={setFile} />
        </div>
      </div>
      <div className="relative w-full my-6">
        <Button
          type="submit"
          className="w-full"
          isProcessing={createMutation.isLoading}
          gradientDuoTone="greenToBlue"
        >
          {mode} Submission
        </Button>
      </div>
    </form>
  );

  return (
    <main className="my-10">
      <Modal size="xl" show={isModalOpen} dismissible onClose={closeModal}>
        <Modal.Header className="text-sm">{mode} Submission</Modal.Header>
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
        <Section subtitle="All submissions">
          <Button onClick={handleCreate} gradientDuoTone="greenToBlue">
            <FaPlus className="mr-4" /> Add a new submission
          </Button>
          <AssignmentsList
            assignments={assignments?.assignments.filter(
              (ass) => ass.submissions.length
            )}
          />
        </Section>
      </ListGroup>
    </main>
  );
}
export default SubmissionPage;
