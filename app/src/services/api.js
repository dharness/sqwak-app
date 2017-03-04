import * as auth from './auth';
import axios from 'axios';

var axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  timeout: 1000,
  headers: {'Content-Type': 'application/json'}
});


/*************************** USER ***************************/
function loginUser({email, password}) {
    const data = {email, password};
    return axiosInstance({
        method: 'POST',
        url: '/user/login',
        data
    }).then(response => response.data);
}

function signupUser({email, password}) {
    const data = {email, password};
    return axiosInstance({
        method: 'POST',
        url: '/user',
        data
    }).then(response => response.data);
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

function trainModel({userId, appId}) {
    const token = auth.getToken();
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}/ml_app/${appId}/train`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((data) => data.json())
}

function testModel({userId, appId, file}) {
    const form = new FormData();
    form.append('file', file, file.name);
    return axios.post(`${process.env.REACT_APP_API_URL}/user/${userId}/ml_app/${appId}/test`, form)
        .then((res) => res.data)
        .catch((error) => {
            console.log(error);
        });
}

function publishModel({userId, appId}) {
    const token = auth.getToken();
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}/ml_app/${appId}/publish`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
    }).then((data) => data.json())
}

/*************************** PREMADE-CLASSES ***************************/

function fetchPremadeClasses() {
    const token = auth.getToken();
    return fetch(`${process.env.REACT_APP_API_URL}/premade`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(data => data.json())
    .then(data => data['data'])
}

function copyPremadeClass({appId, classId}) {
    const token = auth.getToken();
    let data = { 'to_app_id': appId} ;
    return fetch(`${process.env.REACT_APP_API_URL}/premade/${classId}/copy`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data, null, '\t')
    })
    .then((data) => data.json())
}

/*************************** CLASSES ***************************/

function fetchClasses(appId, userId) {
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

function addSampleToClass({ userId, appId, classId, file }) {
    const token = auth.getToken();
    const form = new FormData();
    form.append('file', file, file.name);
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}/ml_app/${appId}/ml_class/${classId}/audio_sample`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: form
    }).then((data) => data.json())
}

function createClass({ userId, appId, className }) {
    const token = auth.getToken();
    const form = new FormData();
    form.set("class_name", className);
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}/ml_app/${appId}/ml_class`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: form
    }).then((data) => data.json())
}

function renameClass({userId, appId, classId, className}) {
    const token = auth.getToken();
    const form = new FormData();
    form.set("class_name", className);
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}/ml_app/${appId}/ml_class/${classId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({class_name:className})
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
    .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    })
}

export {
    loginUser,
    signupUser,
    createApp,
    fetchApp,
    fetchApps,
    deleteApp,
    trainModel,
    testModel,
    createClass,
    addSampleToClass,
    renameClass,
    deleteClass,
    moveClass,
    fetchClasses,
    fetchPremadeClasses,
    copyPremadeClass,
    publishModel
}