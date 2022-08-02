import { useNavigate } from "react-router-dom"
import { ClippedDrawer } from "../Components/ClippedDrawer";
import { MetaContext } from "../Components/Auth";
import { useContext, useState } from "react";
import { Grid, Paper, Typography, Card, CardActionArea, CardContent } from "@mui/material";
import CustomizedInputBase from "../Components/SearchBar";
import { getConnectorIcon } from "./ConnectorIcons";
import { BackButton } from "../util/Utils";

export const SelectConnector = () => {
    const meta = useContext(MetaContext);
    const [searched, setSearched] = useState('');
    let connectors = meta.fullMeta ? meta.fullMeta.connectors : [];
    const navigate = useNavigate();

    const handleSearchInput = (e) => {
        setSearched(e.target.value);
    }

    let connectorsToRender = connectors;


    if (searched) {
        connectorsToRender = connectorsToRender.filter((connector) => {
            return connector.label.toLowerCase().includes(searched.toLowerCase())
        })
    }

    return (
        <ClippedDrawer>
            <BackButton
            url = {'/home'} />
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
                        <Typography variant="h6" noWrap sx={{ textAlign: 'left', color: 'common.white', fontFamily: 'Rubik' }}>
                            Select a connector type
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <CustomizedInputBase
                            handleSearchInput={handleSearchInput} />
                    </Grid>
                </Grid>
                <Grid container
                    direction='row'
                    sx={{overflowY: 'scroll', 
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
                      }}}
                    paddingY={2}
                    marginY={2}
                    paddingX={2}
                    justifyContent='space-evenly'
                    spacing={1}
                    height={500}
                >
                    {connectorsToRender.map((connector) => {
                        console.log(connector.name)
                        return (
                            <Grid item>
                               <Card sx={{ width: 340 }}>
                                <CardActionArea
                                    onClick={() => {
                                        navigate(`/add_connector/${connector.name}`)
                                    }}>
                                    <CardContent>
                                        <img src={getConnectorIcon(connector.name)} height='100px' alt="Social Media Icon"/>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {connector.label}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card> 
                            </Grid>
                            

                        )
                    })}
                </Grid>

            </Paper>

        </ClippedDrawer>

    )

}