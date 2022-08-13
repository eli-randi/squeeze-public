import React, { useContext, useEffect, useState } from "react";
import {getMetaFromAPI, OAUTH_HOST} from '../util/API';
import Loader from "./Loader";
import { ErrorContext } from "./Error";


export const MetaContext = React.createContext(null);

export function MetaProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [maximumDashboards, setMaximumDashboards] = useState(null)
  const [fullMeta, setFullMeta] = useState(null)

  const error = useContext(ErrorContext);
  const refreshLoginFromServer = () => setIsLoggedIn(null);
  

  useEffect(
      () => {
        const APICall = async () => {
            let meta = await getMetaFromAPI(error)
            setIsLoggedIn(meta.is_authenticated)
            setMaximumDashboards(meta.dashboards.maximum_tabs)
            setFullMeta(meta)
        }
        if (isLoggedIn == null) {
            APICall()
        }
    }, [isLoggedIn])

  return (
      <MetaContext.Provider
          value={
          {
              isLoggedIn,
              refreshLoginFromServer,
              maximumDashboards,
              fullMeta
          }
      }>
          {props.children}
      </MetaContext.Provider>
  );
  
}

export function RequireAuth(props) {
    let auth = useContext(MetaContext);


    if (auth.isLoggedIn == null) {
        return <Loader/>
    }
    if (!auth.isLoggedIn) {
        return window.location.href = OAUTH_HOST + auth.fullMeta.login_url
    }


    return props.children;
  }