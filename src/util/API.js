import cookie from 'react-cookies';


export const API_HOST = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://localhost:3000' : 'https://api.thisissqueeze.com'

// We have to work around here, because we're opening a window, so the host in this case is relative
// to the machine, as opposed to the container the frontend is in
export const OAUTH_HOST = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://localhost:8000' : API_HOST


export function APIGet (url, errorContext) {
  const response = fetch(API_HOST + url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }).then((resp) => {
    const connectors = resp.json();
    return connectors.then(jsonResponse => {
      return jsonResponse;
    });
  }).catch(_ => {
    errorContext.addError();
  })
  return response;
}


export function getConnectorsFromAPI(errorContext) {
  return APIGet('/connectors/list', errorContext).then(jsonResponse => {
      return jsonResponse.data;
    });
  }

export function getCredentialsFromAPI(errorContext) {
  return APIGet('/credentials/', errorContext).then(jsonResponse => {
      return jsonResponse.data;
    });
}

export function getWorkflowsFromAPI(id, errorContext) {
  return APIGet(`/connectors/${id}/recent_workflows`, errorContext).then(jsonResponse => {
      return jsonResponse.data;
    });
}

export function getMetaFromAPI(errorContext) {
  return APIGet('/connectors/meta', errorContext).then(
      jsonResponse => {
        return jsonResponse.data;
      }
    );
}

export function getDashboardsFromAPI(errorContext) {
  return APIGet('/reporting/dashboards', errorContext).then(
    jsonResponse => {
      return jsonResponse.data;
    }
  )
}

export function APIPost(url, body, errorContext) {
  let paramsForFetch = {
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
  }
  if (body) {
    paramsForFetch.body = JSON.stringify(body)
  }
  const response = fetch(API_HOST + url, paramsForFetch).then((resp) => {
    if (resp.status <= 599 && resp.status >= 500) {
      errorContext.addError();
    }
    return resp;
  }).then((resp) => {
    return resp;
    }
  )
  return response;
}


export function loginToAPI(username, password, errorContext) {
  const body = {username: username, password: password};
  return APIPost('/connectors/login', body, errorContext).then((response) => {
    return response.ok
  })
}

export function logoutFromAPI(errorContext) {
  return APIPost('/connectors/logout', null, errorContext)
    .then((response) => response.json())
    .then((response) => response.data.logout_url);
}

export function deleteConnectorFromAPI(id, errorContext) {
  return APIPost(`/connectors/${id}/delete`, null, errorContext).then((response) => {
    return response.ok
  })
}

// BEGIN REACT QUERY

// Same as APIGet but without using errorContext
export const APIfetch = async (url) => {
  const response = await fetch(API_HOST + url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
  const deserialisedResponse = await response.json();
  return deserialisedResponse;
}

export const fetchConnectors = async () => {
  const connectorResponse = await APIGet('/connectors/list');
  return connectorResponse.data;
}

// END REACT QUERY
