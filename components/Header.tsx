import { useState } from "react";
import Plus from "../public/plus.svg";
import Modal from "./Modal";
import { noop } from "../utils/";

type HeaderProps = {
  setTableValue?: (string) => void;
};

const Header: React.FunctionComponent<HeaderProps> = ({
  setTableValue = noop,
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="flex justify-between">
        <div className="text-4xl font-medium text-gray-800">ToDo App</div>
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className="mr-3 inline-flex items-center px-3 py-2 border text-white border-gray-300 rounded-md shadow-sm text-sm font-medium bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus />
          &nbsp;Add New Task
        </button>
      </div>
      {showModal ? (
        <Modal
          title={"Add New Task"}
          button={"Add Task"}
          setShowModal={setShowModal}
          setTableValue={setTableValue}
        />
      ) : null}
    </>
  );
};

export default Header;
