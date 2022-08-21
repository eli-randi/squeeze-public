import {fetchWorkflows} from "../util/API";
import {useQuery} from "@tanstack/react-query";

export const useWorkflowQuery = (connectorId: number|null) => {
  return useQuery(
      ['workflows', connectorId],
      () => fetchWorkflows(connectorId),
      {
        enabled: !!connectorId
      }
  );
};
