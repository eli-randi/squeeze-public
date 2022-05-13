import * as React from 'react';
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
import { AuthProvider, RequireAuth } from './Components/Auth';
import ErrorSnackbar, { ErrorProvider } from './Components/Error';

const theme = createTheme(
  {
    palette: {
      type: 'light',
      primary: {
        main: '#ffc400',
      },
      secondary: {
        main: '#006508',
      },
    },
    text: {
      primary: '#000000',
      secondary: '#ffffff'
    },
    typography: {
      fontFamily: 'Rubik',
    },
  }
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ErrorProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Login />} />
                  <Route path='/home' element={
                      <RequireAuth>
                        <Connectors />
                      </RequireAuth>
                    } 
                  />
                  <Route path='/accounts' element={
                    <RequireAuth>
                      <Credentials />
                    </RequireAuth>
                    } 
                    />
                
              </Routes>
            </BrowserRouter>
          </AuthProvider>
          <ErrorSnackbar />
        </ErrorProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;



