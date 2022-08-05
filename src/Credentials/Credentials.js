import { ClippedDrawer } from "../Components/ClippedDrawer";
import React, { useState, useEffect, useContext } from "react";
import { API_HOST, getCredentialsFromAPI } from "../util/API";
import BasicTable from "../Components/Table";
import LinkedinLogo from '../assets/LinkedIn_logo.png';
import TwitterLogo from '../assets/Twitter-logo.png'
import GoogleLogo from '../assets/GoogleLogo.png';
import FacebookLogo from '../assets/FacebookLogo.png';
import ShopifyLogo from '../assets/ShopifyLogo.png';
import KlaviyoLogo from '../assets/KlaviyoLogo.svg';
import PinterestLogo from '../assets/Pinterest-logo.png';
import DefaultImage from '../assets/DefaultImage.png';
import { Grid } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton } from "@mui/material";
import ErrorContext from '../Components/Error'
import { openCredentialWindow } from "../util/Utils";


const CredentialHeads = [['Description', 'description'], ['Connector Type', 'type'], ['Refresh', 'can_refresh']]

const CredentialIcons = {
    Google: GoogleLogo,
    Facebook: FacebookLogo,
    Shopify: ShopifyLogo,
    Klaviyo: KlaviyoLogo,
    Pinterest: PinterestLogo,
    LinkedIn: LinkedinLogo,
    Twitter: TwitterLogo,
    defaultImage: DefaultImage,
}

const ColumnStyle = [{ width: '50%' }, { width: '35%' }, { width: '15%' }]

export function Credentials() {
    const errorContext = useContext(ErrorContext)
    const [isLoading, setIsLoading] = useState(true);

    const renderDescription = (row) => row.description;
    const renderType = (row) => {
        return (
            <Grid
                container
                spacing={2}
                direction="row"
                justifyContent="flex-start"
                alignItems="center">
                {CredentialIcons ?
                    <Grid item>
                        <img src={CredentialIcons[row.type] || CredentialIcons['defaultImage']}
                            style={{ width: 40 }}
                            alt='Social Media Logo' />
                    </Grid> : null}
                <Grid item>
                    {row.type}
                </Grid>
            </Grid>
        )
    };

    const renderRefresh = (row) => {
        return (
            row.can_refresh ?
                <IconButton
                    aria-label="refresh"
                    onClick={(e) => openCredentialWindow(API_HOST + row.refresh_url)}
                >
                            <RefreshIcon />
                </IconButton > :
    null
        )
}

const CredentialFunctions = [renderDescription, renderType, renderRefresh]

const [credentials, setCredentials] = useState([])

useEffect(() => {
    getCredentialsFromAPI(errorContext).then((resp) => {
        setCredentials(resp);
        setIsLoading(false);
    })
}, [errorContext])


return (
    <ClippedDrawer>
        <BasicTable
            rows={credentials}
            title='Credentials List'
            headlines={CredentialHeads}
            icons={CredentialIcons}
            renderFunctions={CredentialFunctions}
            search={true}
            searchKey={(row) => row.description}
            columnStyle={ColumnStyle}
            isLoading={isLoading}
        />
    </ClippedDrawer>



)
}