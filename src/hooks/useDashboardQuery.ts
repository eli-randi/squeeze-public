import {fetchDashboards} from "../util/API";
import {useQuery} from "@tanstack/react-query";

export const useDashboardQuery = () => {
  return useQuery(['dashboards'], fetchDashboards);
};
