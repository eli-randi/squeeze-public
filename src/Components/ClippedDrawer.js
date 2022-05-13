import React , {useContext} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import LinkIcon from '@mui/icons-material/Link';
import { LinkedToolbarItem, ButtonToolbarItem } from './ToolbarItem';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LogoutIcon from '@mui/icons-material/Logout';
import { APILogout } from '../util/API';
import { AuthContext } from './Auth';

const drawerWidth = 240;


const handleLogoutClick = (auth) => {
  APILogout().then((_) => {
    auth.refreshLoginFromServer();
  })
}

export function ClippedDrawer(props) {
  let auth = useContext(AuthContext);

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
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <LinkedToolbarItem text='Connectors' icon={<LinkIcon />} path='/home'/>
            <LinkedToolbarItem text='Credentials' icon={<VpnKeyIcon />} path='/accounts' />
          </List>
          <Divider />
          <List>
            <ButtonToolbarItem text='Log out' icon={<LogoutIcon />} handleClick={() => handleLogoutClick(auth)}/>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
