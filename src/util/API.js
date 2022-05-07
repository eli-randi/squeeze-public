import React from "react";
import cookie from 'react-cookies';


const API_HOST = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://localhost:3000': 'https://api.thisissqueeze.com'


export function APILogin (username, password) {
    const response = fetch(API_HOST + '/connectors/login', {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': cookie.load('csrftoken')
        },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify({username: username, password: password}) 
      }).then(
        (resp) => {
          return resp.ok;
        }
      )
      return response;
    }
    
