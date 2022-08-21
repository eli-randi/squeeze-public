import {fetchCredentials} from "../util/API";
import {useQuery} from "@tanstack/react-query";

export const useCredentialQuery = () => {
  return useQuery(['credentials'], fetchCredentials);
};
