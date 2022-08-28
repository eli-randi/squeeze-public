import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ErrorContext } from "./Error";
import {useConnectorQuery} from "../../hooks/useConnectorQuery";
import Loader from "Components/Loader";

export const RequireConnectors : React.FC<{children: JSX.Element}> = ({children}) => {
    let errorContext = useContext(ErrorContext);
    const [connectors, setConnectors] = useState<null | string[]>(null)
    const {data, isError} = useConnectorQuery()

    useEffect(() => {
        if(data) {
            setConnectors(data)
        }
    }, [data]);

    useEffect(() => {
        if(isError && errorContext) {
            // @ts-ignore
            errorContext.addError()
        }
    }, [isError]);

    if (!connectors) {
      return <Loader />
    }

    if (connectors && connectors.length === 0) {
        return (
          <Navigate to='/new_customer_flow' replace />
        )
    }

    return children;
  }