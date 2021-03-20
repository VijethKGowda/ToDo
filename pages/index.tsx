import { useEffect, useState } from "react";
import Filter from "../components/filter";
import Headers from "../components/Header";
import Tabs from "../components/Tabs";
export default function Home() {
  const [tableValue, setTableValue] = useState([]);

  return (
    <div className="mx-6 lg:mx-48 md:mx-16 sm:mx-6 my-10">
      <Headers setTableValue={setTableValue} />
      <Filter />
      <Tabs tableValue={tableValue} setTableValue={setTableValue} />
    </div>
  );
}
