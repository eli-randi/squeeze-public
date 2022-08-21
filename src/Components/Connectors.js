import React, { useEffect, useState, useContext } from "react";
import {
  getWorkflowsFromAPI,
  deleteConnectorFromAPI,
} from "../util/API";
import BasicTable from "./Table";
import { Grid } from "@mui/material";
import moment from "moment";
import { Chip } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import Modal from "./Modal";
import { CircularProgress } from "@mui/material";
import AlertModal from "./AlertModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { ErrorContext } from "./Providers/Error";
import { getConnectorIcon } from "../util/ConnectorIcons";
import MouseOverPopover from "Components/MouseOverPopover/MouseOverPopover";
import { formatTime } from "../util/Utils";
import { useConnectorQuery } from "hooks/useConnectorQuery";

const ConnectorHeads = [
  ["Connector Name", "name"],
  ["Type", "type"],
  ["Created", "created_at"],
  ["Status", "active"],
];

const ColumnStyle = [
  { width: "30%" },
  { width: "30%" },
  { width: "25%" },
  { width: "15%" },
];

const renderName = (row) => row.name;
const renderType = (row) => {
  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Grid item>
        <img
          src={getConnectorIcon(row.type)}
          style={{ width: 40 }}
          alt="Social Media Logo"
        />
      </Grid>
      <Grid item>{row.label}</Grid>
    </Grid>
  );
};

const renderCreated = (row) => {
  return moment(row.created_at).fromNow();
};

const renderActive = (row) => {
  return row.active ? (
    <Chip color="success" label="Active" icon={<CheckCircleOutlineIcon />} />
  ) : (
    <Chip color="warning" label="Inactive" icon={<PauseCircleOutlineIcon />} />
  );
};

const WorkflowStatusOptions = {
  Running: <CircularProgress color="success" />,
  Pending: <CircularProgress color="warning" />,
  Succeeded: <Chip color="success" label="Succeeded" />,
  Failed: <Chip color="warning" label="Failed" />,
  Error: <Chip color="error" label="Error" />,
};

const ConnectorFunctions = [
  renderName,
  renderType,
  renderCreated,
  renderActive,
];

const WorkflowHeads = [
  ["Status", "phase"],
  ["Started", "started_at"],
  ["Finished", "finished_at"],
  ["Estimated Duration", "estimated_duration"],
];

const renderWorkflowStatus = (workflow) => {
  return WorkflowStatusOptions[workflow.phase];
};
const renderWorkflowStarted = (workflow) => (
  <MouseOverPopover
    mainText={moment(workflow.started_at).fromNow()}
    popoverText={formatTime(workflow.started_at)}
  />
);
const renderWorkflowFinished = (workflow) => (
  <MouseOverPopover
    mainText={moment(workflow.finished_at).from(workflow.started_at)}
    popoverText={formatTime(workflow.finished_at)}
  />
);

const renderWorkflowDuration = (workflow) => workflow.estimated_duration;

const WorkflowFunctions = [
  renderWorkflowStatus,
  renderWorkflowStarted,
  renderWorkflowFinished,
  renderWorkflowDuration,
];

export function Connectors(props) {
  const credentialInfo = props.credentialInfo ? props.credentialInfo : null;
  const errorContext = useContext(ErrorContext);
  const [openModal, setOpenModal] = useState(false);
  const [connectors, setConnectors] = useState([]);
  const [connectorInfo, setConnectorInfo] = useState(null);
  const [isLoadingConnectorInfo, setIsLoadingConnectorInfo] = useState(false);

  const rowOnClick = (connector) => {
    setIsLoadingConnectorInfo(true);
    let info = connector;
    getWorkflowsFromAPI(connector.id, errorContext).then((resp) => {
      info.workflows = resp;
      setConnectorInfo(info);
      setIsLoadingConnectorInfo(false);
    });
    setOpenModal(true);
  };

  const handleClose = (e) => {
    setOpenModal(false);
    setConnectorInfo(null);
  };

  const { data, isLoading, isError } = useConnectorQuery();

  useEffect(() => {
    if (isError) {
      errorContext.addError()
    }
  }, [isError]);

  useEffect(() => {
    if (data) {
      if (credentialInfo) {
        const response = data.filter((connector) => connector.credential_id === credentialInfo.id);
        setConnectors(response);
      } else {
        setConnectors(data);
      }
    }
  }, [data]);

  const getModalTitle = () => {
    if (connectorInfo) {
      return (
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>{connectorInfo.name}</Grid>
          <Grid item>
            <img
              src={getConnectorIcon(connectorInfo.type)}
              style={{ width: 40 }}
              alt="Social Media Logo"
            />
          </Grid>
        </Grid>
      );
    }
  };

  const deleteConnectorFunction = () => {
    if (connectorInfo) {
      let id = connectorInfo.id;
      deleteConnectorFromAPI(id, errorContext).then((_) => {
        setisLoading(true);
        handleClose();
      });
    }
  };

  const handleAlertModal = () => {
    return (
      <AlertModal
        deleteConnector={deleteConnectorFunction}
        alertButtonIcon={<DeleteIcon />}
        alertButtonText="Delete"
        alertTitle="Are you sure you want to delete this connector"
        alertText="Press Confirm to delete the connector"
        buttonColor="error"
      />
    );
  };

  return (
    <>
      <BasicTable
        rows={connectors}
        title={credentialInfo ? "Connectors List" : ""}
        headlines={ConnectorHeads}
        renderFunctions={ConnectorFunctions}
        search={true}
        searchKey={(row) => row.name}
        columnStyle={ColumnStyle}
        isLoading={isLoading}
        rowOnClick={credentialInfo ? null : rowOnClick}
      />
      <Modal
        title={getModalTitle()}
        open={openModal}
        handleClose={handleClose}
        deleteFunction={handleAlertModal()}
      >
        <BasicTable
          rows={(connectorInfo && connectorInfo.workflows) || []}
          title="Recent Workflows"
          headlines={WorkflowHeads}
          search={false}
          isLoading={isLoadingConnectorInfo}
          renderFunctions={WorkflowFunctions}
          disablePagination={true}
        />
      </Modal>
    </>
  );
}
