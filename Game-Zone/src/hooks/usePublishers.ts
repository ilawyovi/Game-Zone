import useData from "./useData";
import type { Publisher } from "../types/publisher";

const usePublishers = () =>
  useData<Publisher>("/publishers", {
    params: {
      page_size: 40,
      ordering: "name",
    },
  });

export default usePublishers;