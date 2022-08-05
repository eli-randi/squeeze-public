import React, { useState } from 'react';

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
import { Grid, Skeleton, TableSortLabel } from '@mui/material';
import CustomizedInputBase from '../Components/SearchBar';
import { Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { visuallyHidden } from '@mui/utils';

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


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort, headlines } =
        props;
    const createSortHandler = (property) => (event) => {
        console.log(property)
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {Object.entries(headlines).map((headline) => {
                    return <TableCell
                        key={headline}
                        padding={'normal'}
                        align="left"
                        sortDirection={orderBy === headline[1][1] ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headline[1][1]}
                            direction={orderBy === headline[1][1] ? order : 'asc'}
                            onClick={createSortHandler(headline[1][1])}
                            IconComponent={	ArrowDownwardIcon }
                            hideSortIcon={false}
                            aria-hidden={false}
                        >
                            {headline[1][0]}
                            {orderBy === headline[1][1] ? (
                                <Box component="span" 
                                sx={visuallyHidden}
                                >
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                })}
            </TableRow>
        </TableHead>
    );
}


export default function BasicTable(props) {
    let rows = props.rows;
    let headlines = props.headlines;
    console.log(headlines)
    let searchIsTrue = props.search;
    let title = props.title;
    let renderFunctions = props.renderFunctions;


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(props.disablePagination ? -1 : 50);
    const [searched, setSearched] = useState('');
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(headlines[0][1]);

    const handleSearchInput = (e) => {
        setSearched(e.target.value);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    let searchedRows = rows;

    if (searched) {
        searchedRows = searchedRows.filter((row) => {
            return props.searchKey(row).toLowerCase().includes(searched.toLowerCase())

        })
    }

    let rowsToRender;

    if (rowsPerPage > 0) {
        rowsToRender = searchedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    } else {
        rowsToRender = searchedRows;
    }

    const renderLoading = () => {
        return [...Array(5)].map((i) =>

            <TableRow key={i}>
                <TableCell colSpan={headlines.length} px={3}>
                    <Skeleton animation="wave" sx={{ height: 40 }} />
                </TableCell>
            </TableRow>
        )
    }


    return (
        <Paper sx={{ width: '96%', overflow: 'hidden', mx: '2%', borderRadius: '20px' }}>
            <Grid
                sx={{
                    backgroundColor: 'secondary.main'
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
                    <Typography variant="h6" noWrap sx={{ textAlign: 'left', color: 'common.white' }}>
                        {title}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    {searchIsTrue ? <CustomizedInputBase handleSearchInput={handleSearchInput} /> : null}
                </Grid>
            </Grid>
            <TableContainer sx={{
                height: 380,
                '&::-webkit-scrollbar': {
                    width: '10px'
                },
                '&::-webkit-scrollbar-track': {
                    boxShadow: 'inset 0 0 6px rgba(120,0,0,0.00)',
                    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(55,50,52, 0.8)',
                    borderRadius: '5px'
                }
            }}>
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">

                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        headlines={headlines}
                    />

                    <TableBody>
                        {
                            props.isLoading && renderLoading()
                        }
                        {
                            !props.isLoading && rowsToRender.length === 0 &&
                            <TableRow>
                                <TableCell
                                    colSpan={headlines.length}
                                    rowSpan={3}
                                >
                                    <div>No results</div>
                                </TableCell>
                            </TableRow>
                        }
                        {
                            stableSort(rowsToRender, getComparator(order, orderBy))
                                .map(
                                    row => {
                                        let out = [];
                                        for (let i = 0; i < renderFunctions.length; i++) {
                                            out.push(
                                                <TableCell component="th" scope="row" sx={props.columnStyle && props.columnStyle[i]}>
                                                    {renderFunctions[i](row)}
                                                </TableCell>
                                            )
                                        }
                                        return (
                                            <TableRow
                                                hover
                                                onClick={() => props.rowOnClick && props.rowOnClick(row)}
                                                key={row.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                {out}
                                            </TableRow>
                                        )
                                    }
                            )
                        }

                    </TableBody>
                </Table>
            </TableContainer>
            {
                !props.disablePagination &&
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={searchedRows.length}
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
            }

        </Paper >
    );
}
