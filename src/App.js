import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { Credentials } from './Credentials/Credentials';
import { createTheme, ThemeProvider } from '@mui/material';
import { MetaProvider, RequireAuth } from './Components/Auth';
import ErrorSnackbar, { ErrorProvider } from './Components/Error';
import { DashboardList } from './Dashboards/DashboardList';
import { AddDashboard } from './Dashboards/AddDashboard';
import { BasicSpeedDial } from './Components/SpeedDial'
import { SelectConnector } from './Connectors/SelectConnector';
import { AddConnector } from './Connectors/AddConnector';
import { ConnectorsList } from './Connectors/ConnectorsList';
import Home from './pages/Home/Home';

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
      fontFamily: 'Rubik',
    },
    drawerPaper: {
      width: "inherit",
      paddingTop: 0 
    },
  }
);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ErrorProvider>
          <MetaProvider>
            <BrowserRouter>
              <RequireAuth>
                <Routes>
                  <Route path='/home' element={<Home />} />
                  <Route path='/accounts' element={
                    <>
                      <Credentials />
                      <BasicSpeedDial />
                    </>
                  }
                  />
                  <Route path='/dashboards' element={
                    <>
                      <DashboardList />
                      <BasicSpeedDial />
                    </>
                  }
                  />
                  <Route path='/add_dashboard' element={<AddDashboard />} />
                  <Route path='/add_connector/:connectorType' element={<AddConnector />}/>
                  <Route path='/add_connector' element={<SelectConnector />} />
                  <Route path='/' element={<Navigate to='/home' replace />} />
                </Routes>
              </RequireAuth>
            </BrowserRouter>
          </MetaProvider>
          <ErrorSnackbar />
        </ErrorProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
