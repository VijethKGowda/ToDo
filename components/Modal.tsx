import { useEffect, useState } from "react";
import { noop } from "../utils/";

type ModalProps = {
  setShowModal: (string) => void;
  title: string;
  button: string;
  setTableValue?: (string) => void;
  editValue?: object;
  tableValue?: any[];
};
const Modal: React.FunctionComponent<ModalProps> = ({
  setShowModal = noop,
  title,
  button,
  setTableValue = noop,
  editValue,
  tableValue,
}) => {
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("None");
  const [dueDate, setDueDate] = useState("");
  const [valid, setValid] = useState(true);
  const [progress, setProgress] = useState("in_progress");
  const priorityData = ["None", "Low", "Medium", "High"];

  const [tempEditValue, setTempEditValue] = useState({
    summary: "",
    priority: "",
    created: "",
    due: "",
    description: "",
    progress: "",
  });
  let date = new Date();
  let today =
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0");

  useEffect(() => {
    if (editValue) {
      setSummary(editValue["summary"]);
      setDescription(editValue["description"]);
      setPriority(editValue["priority"]);
      setDueDate(editValue["due"]);
      setProgress(editValue["progress"]);
    }
  }, [editValue]);

  const submit = () => {
    if (!summary || !dueDate || !description) setValid(false);
    else if (editValue) {
      const temp = tableValue.map((tab) => {
        if (tab.summary == editValue["summary"]) {
          return {
            summary: summary,
            priority: priority,
            created: today,
            due: dueDate,
            description: description,
            progress: progress,
          };
        } else return tab;
      });
      setShowModal(false);
      setTableValue(temp);
    } else {
      setTableValue((prev) => [
        ...prev,
        {
          summary: summary,
          priority: priority,
          created: today,
          due: dueDate,
          description: description,
          progress: progress,
        },
      ]);
      setShowModal(false);
    }
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
                      value={summary}
                      autoComplete="given-name"
                      onChange={(e) => {
                        setSummary(e.target.value);
                      }}
                      className={`${
                        !valid && !summary ? "ring-2 ring-red-400" : null
                      } mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                    />
                    {!valid && !summary ? (
                      <span className="text-xs text-red-400">Invalid</span>
                    ) : null}
                  </div>

                  <div className="mt-2 w-full">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="about"
                        value={description}
                        rows={5}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        className={`${
                          !valid && !description ? "ring-2 ring-red-400" : null
                        } shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md`}
                        placeholder="Description of your task"
                      ></textarea>
                    </div>
                    {!valid && !description ? (
                      <span className="text-xs text-red-400">Invalid</span>
                    ) : null}
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
                        value={dueDate}
                        onChange={(e) => {
                          setDueDate(e.target.value);
                        }}
                        className={`${
                          !valid && !dueDate ? "ring-2 ring-red-400" : null
                        } mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                      />
                      {!valid && !dueDate ? (
                        <span className="text-xs text-red-400">Invalid</span>
                      ) : null}
                    </div>

                    <div className="mt-2 w-full lg:w-1/2 md:w-full sm:w-full">
                      <label
                        htmlFor="priority"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Priority
                      </label>
                      <select
                        id="priority"
                        name="priority"
                        autoComplete="priority"
                        value={priority}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={(e) => {
                          setPriority(e.target.value);
                        }}
                      >
                        {priorityData.map((pri) => (
                          <option key={pri}>{pri}</option>
                        ))}
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
