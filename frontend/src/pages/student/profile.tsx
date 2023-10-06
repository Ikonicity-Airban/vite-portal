import { Button, Card, Label, Select, TextInput } from "flowbite-react";
import { CustomError, IStudent } from "../../api/@types";
import { SubmitHandler, useForm } from "react-hook-form";

import LogoComponent from "../../components/LogoComponent";
import Section from "../../components/Section";
import { defaultStudent } from "../../api/reducer";
import useAxiosPrivate from "../../api/hooks/useAxiosPrivate";
import useLocalStorage from "../../api/hooks/useLocalStorage";
import { useMutation } from "react-query";

function StudentProfilePage() {
  const { handleSubmit, register } = useForm<IStudent>();
  const [student, setStudent] = useLocalStorage<IStudent>(
    "student",
    defaultStudent
  );
  const http = useAxiosPrivate();
  const { mutate, isLoading } = useMutation(
    "student",
    async (data: IStudent) =>
      await http.patch(`/students/${student._id}`, data),
    {
      onError: (error: CustomError) => {
        console.error(error.response.data.msg);
      },
      onSuccess: ({ data }) => {
        setStudent(data);
      },
    }
  );

  const onSubmit: SubmitHandler<IStudent> = async (data) => {
    mutate(data);
  };
  return (
    <main>
      <Section subtitle="My profile">
        <Card className="max-w-screen-tablet  mx-auto w-full">
          <div className="my-6 mx-auto">
            <LogoComponent />
          </div>
          <form
            action=""
            className="space-y-6 md:space-y-0 grid grid-cols-1 md:grid-cols-2 gap-4 items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-3">
              <Label value="First Name" htmlFor="firstname" />
              <TextInput
                required
                defaultValue={student.firstName}
                {...register("firstName")}
              />
            </div>
            <div className="space-y-3">
              <Label value="Last Name" htmlFor="lastName" />
              <TextInput
                required
                defaultValue={student.lastName}
                id="lastName"
                {...register("lastName")}
              />
            </div>
            <div className="space-y-3">
              <Label value="Email" htmlFor="email" />
              <TextInput
                required
                disabled
                defaultValue={student.userId?.email}
                id="email"
              />
            </div>
            <div className="space-y-3">
              <Label value="Registration Number" htmlFor="mat_no" />
              <TextInput
                required
                disabled
                defaultValue={student.mat_no}
                id="mat_no"
              />
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
              <TextInput
                required
                disabled
                defaultValue={student?.year_of_graduation || 2023}
                id="graduation"
              />
            </div>
            <div className="space-y-3">
              <Label value="Contact Address" htmlFor="contact_address" />
              <TextInput
                required
                defaultValue={student.contact_address}
                id="contact_address"
                {...register("contact_address")}
              />
            </div>
            <div className="space-y-3">
              <Label value="Phone Number" htmlFor="mobile_phone" />
              <TextInput
                required
                defaultValue={student.mobile_phone}
                id="mobile_phone"
                {...register("mobile_phone")}
              />
            </div>
            <div className="space-y-3">
              <Label value="Level" htmlFor="level" />
              <Select
                required
                defaultValue={student.level}
                id="level"
                {...register("level")}
              >
                {[100, 200, 300, 400].map((level) => (
                  <option
                    value={level}
                    key={level}
                    disabled={
                      student.level && level > student?.level ? true : false
                    }
                  >
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
        </Card>
      </Section>
    </main>
  );
}

export default StudentProfilePage;
