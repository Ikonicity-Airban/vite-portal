import {
  Button,
  Card,
  Checkbox,
  Label,
  Spinner,
  TextInput,
} from "flowbite-react";
import { CustomError, ILoginResponse } from "../../api/@types";
import { FaEnvelope, FaKey, FaLock, FaUser } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import { AppContext } from "../../api/context";
import LogoComponent from "../../components/LogoComponent";
import { Types } from "../../api/reducer";
import { httpPrivate } from "../../api/https";
import { useContext } from "react";
import { useMutation } from "react-query";
import { useState } from "react";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const formFields = [
  {
    name: "firstName",
    label: "First Name",
    icon: <FaUser />,
  },
  {
    name: "lastName",
    label: "Last Name",
    icon: <FaUser />,
  },
  {
    name: "email",
    label: "Email",
    icon: <FaEnvelope />,
  },
  {
    name: "password",
    label: "Password",
    icon: <FaKey />,
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    icon: <FaLock />,
  },
];

function SignUpPage() {
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);
  const [showPass, setShowPass] = useState(false);

  const { register, handleSubmit, reset } = useForm<IFormInput>();

  const { mutate, isLoading } = useMutation(
    ["login"],
    async (formData: IFormInput) => {
      const response = await httpPrivate.post<ILoginResponse>(
        `create-account/${currentUser}`,
        formData,
        { withCredentials: true }
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        navigate("/login", {
          replace: true,
          state: {
            email: data.tokenUser?.email,
          },
        });
        dispatch({
          type: Types.open,
          payload: {
            show: true,
            header: "Success",
            content: <p>Account created successfully</p>,
            buttonOK: "OK",
            onOk() {
              return;
            },
            type: "Success",
          },
        });
        reset();
      },

      onError: (error: CustomError) => {
        dispatch({
          type: Types.open,
          payload: {
            header: "Success",
            content: <p>{error.response.data.msg}</p>,
            type: "Error",
            buttonOK: "OK",
          },
        });
      },
    }
  );

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    mutate(data);
  };

  const { pathname } = useLocation();
  const currentUser = pathname.split("/")[2];
  //return
  return (
    <Card className="min-w-[315px] w-full mobile:max-w-md">
      <span className="flex place-content-center">
        <h3 className="logo-clipped text-center max-w-md my-6 font-semibold">
          Sign up as {currentUser}
        </h3>
      </span>
      <span className="mx-auto">
        <LogoComponent />
      </span>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 capitalize">
        {formFields.map(({ name, label, icon, type }) => (
          <div key={name} className="relative">
            <div className="mb-2 block ">
              <Label htmlFor={name}>{label}</Label>
            </div>
            <span className="absolute z-10 right-4 bottom-[20%] text-gray-500">
              {icon}
            </span>
            <TextInput
              required
              className="placeholder-shown:capitalize"
              type={showPass ? "text" : type || name}
              id={name}
              {...register(name as keyof IFormInput)}
            />
          </div>
        ))}

        <div className="flex items-center gap-2">
          <Checkbox
            id="showPass"
            className="focus:ring-primary"
            onChange={(e) => setShowPass(e.target.checked)}
          />
          <Label
            htmlFor="showPass"
            className="cursor-pointer text-xs my-3 pl-2"
          >
            Show password
          </Label>
        </div>
        <Button
          disabled={isLoading}
          gradientDuoTone={"greenToBlue"}
          className="w-full"
          type="submit"
        >
          {isLoading ? (
            <center>
              <Spinner />
            </center>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Card>
  );
}

export default SignUpPage;
