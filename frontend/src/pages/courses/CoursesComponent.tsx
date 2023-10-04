import { Button, Card, Label, TextInput, Textarea } from "flowbite-react";
import { CustomError, ICourse, IStudent } from "../../api/@types";
import { Types, defaultStudent } from "../../api/reducer";
import { useContext } from "react";

import { useMutation } from "react-query";
import useAxiosPrivate from "../../api/hooks/useAxiosPrivate";
import useLocalStorage from "../../api/hooks/useLocalStorage";
import { AppContext } from "../../api/context";

interface ICoursesProps {
  course: ICourse;
}

export const RegisterCourseForm = ({ course }: ICoursesProps) => {
  return (
    <form className="p-4 space-y-4 text-left">
      <div className="">
        <Label value="Title" htmlFor="title" />
        <TextInput defaultValue={course.title} readOnly id="title" />
      </div>
      <div className="">
        <Label value="Course Code" htmlFor="code" />
        <TextInput defaultValue={course.code} />
      </div>
      <div className="">
        <Label value="Course Description" htmlFor="description" />
        <Textarea defaultValue={course.description} readOnly id="description" />
      </div>
    </form>
  );
};

export default function CoursesComponent({ course }: ICoursesProps) {
  const { dispatch } = useContext(AppContext);
  const [user] = useLocalStorage<IStudent>("student", defaultStudent);
  const http = useAxiosPrivate();
  const { mutate } = useMutation<ICourse, CustomError>(
    "course",
    async () =>
      await http.post("/courses/register", {
        studentId: user._id,
        courseId: course._id,
      }),
    {
      onError(error: CustomError) {
        console.error(error.response.data.msg);
      },
    }
  );

  const handleRegister = () => {
    mutate();
    console.log("hello");
  };

  const handleClick = () => {
    dispatch({
      type: Types.open,
      payload: {
        show: true,
        header: "Register course",
        type: "Success",
        content: <RegisterCourseForm course={course} />,
        buttonOK: "Register",
        onOk: handleRegister,
      },
    });
  };

  return (
    <>
      <Card className="max-h-54 justify-between flex flex-col">
        <div className="text-center font-thin">
          <h4 className="font-medium">{course.title}</h4>
        </div>
        <hr />
        <div className="justify-center space-y-4">
          <span className="text-center text-xs font-robo">Course CODE:</span>
          <h3>{course.code}</h3>
        </div>
        <hr />
        <div className="flex justify-between items-center space-y-3 flex-wrap">
          <Button
            outline
            gradientDuoTone="greenToBlue"
            className="w-full"
            onClick={handleClick}
          >
            Register Course
          </Button>
        </div>
      </Card>
    </>
  );
}
