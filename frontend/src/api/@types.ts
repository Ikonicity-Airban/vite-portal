import { ReactNode } from "react";

type dataResponse = {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

type IUser = {
  email: string;
  role: string;
  id?: string;
} & dataResponse;

export type IStudent = {
  userId?: IUser;
  firstName: string;
  lastName: string;
  coursesOffered?: ICourse[];
  level: number | 100 | 200 | 300 | 400;
  mat_no?: string;
  photoURL?: string;
  sex?: "male" | "female";
  mobile_phone?: string;
  contact_address?: string;
  year_of_graduation?: string;
} & dataResponse;

export type GenericResponse = {
  status: string;
  message: string;
};

export type ILoginResponse = {
  accessToken: string;
  tokenUser: IUser;
};

export type ICourse = {
  title: string;
  code: string;
  description?: string;
  department?: IDepartment["name"];
  instructor?: IInstructor;
} & dataResponse;

export type IDepartment = {
  name: string;
  description?: string;
  headOfDepartment?: string;
  coursesOffered?: ICourse[];
  students?: string[];
  instructors?: string[];
} & dataResponse;

export type IAssignment = {
  title: string;
  file: string;
  instructor: string;
  level: 100 | 200 | 300 | 400;
  description: string;
  submission: string;
  course: ICourse;
} & dataResponse;

export type IInstructor = {
  userId?: IUser;
  title?: string;
  firstName: string;
  lastName: string;
  photoURL?: string;
  courseTeaching?: ICourse;
  assignment?: IAssignment[];
  department?: IDepartment["name"];
} & dataResponse;

export type ISubmission = {
  student: string;
  assignment: string;
  linkOrFile?:
    | {
        data: Buffer;
        contentType: string;
      }
    | string;
} & dataResponse;

export type CustomError = {
  message: string;
  response: { data: { msg: string } };
};

export type IModal = {
  type?: "Success" | "Error" | "Default";
  show?: boolean;
  header?: string;
  content?: ReactNode;
  buttonOK: "OK" | "Submit" | "Register";
  onOk?: () => undefined | void;
};

export type IResult = {
  student: IStudent;
  courses: ICourse[];
  level: 100 | 200 | 300 | 400;
} & dataResponse;

export type IEvent = {
  instructor: IInstructor;
  title: string;
  date?: Date;
  content: string;
  type: "news" | "event";
} & dataResponse;
