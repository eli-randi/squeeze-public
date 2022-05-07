import React from "react";
import cookie from 'react-cookies';

export function APILogin (username, password) {
    const response = fetch('http://localhost:3000/connectors/login', {
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
      });

      response.then((resp) => {
        return resp.ok;
      })
    }
    
