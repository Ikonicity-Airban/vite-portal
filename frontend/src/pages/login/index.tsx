import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import { AppContext } from "../../api/context";
import { FaExclamationCircle } from "react-icons/fa";
import { ILoginResponse } from "../../api/@types";
import LogoComponent from "../../components/LogoComponent";
import { Types } from "../../api/reducer";
import https from "../../api/https";
import { loginFormFields } from "../../api/resource/fields";
import { useContext } from "react";
import { useState } from "react";

interface IFormInput {
  email: string;
  password: string;
}

function LoginPage() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const { state } = useLocation();
  const navigate = useNavigate();
  const { dispatch } = useContext(AppContext);

  const loginMutation = async (formData: IFormInput) => {
    setIsLoading(true);
    try {
      const response = await https.post<ILoginResponse>("/login", formData);
      const data = response.data;
      dispatch({
        type: Types.login,
        payload: data,
      });
      const role = data.tokenUser.role;
      return navigate(`/${role}`, {
        replace: true,
      });
    } catch (error) {
      error instanceof Error &&
        dispatch({
          type: Types.open,
          payload: {
            buttonOK: "OK",
            header: "Error",
            onOk: function () {
              console.log(error);
            },
            content: (
              <div className="text-red-700 dark:text-yellow-600 p-6 flex items-center">
                <FaExclamationCircle className="text-6xl flex-[0.3]" />
                <p className="my-3 flex-[2]">{error.response.data.msg}</p>
              </div>
            ),
            type: "Error",
          },
        });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    loginMutation(data);
  };

  //return
  return (
    <Card className="min-w-[260px] my-10 max-w-sm w-full">
      <div className="mx-auto">
        <LogoComponent />
      </div>
      <span className="flex place-content-center my-6">
        <h3 className="logo-clipped max-w-md font-semibold">Login Form</h3>
      </span>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {loginFormFields.map(({ name, label, icon }) => (
          <div key={name} className="relative">
            <div className="mb-2 block ">
              <Label htmlFor={name}>{label}</Label>
            </div>
            <span className="absolute z-10 right-4 bottom-[20%] text-gray-500">
              {icon}
            </span>
            <TextInput
              required
              disabled={isLoading}
              className="placeholder:capitalize placeholder:mx-10"
              type={showPass ? "text" : name}
              defaultValue={name == "email" && state?.email}
              id={name}
              // placeholder={label}
              {...register(name as keyof IFormInput)}
            />
          </div>
        ))}
        <div className="flex items-center gap-2">
          <Checkbox
            id="showPass"
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
          gradientDuoTone={"greenToBlue"}
          className="w-full"
          type="submit"
          disabled={isLoading}
          isProcessing={isLoading}
        >
          Submit
        </Button>
      </form>
    </Card>
  );
}

export default LoginPage;
