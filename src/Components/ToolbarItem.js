import React from "react"
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Divider from '@mui/material/Divider';


export function LinkedToolbarItem(props) {
    let location = useLocation()
    let pathMatches = location.pathname === props.path
    
    return (
            <>
            
            <ListItemButton 
                sx={
                    {
                        height:'70px',
                        '&.Mui-selected': {backgroundColor: 'rgba(191, 189, 193, 0.3)'},
                        '&.Mui-selected:hover': {backgroundColor: 'rgba(255, 255, 255, 0.3)'},
                        '&:hover': {backgroundColor: 'rgba(255, 255, 255, 0.3)'},
                }}
                component={Link} to = {props.path} button key={props.text}
                selected={pathMatches}
                
            >
                <ListItemIcon>
                    {props.icon}
                </ListItemIcon>
                <ListItemText
                    primaryTypographyProps={{fontWeight: 'bold'}}
                    primary={props.text} 

                />
            </ListItemButton>
            <Divider color={'white'} />
            </>
    )
}

export function ButtonToolbarItem(props) {
    return (
            <ListItem 
            sx={
                {
                    height:'70px',
                    '&.Mui-selected': {backgroundColor: 'rgba(191, 189, 193, 0.3)'},
                    '&.Mui-selected:hover': {backgroundColor: 'rgba(255, 255, 255, 0.3)'},
                    '&:hover': {backgroundColor: 'rgba(255, 255, 255, 0.3)'},
            }}
            button key={props.text} onClick={props.handleClick}>
                <ListItemIcon>
                    {props.icon}
                </ListItemIcon>
                <ListItemText 
                    primaryTypographyProps={{fontWeight: 'bold'}}
                    primary={props.text} 
                />
            </ListItem>
    )
}
