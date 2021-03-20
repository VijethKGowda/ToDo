import { copyFileSync } from "node:fs";
import { useEffect, useState } from "react";
import Table from "./Table";
import { noop } from "../utils/";

type TabsProps = {
  setTableValue?: (string) => void;
  tableValue?: any[];
};

const Tabs: React.FunctionComponent<TabsProps> = ({
  setTableValue = noop,
  tableValue,
}) => {
  const [seleceted, setSeleceted] = useState("All");
  const style = "border-t border-r border-l -mb-px bg-white text-indigo-600";

  return (
    <div className="rounded w-full mx-auto mt-12">
      <ul id="tabs" className="inline-flex pt-2 px-2 w-full border-b">
        <li
          className={`px-4  font-normal py-2 rounded-t ${
            seleceted === "All" ? style : "text-gray-800"
          }`}
          onClick={() => {
            setSeleceted("All");
          }}
        >
          <a id="default-tab" href="#first">
            All
          </a>
        </li>
        <li
          className={`px-4  font-normal py-2 rounded-t ${
            seleceted === "Pending" ? style : "text-gray-800"
          }`}
          onClick={() => {
            setSeleceted("Pending");
          }}
        >
          <a href="#second">Pending</a>
        </li>
        <li
          className={`px-4  font-normal py-2 rounded-t ${
            seleceted === "Completed" ? style : "text-gray-800"
          }`}
          onClick={() => {
            setSeleceted("Completed");
          }}
        >
          <a href="#third">Completed</a>
        </li>
      </ul>
      <Table setTableValue={setTableValue} tableValue={tableValue} />
    </div>
  );
};

export default Tabs;
