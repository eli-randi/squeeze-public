import React from "react"
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom";


export function LinkedToolbarItem(props) {
    return (
            <ListItem component={Link} to = {props.path} button key={props.text}>
                <ListItemIcon>
                    {props.icon}
                </ListItemIcon>
                <ListItemText primary={props.text} />
            </ListItem>
    )
}

export function ButtonToolbarItem(props) {
    return (
            <ListItem button key={props.text} onClick={props.handleClick}>
                <ListItemIcon>
                    {props.icon}
                </ListItemIcon>
                <ListItemText primary={props.text} />
            </ListItem>
    )
}
