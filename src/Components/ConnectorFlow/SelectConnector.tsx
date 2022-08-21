import { useNavigate } from "react-router-dom"
import React, { useContext, useEffect, useRef, useState } from "react";
import GlobalStyles from '@mui/material/GlobalStyles';
import { Button } from "@mui/material";
import Lottie from "lottie-react";

import DashboardLottie from '../../assets/DashboardLottie.json';
import { LoadingAnimation } from "./LoadingAnimation";
import Loader from "Components/Loader";
import CreateConnectorStepper from "Components/ConnectorFlow/CreateConnectorStepper";
import { ErrorContext } from "Components/Providers/Error";
import { APIPost } from "util/API";
import { GenericField } from "./Fields/GenericField";
import {ConnectorConfig, GenericConnectorField, GenericConnectorFormData, GenericConnectorWidget} from "../../types";
import { ConnectorDetails } from "./StepPages/ConnectorDetails";
import { ConnectorTypeSelect } from "./StepPages/ConnectorTypeSelect";
import { CredentialsSelect } from "./StepPages/CredentialsSelect";
import { MetaContext } from '../Providers/MetaProvider'

import './SelectConnector.css'
import { useConnectorQuery } from "hooks/useConnectorQuery";

const inputGlobalStyles = <GlobalStyles styles={{ '& .MuiInputBase-root': { backgroundColor: 'white', textAlign: 'left' } }} />

const doesHaveCredentialStep = (config: null | any) => {
  if (config) {
    return config.fields.hasOwnProperty('credential_id')
  } else return null;
}

const DashboardTypes = {
  google_analytics: '',
  instagram_business: '',
  google_ads: '',
  linkedin: '',
  google_sheets: '',
  twitter_organic: '',
  tiktok_organic: '',
  facebook_ads: '',
  shopify: '',
  youtube: '',
  klaviyo: '',
  s3: '',
  pinterest: '',
  outbrain_amplify: '',
  amplitude: ''
}

const getDashboardTypeFromConnectorType : (connectorType: string) => any = (connectorType) => {
  //@ts-ignore
  return DashboardTypes[connectorType];
}


export const SelectConnector = () => {
  const meta: any = useContext(MetaContext);
  const errorContext = useContext(ErrorContext)
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [connectorType, setConnectorType] = useState<null | string>(null);
  const connectorConfig = useRef<null | any>(null);
  //test purposes
  // const useMe = true;
  const [isPendingSubmit, setIsPendingSubmit] = useState(true);
  const connectorQuery = useConnectorQuery()

  useEffect(() => {
    if(connectorQuery.isError) {
      // @ts-ignore
      errorContext.addError()
    }
  }, [connectorQuery.isError])


  const incrementStep = () => {
    setStep(prevStep => prevStep + 1)
  }

  const decrementStep = () => {
    setStep(prevStep => prevStep - 1)
    if (!doesHaveCredentialStep(connectorConfig.current)) {
      setStep(prevStep => prevStep - 1)
    }
  }

  const onBackClick = () => {
    if(doesHaveCredentialStep(connectorConfig.current)) {
      const setField = setFieldGenerator('credential_id');
      setField('');
    }
    decrementStep();
  }

  const selectConnectorType = (connectorType: string) => {
    // @ts-ignore
    connectorConfig.current = meta.fullMeta.connectors.find(connector => connector.name === connectorType)
    setConnectorType(connectorType)
    incrementStep()
    if (!doesHaveCredentialStep(connectorConfig.current)) {
      incrementStep();
    }
  }

  // Fields setter
  const fields = connectorConfig.current ? connectorConfig.current.fields : {};
  const widgets: GenericConnectorWidget[] = connectorConfig.current && connectorConfig.current.extra_widgets
    ? connectorConfig.current.extra_widgets
    : [];

  const fieldNames = Object.keys(fields);
  let initialFormData: GenericConnectorFormData = {};

  fieldNames.forEach((fieldName) => (initialFormData[fieldName] = ""));
  const [formData, setFormData] = useState(initialFormData);

  function setFieldGenerator(fieldName: string) {
    const _setField = (value: string | number) => {
      let formDataCopy = Object.assign({}, formData);
      formDataCopy[fieldName] = value;
      setFormData(formDataCopy);
    };
    return _setField;
  }

  const fieldsToRender = Object.keys(fields).map((fieldName) => {
    if (fieldName === 'credential_id') {
      return null;
    }

    return (
      <GenericField
        fieldName={fieldName}
        field={fields[fieldName]}
        setField={setFieldGenerator(fieldName)}
        formData={formData}
        widgets={widgets}
      />
    )
  });

  // Submit functionality
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const submitUrl = connectorConfig.current.submit_url;
    APIPost(submitUrl, formData, errorContext).then(() => navigate('/home'))

  }

  // HANDLE DASHBOARD SUBMIT
  const handleDashboardSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const submitUrl = connectorConfig.current.submit_url;

    setIsPendingSubmit(true);

    APIPost(submitUrl, formData, errorContext).then((resp) => {
      const body = {
        data: {
          dashboard_name: `My first ${connectorConfig.current.label} dashboard`,
          chart_groups: [
            {
              info: {
                //what response is coming back
                connector_id: 1,
                currency: "GBP",
                conversion_action_types: "",
              },
              type: getDashboardTypeFromConnectorType(connectorConfig.current.name) 
            }
          ]
        }
      }

      APIPost('/reporting/create_dashboard', body, errorContext).then((resp) => {
        setIsPendingSubmit(false);
        //what id data is coming back? do you want to replace window or open new one
        // window.open(`https://dashboards.thisissqueeze.com/superset/dashboard/${resp.id}`)
      })
    }
    );

  }

  //loading state
  // if(useMe) {
  //   return (
  //     <>
  //     <button onClick={() => setIsPendingSubmit(!isPendingSubmit)}>click</button>
  //     <LoadingAnimation isLoading = {isPendingSubmit}/>
  //     </>
  //   )
  // }


  // Loading State
  if (connectorQuery.isLoading) {
    return <Loader />
  }

  // Reached Limit State
  if (connectorQuery.data && connectorQuery.data.length >= meta.maxConnectors) {
    return (
      <div className="LimitConnectorPage">
        <h2>Sorry, you've reached your connector limit</h2>
        <p>If you'd like to add more dashboards to your account</p>
        <a href='mailto:hello@thisissqueeze.com'><Button variant='contained'>Contact us</Button></a>
        <Lottie style={{ height: 300 }} animationData={DashboardLottie} loop={true} />
      </div>
    )
  }

  // Page steps 
  let currentStepComponent;

  if (step === 0) {
    currentStepComponent = (
      <ConnectorTypeSelect
        selectConnectorType={selectConnectorType}
      />
    )
  } else if (step === 1) {
    const credentialField = fields['credential_id']
    currentStepComponent = (credentialField &&
      <CredentialsSelect
        fieldName={'credential_id'}
        field={credentialField}
        setField={setFieldGenerator('credential_id')}
        formData={formData}
        widgets={widgets}
        incrementStep={incrementStep}
        decrementStep={decrementStep}
      />
    )

  } else if (step === 2) {
    currentStepComponent = <ConnectorDetails
      connectorTypeLabel={connectorConfig.current.label}
      fieldsToRender={fieldsToRender}
      onSubmit={handleSubmit}
      onBackClick={onBackClick}
    />
  }


  return (
    <div className='CreateConnectorPage'>
      {inputGlobalStyles}
      <>
        <CreateConnectorStepper step={step} />
        {currentStepComponent}
      </>
    </div>

  )
}
