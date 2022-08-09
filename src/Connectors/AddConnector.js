import { useNavigate, useParams } from "react-router-dom"
import { ClippedDrawer } from "../Components/ClippedDrawer";
import { Paper, Grid, Box, Typography, TextField, Button, MenuItem, IconButton } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { MetaContext } from "../Components/Auth";
import { find } from "lodash";
import { BackButton, openCredentialWindow, prettifySnakeCase } from "../util/Utils";
import { ErrorContext } from "../Components/Error";
import { APIGet, APIPost, API_HOST } from "../util/API";
import RefreshIcon from '@mui/icons-material/Refresh';
import { getConnectorIcon } from "./ConnectorIcons";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';


function StringField(props) {
    const prettyName = prettifySnakeCase(props.fieldName)
    return (
        <TextField
            required
            id={props.fieldName}
            fullWidth
            label={prettyName}
            placeholder={prettyName}
            onChange={(e) => props.setField(e.target.value)}
        />
    )
}

function ChoiceField(props) {
    const prettyName = prettifySnakeCase(props.fieldName)
    return (
        <TextField
            required
            select
            value={props.formData[props.fieldName]}
            id={props.fieldName}
            fullWidth
            label={prettyName}
            placeholder={prettyName}
            onChange={(e) => props.setField(e.target.value)}
        >
            {
                props.field.options.map((choice) => {
                    return (
                        <MenuItem key={choice} value={choice}>{prettifySnakeCase(choice)}</MenuItem>
                    )
                })
            }
        </TextField>
    )
}

function APIChoiceField(props) {
    const errorContext = useContext(ErrorContext)
    const [APIChoices, setAPIChoices] = useState(null)

    const prettyName = prettifySnakeCase(props.fieldName)

    let dependencyValues = [];
    props.field.depends_on && props.field.depends_on.forEach(
        dependencyFieldName => dependencyValues.push(props.formData[dependencyFieldName])
    )

    const isReady = !dependencyValues.includes('');

    useEffect(() => {
        if (isReady && !APIChoices) {
            let url = props.field.url;
            props.field.depends_on && props.field.depends_on.forEach(
                (dependencyFieldName) => url = url.replace(`{${dependencyFieldName}}`, props.formData[dependencyFieldName])
            )
            APIGet(url, errorContext).then((resp) => setAPIChoices(resp.data))
        }
    }, [isReady, APIChoices])


    return (
        <Grid container
            justifyContent="center"
        >
            <Grid
                item
                xs={11}

            >
                <TextField
                    required
                    disabled={!isReady}
                    select
                    value={props.formData[props.fieldName]}
                    id={props.fieldName}
                    fullWidth
                    label={prettyName}
                    placeholder={prettyName}
                    onChange={(e) => props.setField(e.target.value)}
                >
                    {
                        APIChoices && APIChoices.map((choice) => {
                            return (
                                <MenuItem key={choice.id} value={choice.id}>{choice.label}</MenuItem>
                            )
                        })
                    }
                </TextField>
            </Grid>
            <Grid
                item
                xs={1}
                alignSelf={'center'}
            >
                <IconButton
                    onClick={() => setAPIChoices(null)}>
                    <RefreshIcon />
                </IconButton>
            </Grid>
        </Grid>

    )
}


function genericField(fieldName, field, setField, formData) {

    let component;
    switch (field.type) {
        case 'string':
            component = <StringField key={fieldName} field={field} fieldName={fieldName} setField={setField} />
            break
        case 'choice':
            component = <ChoiceField key={fieldName} field={field} fieldName={fieldName} setField={setField} formData={formData} />
            break
        case 'choice_from_api':
            component = <APIChoiceField key={fieldName} field={field} fieldName={fieldName} setField={setField} formData={formData} />
            break
        default:
            component = null;
    }
    return (
        <Grid
            item
            py={2}
        >
            {component}
        </Grid>
    )
}

function genericWidget(widget) {
    switch (widget.type) {
        case 'button':
            return <Button 
            color='secondary'
            variant='contained'
            onClick={() => openCredentialWindow(API_HOST + widget.url)}> {widget.label} </Button>
        default:
            return null;
    }
}


export const AddConnector = () => {
    const errorContext = useContext(ErrorContext)
    const { connectorType } = useParams();
    const meta = useContext(MetaContext);
    const navigate = useNavigate();

    const connectorConfig = find(meta.fullMeta.connectors, ((connector) => connector.name === connectorType));
    const fields = connectorConfig.fields;
    const widgets = connectorConfig.extra_widgets ? connectorConfig.extra_widgets : [];

    const fieldNames = Object.keys(fields)
    let initialFormData = {};

    fieldNames.forEach(fieldName => initialFormData[fieldName] = '')
    const [formData, setFormData] = useState(initialFormData)

    function setField(fieldName) {
        const _setField = (value) => {
            let formDataCopy = Object.assign({}, formData)
            formDataCopy[fieldName] = value
            setFormData(formDataCopy)
        }
        return _setField
    }

    const fieldsToRender = Object.keys(fields).map((fieldName) => {
        return genericField(fieldName, fields[fieldName], setField(fieldName), formData)
    })

    const extraWidgetsToRender = widgets.map((widget) => {
        return genericWidget(widget);
    })

    function handleSubmit(event) {
        event.preventDefault();
        const submitUrl = connectorConfig.submit_url;
        APIPost(submitUrl, formData, errorContext).then(_ => navigate('/home'))

    }

    return (
        <ClippedDrawer>
            <BackButton
            url = {'/add_connector'} />
            <Paper sx={{ width: '96%', overflow: 'hidden', mx: '2%' }}>
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
                    <Grid item xs={11}
                    >
                        <Typography variant="h6" noWrap sx={{ textAlign: 'left', color: 'common.white' }}>
                            Add a {prettifySnakeCase(connectorType)} Connector
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <img src={getConnectorIcon(connectorType)} height={35} alt='Social Media Icon'/>
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
                            textAlign={'left'}
                        >
                            <Grid
                                container
                                direction='row'
                            >
                                <Grid container
                                    direction='column'
                                    spacing={2}
                                    xs={widgets.length > 0 ? 10 : 12}
                                >
                                    {fieldsToRender}
                                </Grid>
                                {widgets.length > 0 &&
                                    <Grid container
                                        xs={2}
                                        alignContent='center'
                                        marginLeft={2}
                                        
                                    >
                                        <Grid item>
                                            {extraWidgetsToRender}
                                        </Grid>
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Button type='submit' variant='contained'>Submit</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </ClippedDrawer>
    )
}