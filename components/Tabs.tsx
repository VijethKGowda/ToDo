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

  const tabData = ["All", "Pending", "Completed"];

  return (
    <div className="rounded w-full mx-auto mt-12">
      <ul id="tabs" className="inline-flex pt-2 px-2 w-full border-b">
        {tabData.map((tab) => (
          <li
            className={`px-4  font-normal py-2 rounded-t cursor-pointer ${
              seleceted === tab ? style : "text-gray-800"
            }`}
            onClick={() => {
              setSeleceted(tab);
            }}
            key={tab}
          >
            {tab}
          </li>
        ))}
      </ul>
      <Table setTableValue={setTableValue} tableValue={tableValue} />
    </div>
  );
};

export default Tabs;
