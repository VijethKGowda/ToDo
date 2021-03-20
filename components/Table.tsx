import { useState } from "react";
import Edit from "../public/edit.svg";
import Trash from "../public/trash.svg";
import Modal from "./Modal";
import { noop } from "../utils/";
import DeleteModal from "./DeleteModal";

type TableProps = {
  setTableValue?: (string) => void;
  tableValue?: any[];
};

const Table: React.FunctionComponent<TableProps> = ({
  setTableValue = noop,
  tableValue,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const tableHeading = ["Summary", "Priority", "Created On", "Due By"];

  const [deleteItem, setDeleteItem] = useState("");

  const onDelete = () => {
    console.log("deleted", deleteItem);
    setShowDeleteModal(false);
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className={`min-w-full divide-y divide-gray-200 `}>
              <thead className="bg-gray-50">
                <tr>
                  {tableHeading.map((table) => (
                    <th
                      scope="col"
                      className="px-6 py-3 text-left cursor-pointer text-xs font-medium text-gray-500 uppercase tracking-wider"
                      key={table}
                    >
                      {table}
                    </th>
                  ))}
                  <td
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </td>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {tableValue.map((tab, index) => {
                  console.log(tab);
                  return (
                    <tr key={tab.summary + index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {tab.summary}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {tab.priority}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {tab.created}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{tab.due}</td>
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
                          onClick={() => {
                            setShowDeleteModal(true);
                            setDeleteItem(tab.summary);
                          }}
                        >
                          <Trash />
                        </button>
                      </td>
                    </tr>
                  );
                })}
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
      {showDeleteModal ? (
        <DeleteModal
          onDelete={onDelete}
          setShowDeleteModal={setShowDeleteModal}
        />
      ) : null}
    </div>
  );
};

export default Table;
