import { useState } from "react";
import Edit from "../public/edit.svg";
import Trash from "../public/trash.svg";
import Modal from "./Modal";
import { noop } from "../utils/";

type TableProps = {
  setTableValue?: (string) => void;
  tableValue?: any[];
};

const Table: React.FunctionComponent<TableProps> = ({
  setTableValue = noop,
  tableValue,
}) => {
  const [showModal, setShowModal] = useState(false);
  console.log(showModal);
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className={`min-w-full divide-y divide-gray-200 `}>
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left cursor-pointer text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Summary
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left cursor-pointer text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Priority
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left cursor-pointer text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Created On
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left cursor-pointer text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Due By
                  </th>
                  <td
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </td>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Purchase Note</td>
                  <td className="px-6 py-4 whitespace-nowrap">Low</td>
                  <td className="px-6 py-4 whitespace-nowrap">20-12-2020</td>
                  <td className="px-6 py-4 whitespace-nowrap">21-12-2020</td>
                  <td className="px-6 py-4 flex items-center">
                    <button
                      onClick={() => {
                        setShowModal(true);
                      }}
                      type="button"
                      className="mr-3 inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Edit />
                    </button>
                    <button
                      type="button"
                      className="mr-3 px-3 py-2 border text-white border-gray-300 rounded-md shadow-sm text-sm bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Done
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <Trash />
                    </button>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Purchase Note</td>
                  <td className="px-6 py-4 whitespace-nowrap">Medium</td>
                  <td className="px-6 py-4 whitespace-nowrap">20-12-2020</td>
                  <td className="px-6 py-4 whitespace-nowrap">21-12-2020</td>
                  <td className="px-6 py-4 flex items-center">
                    <button
                      onClick={() => {
                        setShowModal(true);
                      }}
                      type="button"
                      className="mr-3 inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Edit />
                    </button>
                    <button
                      type="button"
                      className="mr-3 px-3 py-2 border text-white border-gray-300 rounded-md shadow-sm text-sm bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Done
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <Trash />
                    </button>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Purchase Note</td>
                  <td className="px-6 py-4 whitespace-nowrap">High</td>
                  <td className="px-6 py-4 whitespace-nowrap">20-12-2020</td>
                  <td className="px-6 py-4 whitespace-nowrap">21-12-2020</td>
                  <td className="px-6 py-4 flex items-center">
                    <button
                      onClick={() => {
                        setShowModal(true);
                      }}
                      type="button"
                      className="mr-3 inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Edit />
                    </button>
                    <button
                      type="button"
                      className="mr-3 px-3 py-2 border text-white border-gray-300 rounded-md shadow-sm text-sm bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Done
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <Trash />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModal ? (
        <Modal
          title={"Edit Task"}
          button={"Edit"}
          setShowModal={setShowModal}
          setTableValue={setTableValue}
        />
      ) : null}
    </div>
  );
};

export default Table;
