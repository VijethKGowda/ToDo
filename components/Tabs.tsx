import { copyFileSync } from "node:fs";
import { useEffect, useState } from "react";
import Table from "./Table";
import { noop } from "../utils/";

type TabsProps = {
  setTableValue?: (string) => void;
  tableValue?: any[];
  groupBy?: string;
  search?: string;
};

const Tabs: React.FunctionComponent<TabsProps> = ({
  setTableValue = noop,
  tableValue,
  groupBy,
  search,
}) => {
  const [selected, setSelected] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("All");
  const style = "border-t border-r border-l -mb-px bg-white text-indigo-600";
  const tabData = [
    {
      Title: "All",
      Value: "",
    },
    {
      Title: "Pending",
      Value: "in_progress",
    },
    {
      Title: "Completed",
      Value: "done",
    },
  ];

  return (
    <div className="rounded w-full mx-auto mt-12">
      <ul id="tabs" className="inline-flex pt-2 px-2 w-full border-b">
        {tabData.map((tab) => (
          <li
            className={`px-4  font-normal py-2 rounded-t cursor-pointer ${
              selectedStyle === tab.Title ? style : "text-gray-800"
            }`}
            onClick={() => {
              setSelectedStyle(tab.Title);
              setSelected(tab.Value);
            }}
            key={tab.Title}
          >
            {tab.Title}
          </li>
        ))}
      </ul>
      <Table
        setTableValue={setTableValue}
        tableValue={tableValue}
        groupBy={groupBy}
        search={search}
        selectedTab={selected}
      />
    </div>
  );
};

export default Tabs;
