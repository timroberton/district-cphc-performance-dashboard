import { createResource } from "solid-js";
import { Csv } from "@timroberton/panther";

export type Data = {
  csv: Csv<string>;
};

export const [data] = createResource<Data>(fetchData);

async function fetchData(): Promise<Data> {
  const str = await fetchCsvStr("data/pmf_data.csv");
  const csv = Csv.fromString(str, { rowHeaders: "none" }).withColAsRowHeaders(
    2,
  );
  return {
    csv,
  };
}

async function fetchCsvStr(url: string): Promise<string> {
  const res = await fetch(url, {
    method: "get",
    headers: {
      "content-type": "text/csv;charset=UTF-8",
    },
  });
  return res.text();
}
