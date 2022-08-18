import React , {useContext, useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export let ErrorContext = React.createContext(null) 

export function ErrorProvider(props) {
    let [isError, setIsError] = useState(false);

    const addError = () => setIsError(true);
    const removeError = () => setIsError(false);
    
    return <ErrorContext.Provider value={{isError, addError, removeError}}>{props.children}</ErrorContext.Provider>
}



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ErrorSnackbar() {
  let errors = useContext(ErrorContext);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    errors.removeError();
  };

  return (
      <Snackbar open={errors.isError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          There was an error. Try again.
        </Alert>
      </Snackbar>
  );
}
