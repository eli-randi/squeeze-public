import { ClippedDrawer } from "../Components/ClippedDrawer";
import React, { useState, useEffect, useContext } from "react";
import { getCredentialsFromAPI } from "../util/API";
import BasicTable from "../Components/Table";
import LinkedinLogo from '../Connectors/LinkedIn_logo.png';
import TwitterLogo from '../Connectors/Twitter-logo.png'
import GoogleLogo from './GoogleLogo.png';
import FacebookLogo from './FacebookLogo.png';
import ShopifyLogo from './ShopifyLogo.png';
import KlaviyoLogo from './KlaviyoLogo.svg';
import PinterestLogo from './Pinterest-logo.png';
import DefaultImage from '../Connectors/DefaultImage.png';
import { Grid } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton } from "@mui/material";
import ErrorContext from '../Components/Error'



const CredentialHeads = ['Description', 'Connector Type', 'Refresh']

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
                            style={{ width: 40 }} />
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
                    onClick={(e) => window.open(row.refresh_url, "MsgWindow", "width=500,height=500")}
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
}, [])


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