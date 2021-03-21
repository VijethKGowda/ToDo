import { useEffect, useState } from "react";
import Filter from "../components/filter";
import Headers from "../components/Header";
import Tabs from "../components/Tabs";
import records from "../public/records.json";
export default function Home() {
  const [tableValue, setTableValue] = useState(records);
  const [groupBy, setGroupBy] = useState("");
  const [search, setSearch] = useState("");

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
    const aba = group(tableValue, groupBy, "summary");
  }, [groupBy]);

  return (
    <div className="mx-6 lg:mx-48 md:mx-16 sm:mx-6 my-10">
      <Headers setTableValue={setTableValue} />
      <Filter setGroupBy={setGroupBy} setSearch={setSearch} />
      <Tabs
        tableValue={tableValue}
        setTableValue={setTableValue}
        search={search}
        groupBy={groupBy}
        setGroupBy={setGroupBy}
      />
    </div>
  );
}
