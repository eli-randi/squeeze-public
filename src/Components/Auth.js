import React, { useContext, useEffect, useState } from "react";
import {getMetaFromAPI} from '../util/API';
import {useLocation, Navigate} from 'react-router-dom';
import Loader from "./Loader";
import { ErrorContext } from "./Error";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";


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

  return <MetaContext.Provider value={{isLoggedIn, refreshLoginFromServer, maximumDashboards, fullMeta}}>{props.children}</MetaContext.Provider>;
  
}

export function RequireAuth(props) {
    let auth = useContext(MetaContext);
    let location = useLocation();
  
    if (auth.isLoggedIn == null) {
        return <Loader/>
    }
    if (!auth.isLoggedIn) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  
    return props.children;
  }