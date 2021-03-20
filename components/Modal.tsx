import { useState } from "react";
import { noop } from "../utils/";

type ModalProps = {
  setShowModal: (string) => void;
  title: string;
  button: string;
  setTableValue?: (string) => void;
};
const Modal: React.FunctionComponent<ModalProps> = ({
  setShowModal = noop,
  title,
  button,
  setTableValue = noop,
}) => {
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");
  const submit = () => {
    setTableValue((prev) => [
      ...prev,
      {
        summary: summary,
        description: description,
        priority: priority,
        date: date,
      },
    ]);
    setShowModal(false);
  };
  return (
    <>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="grid place-items-center min-h-screen pt-4 px-4 pb-20 text-left sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-11/12 lg:w-2/4 md:w-3/4 sm:w-11/12"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flexs sm:items-start">
                <div className="mt-3 text-left sm:mt-0 sm:ml-4">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    {title}
                  </h3>

                  <div className="mt-2 w-full">
                    <label
                      htmlFor="summary"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Summary
                    </label>
                    <input
                      type="text"
                      name="summary"
                      id="summary"
                      autoComplete="given-name"
                      onChange={(e) => {
                        setSummary(e.target.value);
                      }}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="mt-2 w-full">
                    <label
                      htmlFor="descrition"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="descrition"
                        name="about"
                        rows="3"
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Description of your task"
                      ></textarea>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row md:flex-row sm:flex-col gap-2">
                    <div className="mt-2 w-full lg:w-1/2 md:w-full sm:w-full">
                      <label
                        htmlFor="due_date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Due Date
                      </label>
                      <input
                        type="date"
                        name="due_date"
                        id="due_date"
                        autoComplete="given-name"
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="mt-2 w-full lg:w-1/2 md:w-full sm:w-full">
                      <label
                        htmlFor="priority"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Group By
                      </label>
                      <select
                        id="priority"
                        name="priority"
                        autoComplete="priority"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={(e) => {
                          setPriority(e.target.value);
                        }}
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={() => {
                  submit();
                }}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                {button}
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                }}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
