import { ClippedDrawer } from "../Components/ClippedDrawer";
import React, { useEffect, useState, useContext } from "react";
import { getConnectorsFromAPI, getWorkflowsFromAPI, deleteConnectorFromAPI } from '../util/API'
import BasicTable from "../Components/Table";
import GoogleAnalyticsLogo from './google-analytics-logo.png';
import InstagramLogo from './Instagram_logo.png';
import DefaultImage from './DefaultImage.png';
import GoogleAdsLogo from './GoogleAdsLogo.png';
import GoogleSheetsLogo from './GoogleSheetsLogo.png';
import LinkedinLogo from './LinkedIn_logo.png';
import TwitterLogo from './Twitter-logo.png';
import TikTokLogo from './TikTokLogo.png';
import { Grid } from "@mui/material";
import moment from "moment";
import { Chip } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import Modal from "../Components/Modal";
import { CircularProgress } from "@mui/material";
import AlertModal from "../Components/AlertModal";
import DeleteIcon from '@mui/icons-material/Delete';
import { ErrorContext } from "../Components/Error";

const ConnectorIcons = {
    google_analytics: GoogleAnalyticsLogo,
    instagram_business: InstagramLogo,
    google_ads: GoogleAdsLogo,
    linkedin: LinkedinLogo,
    google_sheets: GoogleSheetsLogo,
    twitter_organic: TwitterLogo,
    tiktok_organic: TikTokLogo,
    defaultImage: DefaultImage,
}

const ConnectorHeads = ['Connector Name', 'Type', 'Created', 'Status'];

const ColumnStyle = [{ width: '30%' }, { width: '30%' }, { width: '25%' }, { width: '15%' }]

const renderName = (row) => row.name;
const renderType = (row) => {
    return (
        <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="flex-start"
            alignItems="center">
            {ConnectorIcons ?
                <Grid item>
                    <img src={ConnectorIcons[row.type] || ConnectorIcons['defaultImage']}
                        style={{ width: 40 }} />
                </Grid> : null}
            <Grid item>
                {row.label}
            </Grid>
        </Grid>
    )
};

const renderCreated = (row) => {
    return moment(row.created_at).fromNow()
}

const renderActive = (row) => {
    return (
        row.active ?
            <Chip color="success" label='Active' icon={<CheckCircleOutlineIcon />} /> :
            <Chip color="warning" label='Inactive' icon={<PauseCircleOutlineIcon />} />
    )
}

const WorkflowStatusOptions = {
    Running: <CircularProgress color="success" />,
    Pending: <CircularProgress color="warning" />,
    Succeeded: <Chip color="success" label='Succeeded' />,
    Failed: <Chip color="warning" label='Failed' />,
    Error: <Chip color="error" label='Error' />
}

const ConnectorFunctions = [renderName, renderType, renderCreated, renderActive]

const WorkflowHeads = ['Status', 'Started', 'Finished', 'Duration'];

const renderWorkflowStatus = (workflow) => {
    return WorkflowStatusOptions[workflow.phase]
};
const renderWorkflowStarted = (workflow) => workflow.started_at;
const renderWorkflowFinished = (workflow) => workflow.finished_at;
const renderWorkflowDuration = (workflow) => workflow.estimated_duration;

const WorkflowFunctions = [renderWorkflowStatus, renderWorkflowStarted, renderWorkflowFinished, renderWorkflowDuration]

export function Connectors() {

    const errorContext = useContext(ErrorContext)
    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const [connectors, setConnectors] = useState([]);
    const [connectorInfo, setConnectorInfo] = useState(null);
    const [isLoadingConnectorInfo, setIsLoadingConnectorInfo] = useState(false);

    const rowOnClick = (connector) => {
        setIsLoadingConnectorInfo(true);
        let info = connector;
        setConnectorInfo(info);
        getWorkflowsFromAPI(connector.id, errorContext).then((resp) => {
            info.workflows = resp
            setConnectorInfo(info);
            setIsLoadingConnectorInfo(false);
        }
        )
        setOpenModal(true);
    }

    const handleClose = (e) => {
        setOpenModal(false);
        setConnectorInfo(null);
    }

    useEffect(() => {
        if(isLoading) {
            getConnectorsFromAPI(errorContext).then((resp) => {
                setConnectors(resp);
                setisLoading(false);
            })
        }
    }, [isLoading])

    const getModalTitle = () => {
        if (connectorInfo) {
            return (
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center">
                    <Grid item>
                        {connectorInfo.name}
                    </Grid>
                    {ConnectorIcons ?
                        <Grid item>
                            <img src={ConnectorIcons[connectorInfo.type] || ConnectorIcons['defaultImage']}
                                style={{ width: 40 }} />
                        </Grid> : null}
                </Grid>
            )
        }
    }

    const deleteConnectorFunction = () => {
        if (connectorInfo) {
            let id = connectorInfo.id;
            deleteConnectorFromAPI(id, errorContext).then((_) => {
                setisLoading(true);
                handleClose();
                
            }
            )

        }

    }

    const handleAlertModal = () => {
        return (
            <AlertModal
                deleteConnector={deleteConnectorFunction}
                alertButtonIcon={<DeleteIcon />}
                alertButtonText='Delete'
                alertTitle='Are you sure you want to delete this connector'
                alertText='Press Confirm to delete the connector'
                buttonColor='error'
            />
        )
    }



    return (
        <ClippedDrawer>
            <BasicTable
                rows={connectors}
                title='Connectors List'
                headlines={ConnectorHeads}
                renderFunctions={ConnectorFunctions}
                search={true}
                searchKey={(row) => row.name}
                columnStyle={ColumnStyle}
                isLoading={isLoading}
                rowOnClick={rowOnClick}
            />
            <Modal
                title={getModalTitle()}
                open={openModal}
                handleClose={handleClose}
                deleteFunction={handleAlertModal()}
            >
                <BasicTable
                    rows={(connectorInfo && connectorInfo.workflows) || []}
                    title='Recent Workflows'
                    headlines={WorkflowHeads}
                    search={false}
                    isLoading={isLoadingConnectorInfo}
                    renderFunctions={WorkflowFunctions}
                    disablePagination={true}
                />
            </Modal>
        </ClippedDrawer>

    )
}

