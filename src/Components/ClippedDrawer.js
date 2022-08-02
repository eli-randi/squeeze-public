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
import { MetaContext } from './Auth';
import ErrorContext from './Error';
import { Grid } from '@mui/material';
import SqueezeLogo from './SqueezeLogo.png'
import { Link } from 'react-router-dom';


const drawerWidth = 240;



export function ClippedDrawer(props) {
  let auth = useContext(MetaContext);

  let errorContext = useContext(ErrorContext)

  const handleLogoutClick = () => {
    logoutFromAPI(errorContext).then((_) => {
      auth.refreshLoginFromServer();
    })
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer - 1, paddingLeft: '240px', height: '90px', justifyContent:'center' }}
      >
        <Toolbar
        >
              <Typography variant="h4" color={'common.white'} noWrap component="div" sx={{ fontWeight: 'bold', fontFamily: 'Rubik' }}>
                This is Squeeze
              </Typography>
        </Toolbar>
      </AppBar>
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
          sx={{ backgroundColor: 'secondary.dark', text: 'common.white' }}

        >
          <Grid
            item
            height={'90px'}
            paddingY={'5px'}
          >
            <Link
            to={{
              pathname: '/home'
            }}>
            <img src={SqueezeLogo} height='80px' margin='auto' />
            </Link>
            
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
                <LinkedToolbarItem text='Connectors' icon={<LinkIcon color='white' />} path='/home' />
                <LinkedToolbarItem text='Credentials' icon={<VpnKeyIcon color='white' />} path='/accounts' />
                <LinkedToolbarItem text='Dashboards' icon={<DashboardIcon color='white' />} path='/dashboards' />
              </Typography>
            </List>
          {/* Add in speed dial */}
            {/* <List>
              <LinkedToolbarItem text='Add dashboard' icon={<DashboardCustomizeIcon />} path='/add_dashboard' />
            </List> */}

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
                icon={<LogoutIcon color='white'/>}
                handleClick={handleLogoutClick}
              />
              </Typography>
            </List>
          </Grid>
            </Grid>
          </Grid>
          
          
        </Grid>

      </Drawer >
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: '70px' }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box >
  );
}
