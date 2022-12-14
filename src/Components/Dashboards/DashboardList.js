import React, { useContext, useEffect, useState } from 'react'
import { ErrorContext } from '../Providers/Error';
import BasicTable from '../Table';
import moment from 'moment';
import LaunchIcon from '@mui/icons-material/Launch';
import Button from '@mui/material/Button';
import Modal from '../Modal';
import { Dashboard } from './Dashboard';
import { Grid } from '@mui/material';
import {useDashboardQuery} from "../../hooks/useDashboardQuery";

const renderDashboardName = (row) => row.dashboard_name

const renderDashboardCreated = (row) => {
    return moment(row.created_at).fromNow()
}

const renderDashboardLink = (row) => {
    return (
        <Button
            variant="outlined"
            color='secondary'
            endIcon={<LaunchIcon />}
            onClick={(e) => window.open(row.url)}>
            Go to dashboard
        </Button>
    )
}


const DashboardFunctions = [renderDashboardName, renderDashboardCreated, renderDashboardLink]

const ColumnStyle = [{ width: '40%' }, { width: '25%' }, { width: '35%' }]


export function DashboardList() {

    const [openModal, setOpenModal] = useState(false)
    const [dashboards, setDashboards] = useState([])
    const [dashboardInfo, setDashboardInfo] = useState(null);

    let errorContext = useContext(ErrorContext);

    const DashboardHeads = [['Name', 'dashboard_name'], ['Created', 'created_at'], ['Link', 'url']]

    const rowOnClick = (dashboard) => {
        setDashboardInfo(dashboard);
        setOpenModal(true);
    }


    const handleClose = (e) => {
        setOpenModal(false);
        setDashboardInfo(null);
    }

    const getModalTitle = () => {
        if (dashboardInfo) {
            return (
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center">
                    <Grid item>
                        {dashboardInfo.name}
                    </Grid>

                </Grid>
            )
        }
    }

    const {data, isLoading, isError} = useDashboardQuery()

    useEffect(() => {
        if(data) {
            setDashboards(data)
        }
    }, [data])

    useEffect(() => {
        if(isError) {
            errorContext.addError()
        }
    }, [isError])


    return (
        <>
            <BasicTable
                rows={dashboards}
                title=''
                headlines={DashboardHeads}
                renderFunctions={DashboardFunctions}
                search={true}
                searchKey={(row) => row.dashboard_name}
                columnStyle={ColumnStyle}
                isLoading={isLoading}
                rowOnClick={rowOnClick}
            />
            <Modal
                title={getModalTitle()}
                open={openModal}
                handleClose={handleClose}
            >
                <Dashboard 
                initialState = {dashboardInfo && dashboardInfo.configuration.data.chart_groups}
                dashboardName = {dashboardInfo && dashboardInfo.dashboard_name}
                dashboardId = {dashboardInfo && dashboardInfo.id}
                onSubmit = {() => setIsLoading(true)}
                />
            </Modal>
        </>
    )
}