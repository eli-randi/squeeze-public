import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ErrorContext } from "./Error";
import { useConnectorQuery } from "../../hooks/useConnectorQuery";
import Loader from "Components/Loader";

export const RequireConnectors: React.FC<{ children: JSX.Element }> = ({ children }) => {
  let errorContext = useContext(ErrorContext);
  const { data, isError } = useConnectorQuery()

  useEffect(() => {
    if (isError && errorContext) {
      // @ts-ignore
      errorContext.addError()
    }
  }, [isError]);

  if (!data) {
    console.log('loading')
    return <Loader />
  }

  if (data && data.length === 0) {
    console.log('navigate')
    return (
      <Navigate to='/new_customer_flow' replace />
    )
  }

  return children;
}