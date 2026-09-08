import useData from "./useData";
import type { Developer } from "../types/developer";

const useDevelopers = () =>
  useData<Developer>("/developers", {
    params: {
      page_size: 40,
      ordering: "name",
    },
  });

export default useDevelopers;