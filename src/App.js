import React, { useState } from 'react';
import './App.css';
import Login from './Login/Login';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Connectors } from './Connectors/Connectors';
import { Credentials } from './Credentials/Credentials';
import { createTheme, ThemeProvider } from '@mui/material';
import { MetaProvider, RequireAuth } from './Components/Auth';
import ErrorSnackbar, { ErrorProvider } from './Components/Error';
import { Dashboards } from './Dashboards/Dashboard';
import { AddDashboard } from './Dashboards/AddDashboard';
import { BasicSpeedDial } from './Components/SpeedDial'
import { SelectConnector } from './Connectors/SelectConnector';
import { AddConnector } from './Connectors/AddConnector';

const theme = createTheme(
  {
    palette: {
      type: 'light',
      primary: {
        main: '#ffc400',
        dark: '#D48A00'
      },
      secondary: {
        main: '#6D6A75',
        light: '#BFBDC1',
        dark: '#37323E'
      },
      white: {
        main: '#ffffff'
      }
    },
    text: {
      primary: '#000000',
      secondary: '#ffffff'
    },
    typography: {
      fontFamily: 'Inter, Rubik',


    },
    drawerPaper: {
      width: "inherit",
      paddingTop: 0  // equal to AppBar height (on desktop)
    },
  }
);

function App() {


  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ErrorProvider>
          <MetaProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/home' element={
                  <RequireAuth>
                    <Connectors />
                    <BasicSpeedDial />
                  </RequireAuth>
                }
                />
                <Route path='/accounts' element={
                  <RequireAuth>
                    <Credentials />
                    <BasicSpeedDial />
                  </RequireAuth>
                }
                />
                <Route path='/dashboards' element={
                  <RequireAuth>
                    <Dashboards />
                    <BasicSpeedDial />
                  </RequireAuth>
                }
                />
                <Route path='/add_dashboard' element={
                  <RequireAuth>
                    <AddDashboard />
                  </RequireAuth>
                }
                />
                <Route path='/add_connector/:connectorType' element={
                    <RequireAuth>
                      <AddConnector />
                    </RequireAuth>
                  }
                  />
                <Route path='/add_connector' element={
                  <RequireAuth>
                    <SelectConnector />
                  </RequireAuth>
                } >
                </Route>


              </Routes>
            </BrowserRouter>

          </MetaProvider>
          <ErrorSnackbar />
        </ErrorProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;



