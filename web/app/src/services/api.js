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

function createApp(options) {
    const token = auth.getToken();
    return fetch(`${process.env.REACT_APP_API_URL}/app`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            appName: options.appName
        })
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

function deleteApp(appId) {
    const token = auth.getToken();
    return fetch(`${process.env.REACT_APP_API_URL}/app/${appId}`, {
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

function createClass({appId, className, file}) {
    return new Promise((resolve, reject) => {
        const token = auth.getToken();
        const formData = new FormData();
        formData.append('audio_file', file, file.name);
        formData.set("className", className);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', `${process.env.REACT_APP_API_URL}/app/${appId}/class?access_token=${token}`, true);
        xhr.upload.onprogress = function(e) {
            console.log(e);
        };
        xhr.addEventListener("load", (response) => {
            resolve(response);
        });
        xhr.addEventListener("error", (err) => {
            reject(err);
        });
        xhr.send(formData);
    });
}

function moveClass({appId, classId, from, to}) {
    const token = auth.getToken();
    return fetch(`${process.env.REACT_APP_API_URL}/app/${appId}/class/${classId}/move`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            from,
            to
        })
    })
    .then((data) => data.json())
}

function deleteClass({appId, classId}) {
    const token = auth.getToken();
    return fetch(`${process.env.REACT_APP_API_URL}/app/${appId}/class/${classId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
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