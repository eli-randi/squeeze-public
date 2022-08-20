import { useQuery } from '@tanstack/react-query';
import { fetchConnectors } from 'util/API';

export const useConnectorQuery = () => {
  return useQuery(['connectors'], fetchConnectors);
};
