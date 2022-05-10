import React, {useState} from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

export default function CustomizedInputBase(props) {


  return (
    <Paper
      component="div"
      sx={{ p: '2px 10px', display: 'flex', alignItems: 'center', alignSelf:'bottom', width: '80%', float: 'right' }}
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

