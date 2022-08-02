import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import moment from 'moment';
import { Grid } from '@mui/material';
import CustomizedInputBase from '../Components/SearchBar';
import { Typography } from '@mui/material';
import GoogleAnalyticsLogo from './google-analytics-logo.png';
import InstagramLogo from './Instagram_logo.png';
import DefaultImage from './DefaultImage.png';
import GoogleAdsLogo from './GoogleAdsLogo.png';
import GoogleSheetsLogo from './GoogleSheetsLogo.png';
import LinkedinLogo from './LinkedIn_logo.png';
import TwitterLogo from './Twitter-logo.png';
import TikTokLogo from './TikTokLogo.png'
import { Chip } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';


function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const ConnectorIcons = {
        google_analytics: GoogleAnalyticsLogo,
        instagram_business: InstagramLogo,
        google_ads: GoogleAdsLogo,
        linkedin: LinkedinLogo,
        google_sheets: GoogleSheetsLogo,
        twitter_organic: TwitterLogo,
        tiktok_organic: TikTokLogo,
        

}

export default function ConnectorsTable(props) {
    let connectors = props.connectors;

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searched, setSearched] = useState('')
    
    const handleSearchInput = (e) => {
        setSearched(e.target.value);
    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    let searchedConnectors = connectors;

    if(searched) {
        searchedConnectors = searchedConnectors.filter((connector) => {
            return connector.name.includes(searched)

        })
    }

    let connectorsToRender;

    if (rowsPerPage > 0) {
        connectorsToRender = searchedConnectors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    } else {
        connectorsToRender = searchedConnectors;
    }

    const emptyRows = 0;
    // page > 0 ? Math.max(0, (1 + page) * rowsPerPage - searchedConnectors.length) : 0;

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Grid 
            sx = {{
                backgroundColor: 'primary.dark'
            }}
            spacing={2}
            pl={5}
            pr={2}
            py={1.5}
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center">
                <Grid item xs={6}
                >
                    <Typography variant="h6" noWrap sx={{textAlign: 'left', color: 'white'}}>
                        Connectors List
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <CustomizedInputBase handleSearchInput = {handleSearchInput}/>
                </Grid>
            </Grid>
            
            <TableContainer sx={{ height: 440 }}>
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">

                    <TableHead>
                        <TableRow>
                            <TableCell>Connector Name</TableCell>
                            <TableCell align="left">Type</TableCell>
                            <TableCell align="left">Created</TableCell>
                            <TableCell align="left">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {connectorsToRender.map((connector) => (
                            <TableRow
                                hover
                                key={connector.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ width: '30%' }}>
                                    {connector.name}
                                </TableCell>
                                <TableCell sx={{ width: '30%' }} align="left">
                                    <Grid 
                                    container
                                    spacing={2}
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center">
                                        <Grid item>
                                           <img src={ConnectorIcons[connector.type] || DefaultImage} 
                                           style={{width: 40}}
                                           alt='Social Media Icon'/>
                                        </Grid>
                                        <Grid item>
                                            {connector.label}
                                        </Grid>
                                    </Grid>
                                    
                                    
                                    </TableCell>
                                <TableCell sx={{ width: '25%' }} align="left">{moment(connector.created_at).fromNow()}</TableCell>
                                <TableCell sx={{ width: '15%' }} align="left">
                                    {connector.active ? 
                                        <Chip color="success" label='Active' icon={<CheckCircleOutlineIcon />} /> :
                                        <Chip color="warning" label='Inactive' icon={<PauseCircleOutlineIcon />} />}
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                colSpan={3}
                count={searchedConnectors.length}
                rowsPerPage={rowsPerPage}
                page={page}
                component='div'
                SelectProps={{
                    inputProps: {
                        'aria-label': 'rows per page',
                    },
                    native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            />
        </Paper>
    );
}
