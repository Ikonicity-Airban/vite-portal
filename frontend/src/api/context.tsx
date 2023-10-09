import React, { useReducer, createContext, Dispatch } from "react";
import { ModalActions, authActions, authReducer } from "./reducer";

const initialState = {
  user: {
    _id: "",
    email: "",
    role: "",
    accessToken: "",
  },
  signUpInfo: {},
  modal: {
    show: false,
    header: "Header",
    content: <></>,
    onOk: () => undefined,
    buttonOK: "OK",
    type: "Success",
  },
  file: "",
};

type initialStateType = typeof initialState;

export const AppContext = createContext<{
  state: initialStateType;
  dispatch: Dispatch<authActions | ModalActions>;
}>({ state: initialState, dispatch: () => null });

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(
    authReducer<initialStateType>,
    initialState
  );
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
