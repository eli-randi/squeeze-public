import React, { useContext, useEffect, useState } from 'react'
import { ClippedDrawer } from '../Components/ClippedDrawer'
import { ErrorContext } from '../Components/Error';
import { getDashboardsFromAPI } from '../util/API';
import BasicTable from '../Components/Table';
import moment from 'moment';
import LaunchIcon from '@mui/icons-material/Launch';
import Button from '@mui/material/Button';

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

const ColumnStyle = [{ width: '40%' }, { width: '25%' }, {width: '35%'} ]


export function Dashboards () {

    const [dashboards, setDashboards] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    let errorContext = useContext(ErrorContext);

    const DashboardHeads = ['Name', 'Created', 'Link']

    useEffect(() => {
        if(isLoading) {
            getDashboardsFromAPI(errorContext).then((resp) => {
                setDashboards(resp);
                setIsLoading(false);
            })
        }
    }, [isLoading])


    return (
        <ClippedDrawer>
                <BasicTable
                rows={dashboards}
                title='Dashboards'
                headlines={DashboardHeads}
                renderFunctions={DashboardFunctions}
                search={true}
                searchKey={(row) => row.dashboard_name}
                columnStyle={ColumnStyle}
                isLoading={isLoading}
                 />
        </ClippedDrawer>
    )
}