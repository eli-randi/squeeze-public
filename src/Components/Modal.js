import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';


export default function Modal(props) {

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={props.open}
        onClose={props.handleClose}
      >
        <DialogTitle>
          {props.title}
        </DialogTitle>
        <DialogContent>
          {props.children}
        </DialogContent>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          pb={1}
          px={2}>
          <Grid item>
            <DialogActions>
              <Button variant='contained' onClick={props.handleClose}>Close</Button>
            </DialogActions>
          </Grid>
          {props.deleteFunction ?
            <Grid item>
              <DialogActions>
                {props.deleteFunction}
              </DialogActions>
            </Grid>
            : null}
        </Grid>
      </Dialog>
    </React.Fragment>
  );
}
