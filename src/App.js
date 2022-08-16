import { Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material';
import { MetaProvider, RequireAuth } from './Components/Auth';
import ErrorSnackbar, { ErrorProvider } from './Components/Error';
import Home from './pages/Home/Home';
import Dashboards from 'pages/Dashboards/Dashboards';
import AddDashboard from "pages/AddDashboard/AddDashboard";
import Accounts from './pages/Accounts/Accounts'
import AddConnector from "pages/AddConnector/AddConnector";
import './App.css';

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
            <RequireAuth>
              <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/accounts' element={<Accounts />}/>
                <Route path='/dashboards' element={<Dashboards />}/>
                <Route path='/add_dashboard' element={<AddDashboard />} />
                <Route path='/add_connector/:connectorType' element={<AddConnector />}/>
                <Route path='/add_connector' element={<AddConnector />} />
                <Route path='/' element={<Navigate to='/home' replace />} />
              </Routes>
            </RequireAuth>
          </MetaProvider>
          <ErrorSnackbar />
        </ErrorProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;
