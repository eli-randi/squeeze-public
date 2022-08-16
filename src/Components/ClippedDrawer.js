import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import LinkIcon from '@mui/icons-material/Link';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { LinkedToolbarItem, ButtonToolbarItem } from './ToolbarItem';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutFromAPI } from '../util/API';
import ErrorContext from './Error';
import { Grid, useTheme } from '@mui/material';
import SqueezeLogo from './SqueezeLogo.png'
import { Link} from 'react-router-dom';
import {MetaContext} from "./Auth";

const drawerWidth = 240;

export function ClippedDrawer(props) {
  const errorContext = useContext(ErrorContext)
  const meta = useContext(MetaContext)

  const handleLogoutClick = () => {
    logoutFromAPI(errorContext).then((logout_url) => {
        window.location.href = logout_url
    })
  }
  return (
    <Box sx={{ display: 'flex', [`& .MuiToolbar-gutters`]: { display: 'none' } }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          ['& .MuiToolbar-gutters']: { display: 'none' },
          paddingTop: 0,
          marginTop: 0,
        }}
      >
        <Toolbar />
        <Grid
          container
          direction={'column'}
          justifyContent={'flex-start'}

          height={'100%'}
          sx={{
            backgroundColor: 'secondary.dark', text: 'common.white',
            [`& .MuiToolbar-gutters`]: { display: 'none' }
          }}

        >
          <Link
          style={{ textDecoration: 'none', color: '#FDCA19' }}
            to={{
              pathname: '/home'
            }}>
            <Grid
              item
              flexDirection={'row'}
              display={'flex'}
              alignItems={'center'}
              height={'90px'}
              paddingY={'5px'}
              marginX={'auto'}
              sx={{
                [`@media screen and (max-height: 700px)`]: {
                  height: '50px'
                }
              }}
            >
              <img src={SqueezeLogo}
                height='100%'
                margin='auto' alt='Squeeze Logo' />
                  <Typography variant='h6' fontSize={22}
                  >
                    Squeeze
                  </Typography>
            </Grid>
          </Link>
            <Grid item >
              <Typography sx={{color: 'common.white', fontStyle: 'italic', fontSize: 12}}>
                Signed in as {meta?.fullMeta?.user_info?.email}
              </Typography>
            </Grid>
          <Grid item height={'85%'}>
            <Grid
              container
              direction={'column'}
              justifyContent={'space-between'}
              height={'100%'}
            >
              <Grid
                item
                width={'100%'}
              // height={'40%'}
              >

                <List>
                  <Typography
                    sx={{ color: 'common.white' }}
                  >
                    <LinkedToolbarItem text='Connectors' icon={<LinkIcon />} path='/home' />
                    <LinkedToolbarItem text='Credentials' icon={<VpnKeyIcon />} path='/accounts' />
                    <LinkedToolbarItem text='Dashboards' icon={<DashboardIcon />} path='/dashboards' />
                  </Typography>
                </List>
              </Grid>
              <Grid
                item
              >
                <List>
                  <Typography
                    sx={{ color: 'common.white' }}
                  >
                    <ButtonToolbarItem
                      text='Log out'
                      icon={<LogoutIcon htmlColor='#fff' />}
                      handleClick={handleLogoutClick}
                    />
                  </Typography>
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Drawer >
      <Box component="main" sx={{
        flexGrow: 1, p: 3,
        //  pt: '70px' 
      }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box >
  );
}
