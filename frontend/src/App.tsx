import "./App.css";

import { Button, Modal } from "flowbite-react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

import { AppContext } from "./api/context";
import { Outlet } from "react-router-dom";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Types } from "./api/reducer";

function App() {
  const {
    dispatch,
    state: { modal },
  } = React.useContext(AppContext);

  function closeModal() {
    dispatch({
      type: Types.close,
      payload: null,
    });
  }

  function onOk(func: () => void | undefined) {
    func();
    closeModal();
  }

  return (
    <section className="w-[99vw] dark:bg-slate-950 3xl:container mx-auto">
      <Toaster />
      <Modal size="xl" show={modal?.show} dismissible onClose={closeModal}>
        <Modal.Header className="text-sm">{modal.header}</Modal.Header>
        <Modal.Body
          className={`text-center p-0 ${
            modal.type == "Success"
              ? "text-green-700 dark:text-green-500"
              : modal.type == "Error"
              ? "text-red-700 dark:to-green-500"
              : ""
          }`}
        >
          <div className="flex p-6 items-center gap-6">
            {modal.type == "Success" ? (
              <FaExclamationCircle className="text-7xl" />
            ) : modal.type == "Error" ? (
              <FaCheckCircle className="text-6xl flex-[0.3]" />
            ) : (
              ""
            )}
            <span className="text-sm flex-1 text-center p-4">
              {modal.content}
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          {modal.onOk && (
            <Button
              size="sm"
              color={modal.type == "Error" ? "failure" : "success"}
              onClick={() => {
                onOk(modal.onOk);
                dispatch({
                  type: Types.close,
                  payload: null,
                });
              }}
            >
              {modal.buttonOK}
            </Button>
          )}
          <Button size="sm" color="gray" onClick={closeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Outlet />
    </section>
  );
}

export default App;
