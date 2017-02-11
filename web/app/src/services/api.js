import * as auth from './auth';


/*************************** USER ***************************/
function loginUser({email, password}) {
    const token = auth.getToken();
    return fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then((data) => data.json())
}

/*************************** APPS ***************************/

function createApp({userId, appName}) {
    const token = auth.getToken();
    const form = new FormData();
    form.append('app_name', appName);
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}/ml_app`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: form
    }).then((data) => data.json())
}

function fetchApp({userId, appId}) {
    const token = auth.getToken();
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}/ml_app/${appId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((data) => data.json())
}

function fetchApps(userId) {
    const token = auth.getToken();
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}/ml_app`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((data) => data.json())
}

function deleteApp({userId, appId}) {
    const token = auth.getToken();
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}/ml_app/${appId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((data) => data.json())
}

/*************************** MODEL ***************************/

function trainModel(appId) {
    const token = auth.getToken();
    return fetch(`${process.env.REACT_APP_API_URL}/app/${appId}/train`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((data) => data.json())
}

function testModel(appId) {
    const token = auth.getToken();
    return fetch(`${process.env.REACT_APP_API_URL}/app/${appId}/predict`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((data) => data.json())
}

/*************************** PREMADE-CLASSES ***************************/

function fetchPremadeClasses(appId, userId='588f5c3dca643e00552f4fe1') {
    const token = auth.getToken();
    return fetch(`${process.env.REACT_APP_API_URL}/premade-class`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((data) => data.json())
}

/*************************** CLASSES ***************************/

function fetchClasses(appId, userId='588f5c3dca643e00552f4fe1') {
    const token = auth.getToken();
    return fetch(`${process.env.REACT_APP_API_URL}/app/${userId}/class`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((data) => data.json())
}

function createClass({userId, appId, className, file}) {
    const token = auth.getToken();
    const form = new FormData();
    form.append('file', file, file.name);
    form.set("className", className);
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}/ml_app/${appId}/ml_class`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: form
    }).then((data) => data.json())
}

function moveClass({userId, appId, classId, from, to}) {
    const inModel = (to === 'mlModel');
    const token = auth.getToken();
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}/ml_app/${appId}/ml_class/${classId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ in_model: inModel })
    })
    .then((data) => data.json())
}

function deleteClass({userId, appId, classId}) {
    const token = auth.getToken();
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}/ml_app/${appId}/ml_class/${classId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then((data) => data.json())
}

export {
    loginUser,
    createApp,
    fetchApp,
    fetchApps,
    deleteApp,
    trainModel,
    testModel,
    createClass,
    deleteClass,
    moveClass,
    fetchClasses,
    fetchPremadeClasses
}