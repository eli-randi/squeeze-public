import React, { useContext, useEffect } from "react";
import {APIMeta} from '../util/API';
import {useLocation, Navigate} from 'react-router-dom';
import Loader from "./Loader";
import { ErrorContext } from "./Error";


export const AuthContext = React.createContext(null);

export function AuthProvider(props) {
  let [isLoggedIn, setIsLoggedIn] = React.useState(null);

  const error = useContext(ErrorContext);
  const refreshLoginFromServer = () => setIsLoggedIn(null);

  useEffect(
      () => {
        const APICall = async () => {
            let meta = await APIMeta(error)
            setIsLoggedIn(meta.is_authenticated)
        }

        if (isLoggedIn == null) {
            APICall()
        }
    }, [isLoggedIn])

  return <AuthContext.Provider value={{isLoggedIn, refreshLoginFromServer}}>{props.children}</AuthContext.Provider>;
}

export function RequireAuth(props) {
    let auth = useContext(AuthContext);
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