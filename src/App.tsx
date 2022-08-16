import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import { MetaProvider, RequireAuth } from './Components/Auth';
import ErrorSnackbar, { ErrorProvider } from './Components/Error';
import Home from './pages/Home/Home';
import Dashboards from 'pages/Dashboards/Dashboards';
import AddDashboard from "pages/AddDashboard/AddDashboard";
import Accounts from './pages/Accounts/Accounts'
import AddConnector from "pages/AddConnector/AddConnector";
import { theme } from "util/theme";
import './App.css';

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
