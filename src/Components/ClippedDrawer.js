import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import LinkIcon from '@mui/icons-material/Link';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { LinkedToolbarItem, ButtonToolbarItem } from './ToolbarItem';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutFromAPI } from '../util/API';
import { MetaContext } from './Auth';
import ErrorContext from './Error';
import { Grid } from '@mui/material';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';

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
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
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
        }}
      >
        <Toolbar />
        
          <Grid
            container
            direction={'column'}
            justifyContent={'space-between'}
            height={'100%'}
          >
            <Grid
              item
              width={'100%'}
            >
              <List>
                <LinkedToolbarItem text='Connectors' icon={<LinkIcon />} path='/home' />
                <LinkedToolbarItem text='Credentials' icon={<VpnKeyIcon />} path='/accounts' />
                <LinkedToolbarItem text='Dashboards' icon={<DashboardIcon />} path='/dashboards' />
              </List>
              <Divider />
              <List>
                <LinkedToolbarItem text='Add dashboard' icon={<DashboardCustomizeIcon />} path='/add_dashboard' />
                {/* <LinkedToolbarItem text='Credentials' icon={<VpnKeyIcon />} path='/accounts' /> */}
              </List>
            </Grid>
            <Grid
              item
            >
              <List>
                <ButtonToolbarItem
                  text='Log out'
                  icon={<LogoutIcon />}
                  handleClick={handleLogoutClick}
                />
              </List>
            </Grid>
          </Grid>
        
      </Drawer >
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box >
  );
}
