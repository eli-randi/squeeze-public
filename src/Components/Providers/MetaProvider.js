import React, { useContext, useEffect, useState } from "react";
import { getMetaFromAPI } from '../../util/API';
import { ErrorContext } from "./Error";

export const MetaContext = React.createContext(null);

export function MetaProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [maximumDashboards, setMaximumDashboards] = useState(null);
  const [fullMeta, setFullMeta] = useState(null);

  const error = useContext(ErrorContext);
  const refreshLoginFromServer = () => setIsLoggedIn(null);


  useEffect(
    () => {
      const APICall = async () => {
        let meta = await getMetaFromAPI(error);
        setIsLoggedIn(meta.is_authenticated);
        setMaximumDashboards(meta.dashboards.maximum_tabs);
        setFullMeta(meta);
      };
      if (isLoggedIn == null) {
        APICall();
      }
    }, [isLoggedIn]);

  return (
    <MetaContext.Provider
      value={{
        isLoggedIn,
        refreshLoginFromServer,
        maximumDashboards,
        fullMeta
      }}>
      {props.children}
    </MetaContext.Provider>
  );
}
