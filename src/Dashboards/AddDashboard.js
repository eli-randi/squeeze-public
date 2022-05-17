import React, { useContext, useEffect, useState } from 'react'
import { ClippedDrawer } from '../Components/ClippedDrawer'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Autocomplete, Button, FormControl, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { Paper } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { getConnectorsFromAPI } from '../util/API'
import ErrorContext from '../Components/Error';
import { APIPost } from '../util/API';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop } from '@mui/material';
import { MetaContext } from '../Components/Auth';
import {prettifySnakeCase} from '../util/Utils'



export function AddDashboard() {

    const [dashboardName, setDashboardName] = useState('');
    const [tabFormField, setTabFormField] = useState([{ type: '', info: { connector_id: '' } }]);

    const [connectors, setConnectors] = useState(null);
    const [isPendingSubmit, setIsPendingSubmit] = useState(false);
    let tabNumber;

    let navigate = useNavigate();

    let errorContext = useContext(ErrorContext)
    let meta = useContext(MetaContext)

    let typeConfig = meta.fullMeta.dashboards.type_config;

    useEffect(() => {
        getConnectorsFromAPI(errorContext).then((resp) => {
            setConnectors(resp);
        })
    }, [])

    const handleTabTypeChange = (event, index) => {
        let data = [...tabFormField];
        let type = event.target.value;
        data[index][event.target.name] = type;
        let fieldsToAdd = typeConfig[type].map((field) => {
            return field.name;
        })
        // Add any fields needing adding
        let currentFields = Object.keys(data[index].info)
        fieldsToAdd.forEach(
            (fieldToAdd) => {
                if (!currentFields.includes(fieldToAdd)) {
                    data[index].info[fieldToAdd] = '';
                }
            }
        )

        // Remove any fields no longer needed
        currentFields.forEach(
            (currentField) => {
                if (!fieldsToAdd.includes(currentField) && currentField != 'connector_id') {
                    delete data[index].info[currentField]
                }
            }
        )
        setTabFormField(data);
        
    }

    const handleInfoChange = (event, index, key, isMultiple) => {
        let data = [...tabFormField];
        if (isMultiple) {
            data[index].info[key] = event.target.value.replace(' ', '').split(',')
        } else {
            data[index].info[key] = event.target.value;
        }
        
        setTabFormField(data);
    }


    const addTab = () => {
        let object = {
            type: '',
            info: { connector_id: '' }
        }
        setTabFormField([...tabFormField, object])
    }

    const removeTab = (index) => {
        let data = [...tabFormField];
        data.splice(index, 1)
        setTabFormField(data)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsPendingSubmit(true);

        const body = {
            data: {
                dashboard_name: dashboardName,
                chart_groups: tabFormField
            }
        }
        console.log(body)
        APIPost('/reporting/create_dashboard', body, errorContext).then((resp) => {
            console.log(resp)
            setIsPendingSubmit(false);
            navigate('/dashboards');
        })
    }


    return (
        <>
            <ClippedDrawer>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                        justifyContent="center"
                        alignItems="center">
                        <Grid item xs={12}
                        >
                            <Typography variant="h6" noWrap sx={{ textAlign: 'left', color: 'common.white' }}>
                                Add dashboard
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box
                        component="form"
                        py={3}
                        px={3}
                        onSubmit={handleSubmit}
                    >

                        <Grid
                            container
                            direction='column'
                            spacing={5}
                        >
                            <Grid
                                item
                            // name item
                            >
                                <TextField
                                    required
                                    id="dashboard-name"
                                    fullWidth
                                    label="Dashboard Name"
                                    placeholder='Dashboard name'
                                    onChange={(e) => setDashboardName(e.target.value)}
                                />
                            </Grid>
                            {tabFormField.map((form, index) => {
                                tabNumber = index + 1;
                                return (
                                    <Grid
                                        item
                                    >
                                        <Grid
                                            container
                                            direction='column'
                                            spacing={3}
                                        >
                                            <Grid
                                                item
                                            >
                                                <Grid
                                                    container
                                                    direction='row'
                                                    justifyContent={'space-between'}
                                                >
                                                    <Grid
                                                        item
                                                    >
                                                        <Typography>
                                                            Tab #{index + 1}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                    >
                                                        {index == 0 ? null : <Button color='error' onClick={() => removeTab(index)}>Remove</Button>}

                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid
                                                item
                                            >
                                                <TextField
                                                    name='type'
                                                    select
                                                    required
                                                    label="Tab Type"
                                                    id="type-select"
                                                    fullWidth
                                                    value={form.type}
                                                    onChange={(event) => handleTabTypeChange(event, index)}
                                                >
                                                    {
                                                        typeConfig && Object.keys(typeConfig).map((type) => {
                                                            return (
                                                                <MenuItem value={type}>{prettifySnakeCase(type)}</MenuItem>
                                                            )
                                                        })
                                                    }
                                                </TextField>


                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    select
                                                    required
                                                    label="Connector"
                                                    id="connector-select"
                                                    fullWidth
                                                    value={form.info.connector_id}
                                                    onChange={(event) => handleInfoChange(event, index, 'connector_id')}
                                                >
                                                    {
                                                        connectors && connectors.map((connector) => {
                                                            return <MenuItem value={connector.id}>{connector.name}</MenuItem>
                                                        })
                                                    }
                                                </TextField>
                                            </Grid>
                                        {typeConfig[form.type] && 
                                            typeConfig[form.type].map((extraField) => {
                                                console.log(typeConfig[form.type])
                                                return (
                                                    <Grid item>
                                                        <TextField
                                                            select={extraField.choices ? true : false}
                                                            required
                                                            label={prettifySnakeCase(extraField.name)}
                                                            id={extraField.name}
                                                            fullWidth
                                                            helperText = {!extraField.choices && extraField.multiple && 'Multiple choices are comma separated'}
                                                            value={form.info[extraField.name]}
                                                            onChange={(event) => handleInfoChange(event, index, extraField.name, extraField.multiple)}
                                                        >
                                                            {
                                                                extraField.choices && extraField.choices.map((choice) => {
                                                                    return <MenuItem value={choice}>{choice}</MenuItem>
                                                                })
                                                            }
                                                        </TextField>
                                                    </Grid>
                                                )
                                            })
                                        }
                                        


                                        </Grid>
                                    </Grid>
                                )
                            }
                            )
                            }
                            <Grid item>
                                {tabNumber < meta.maximumDashboards ?
                                    <Button onClick={addTab}>Add More..</Button> :
                                    <p>Maximum tabs reached</p>
                                }

                            </Grid>
                            <Grid item>
                                {/* controls */}
                                <Button type='submit' variant='contained'>Submit</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </ClippedDrawer>
            <Backdrop
                sx={{ color: '#fff', zIndex: (t) => t.zIndex.drawer + 1 }}
                open={isPendingSubmit}
            >
                <Grid
                    container
                    direction='column'
                    justifyContent='center'
                    alignContent='center'
                >
                    <Grid item>
                        <CircularProgress
                            size={100}
                            thickness={7}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" noWrap sx={{ textAlign: 'left', color: 'primary.main' }}>
                            Your dashboard is being created...
                        </Typography>
                    </Grid>
                </Grid>


            </Backdrop>
        </>
    )
}