import { useState } from "react";

type FilterProps = {
  setSearch: (string) => void;
  setGroupBy?: (string) => void;
};

const Filter: React.FunctionComponent<FilterProps> = ({
  setSearch,
  setGroupBy,
}) => {
  const groupDate = [
    {
      Title: "None",
      Value: "",
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

  return (
    <div className="flex">
      <div className="w-72 mt-12">
        <label
          htmlFor="groupBy"
          className="block text-sm font-medium text-gray-700"
        >
          Group By
        </label>
        <select
          id="groupBy"
          name="groupBy"
          autoComplete="country"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={(e) => {
            setGroupBy(e.target.value);
          }}
        >
          {groupDate.map((group) => (
            <option key={group.Value} value={group.Value}>
              {group.Title}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full ml-8 mt-12">
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700"
        >
          Search
        </label>
        <input
          type="text"
          name="search"
          id="search"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  border border-gray-300 rounded-md"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Filter;
