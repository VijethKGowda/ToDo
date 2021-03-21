import { useEffect, useState } from "react";
import Edit from "../public/edit.svg";
import Trash from "../public/trash.svg";
import Modal from "./Modal";
import { noop } from "../utils/";
import DeleteModal from "./DeleteModal";
import UpDown from "../public/upDown.svg";

type TableProps = {
  setTableValue?: (string) => void;
  tableValue?: any[];
  groupBy: string;
  search: string;
  selectedTab: string;
  setGroupBy?: (string) => void;
};

const Table: React.FunctionComponent<TableProps> = ({
  setTableValue = noop,
  tableValue,
  groupBy,
  search,
  selectedTab,
  setGroupBy,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editValue, SetEditValue] = useState({});
  const [deleteItem, setDeleteItem] = useState("");
  const [filteredValue, setFilteredValue] = useState(tableValue);

  const [groupByValue, setGroupByValue] = useState("");
  const [groupByTable, setGroupByTable] = useState([]);

  const [sortOrder, setSortOrder] = useState(false);
  const tableHeading = [
    {
      Title: "Summary",
      Value: "summary",
    },
    {
      Title: "Priority",
      Value: "priority",
    },
    {
      Title: "Created On",
      Value: "created",
    },
    {
      Title: "Due By",
      Value: "due",
    },
  ];

  const onDelete = () => {
    setShowDeleteModal(false);
    setTableValue(tableValue.filter((item) => item.summary !== deleteItem));
  };

  const changeStatus = (tab, index, status) => {
    let temp = { ...tab, progress: status };
    let bbb = tableValue.map((ta, i) => {
      if (ta.summary === tab.summary) {
        return temp;
      } else return ta;
    });
    setTableValue(bbb);
  };

  useEffect(() => {
    const filtered = tableValue.filter((fil) => {
      return (
        fil.summary.toLowerCase().includes(search.toLowerCase()) ||
        fil.priority.toLowerCase().includes(search.toLowerCase()) ||
        fil.created.toLowerCase().includes(search.toLowerCase()) ||
        fil.due.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredValue(filtered);
    setGroupByValue("");
    setGroupBy("");
  }, [search, tableValue]);

  useEffect(() => {
    const filtered = tableValue.filter((fil) => {
      return fil.progress.toLowerCase().includes(selectedTab.toLowerCase());
    });
    setGroupByValue("");
    setGroupBy("");
    setFilteredValue(filtered);
  }, [tableValue, selectedTab]);

  useEffect(() => {}, [filteredValue, tableValue]);

  const sort = (table) => {
    if (table === "summary") {
      filteredValue.sort(function (a, b) {
        var nameA = a.summary.toUpperCase();
        var nameB = b.summary.toUpperCase();
        if (nameA < nameB) {
          return sortOrder ? -1 : 1;
        }
        if (nameA > nameB) {
          return sortOrder ? 1 : -1;
        }
        return 0;
      });
    }
    if (table === "due") {
      filteredValue.sort(function (a, b) {
        var nameA = a.due.toUpperCase();
        var nameB = b.due.toUpperCase();
        if (nameA < nameB) {
          return sortOrder ? -1 : 1;
        }
        if (nameA > nameB) {
          return sortOrder ? 1 : -1;
        }
        return 0;
      });
    }
    if (table === "created") {
      filteredValue.sort(function (a, b) {
        var nameA = a.created.toUpperCase();
        var nameB = b.created.toUpperCase();
        if (nameA < nameB) {
          return sortOrder ? -1 : 1;
        }
        if (nameA > nameB) {
          return sortOrder ? 1 : -1;
        }
        return 0;
      });
    }
    if (table === "priority") {
      filteredValue.sort(function (a, b) {
        var nameA = a.priority.toUpperCase();
        var nameB = b.priority.toUpperCase();
        if (nameA < nameB) {
          return sortOrder ? -1 : 1;
        }
        if (nameA > nameB) {
          return sortOrder ? 1 : -1;
        }
        return 0;
      });
    }
    setGroupByValue("");
    setGroupBy("");
  };

  const group = function groupByArray(xs, key, sortKey) {
    return xs.reduce(function (rv, x) {
      let v = key instanceof Function ? key(x) : x[key];
      let el = rv.find((r) => r && r.key === v);

      if (el) {
        el.values.push(x);
        el.values.sort(function (a, b) {
          return a[sortKey]
            .toLowerCase()
            .localeCompare(b[sortKey].toLowerCase());
        });
      } else {
        rv.push({ key: v, values: [x] });
      }

      return rv;
    }, []);
  };

  useEffect(() => {
    setGroupByValue(groupBy);
  }, [groupBy]);

  useEffect(() => {
    const grp = group(tableValue, groupByValue, "summary");
    setGroupByTable(grp);
  }, [groupByValue]);

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
                      style={{ minWidth: "150px" }}
                      key={table.Value}
                      onClick={() => {
                        sort(table.Value);
                        setSortOrder(!sortOrder);
                      }}
                    >
                      <div className="flex justify-between">
                        {table.Title} <UpDown />
                      </div>
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

              {groupByValue ? (
                <>
                  {groupByTable.map((grp) => {
                    return (
                      <tbody
                        key={grp.key}
                        className="bg-white divide-y divide-gray-200"
                      >
                        <tr>
                          <td></td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {groupBy === "priority" ? (
                              <span
                                key={grp.key}
                                className="text-sm font-bold text-left text-indigo-500 uppercase tracking-wider"
                              >
                                {grp.key}
                              </span>
                            ) : null}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {groupBy === "created" ? (
                              <span
                                key={grp.key}
                                className="text-sm font-bold text-left text-indigo-500 uppercase tracking-wider"
                              >
                                {grp.key}
                              </span>
                            ) : null}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {groupBy === "due" ? (
                              <span
                                key={grp.key}
                                className="text-sm font-bold text-left text-indigo-500 uppercase tracking-wider"
                              >
                                {grp.key}
                              </span>
                            ) : null}
                          </td>
                        </tr>
                        {grp.values.map((tab, index) => {
                          return (
                            <tr key={tab.summary + index}>
                              <td
                                className={`px-6 py-4 whitespace-nowrap ${
                                  tab.progress == "done"
                                    ? "line-through text-green-700"
                                    : ""
                                } `}
                              >
                                {tab.summary}
                              </td>
                              <td
                                className={`px-6 py-4 whitespace-nowrap ${
                                  tab.progress == "done"
                                    ? "line-through text-green-700"
                                    : ""
                                } `}
                              >
                                {tab.priority}
                              </td>
                              <td
                                className={`px-6 py-4 whitespace-nowrap ${
                                  tab.progress == "done"
                                    ? "line-through text-green-700"
                                    : ""
                                } `}
                              >
                                {tab.created}
                              </td>
                              <td
                                className={`px-6 py-4 whitespace-nowrap ${
                                  tab.progress == "done"
                                    ? "line-through text-green-700"
                                    : ""
                                } `}
                              >
                                {tab.due}
                              </td>
                              <td className="px-6 py-4 flex items-center">
                                <button
                                  onClick={() => {
                                    SetEditValue(tab);
                                    setShowModal(true);
                                  }}
                                  type="button"
                                  className="mr-3 inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  <Edit />
                                </button>
                                {tab.progress == "in_progress" ? (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      changeStatus(tab, index, "done");
                                    }}
                                    className="mr-3 px-3 py-2 border w-20 text-white border-gray-300 rounded-md shadow-sm text-sm bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                  >
                                    Done
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      changeStatus(tab, index, "in_progress");
                                    }}
                                    className="mr-3 px-3 py-2 border w-20 text-white border-gray-300 rounded-md shadow-sm text-sm bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                  >
                                    Re open
                                  </button>
                                )}
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
                    );
                  })}
                </>
              ) : (
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredValue.map((tab, index) => {
                    return (
                      <tr key={tab.summary + index}>
                        <td
                          className={`px-6 py-4 whitespace-nowrap ${
                            tab.progress == "done"
                              ? "line-through text-green-700"
                              : ""
                          } `}
                        >
                          {tab.summary}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap ${
                            tab.progress == "done"
                              ? "line-through text-green-700"
                              : ""
                          } `}
                        >
                          {tab.priority}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap ${
                            tab.progress == "done"
                              ? "line-through text-green-700"
                              : ""
                          } `}
                        >
                          {tab.created}
                        </td>
                        <td
                          className={`px-6 py-4 whitespace-nowrap ${
                            tab.progress == "done"
                              ? "line-through text-green-700"
                              : ""
                          } `}
                        >
                          {tab.due}
                        </td>
                        <td className="px-6 py-4 flex items-center">
                          <button
                            onClick={() => {
                              SetEditValue(tab);
                              setShowModal(true);
                            }}
                            type="button"
                            className="mr-3 inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <Edit />
                          </button>
                          {tab.progress == "in_progress" ? (
                            <button
                              type="button"
                              onClick={() => {
                                changeStatus(tab, index, "done");
                              }}
                              className="mr-3 px-3 py-2 border w-20 text-white border-gray-300 rounded-md shadow-sm text-sm bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              Done
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                changeStatus(tab, index, "in_progress");
                              }}
                              className="mr-3 px-3 py-2 border w-20 text-white border-gray-300 rounded-md shadow-sm text-sm bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                              Re open
                            </button>
                          )}
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
              )}
            </table>
          </div>
        </div>
      </div>
      {showModal ? (
        <Modal
          title={"Edit Task"}
          button={"Edit"}
          tableValue={tableValue}
          editValue={editValue}
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
