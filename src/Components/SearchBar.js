import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';


export default function CustomizedInputBase(props) {

  const sx = Object.assign({p: '2px 10px', display: 'flex', alignItems: 'center', alignSelf:'bottom', width: '80%', float: 'right' }, props.sx)

  return (
    <Paper
      component="div"
      sx={sx}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search-bar' }}
        onChange = {props.handleSearchInput}
      />
        <SearchIcon />
    </Paper>
  );
}

