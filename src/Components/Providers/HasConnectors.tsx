import React, { useContext, useEffect, useState, useRef } from "react";
import { getConnectorsFromAPI } from "../../util/API";
import { Navigate } from "react-router-dom";
import { ErrorContext } from "./Error";

export const RequireConnectors : React.FC<{children: JSX.Element}> = ({children}) => {
    let errorContext = useContext(ErrorContext);
    const [connectors, setConnectors] = useState<null | string[]>(null)

    useEffect(() => {
      const getConnectors = async () => {
        let connectorsResp = await getConnectorsFromAPI(errorContext);
        setConnectors(connectorsResp)
      };
      if (!connectors || connectors.length === 0) {
        getConnectors();
      }
    }, [])


    if (connectors && connectors.length === 0) {
        return (
          <Navigate to='/new_customer_flow' replace />
        )
    }

    return children;
  }