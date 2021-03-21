import { useEffect, useState } from "react";
import Filter from "../components/filter";
import Headers from "../components/Header";
import Tabs from "../components/Tabs";
import records from "../public/records.json";
export default function Home() {
  const [tableValue, setTableValue] = useState(records);
  const [groupBy, setGroupBy] = useState("");
  const [search, setSearch] = useState("");

  return (
    <div className="mx-6 lg:mx-48 md:mx-16 sm:mx-6 my-10">
      <Headers setTableValue={setTableValue} />
      <Filter setGroupBy={setGroupBy} setSearch={setSearch} />
      <Tabs
        tableValue={tableValue}
        setTableValue={setTableValue}
        search={search}
        groupBy={groupBy}
      />
    </div>
  );
}
