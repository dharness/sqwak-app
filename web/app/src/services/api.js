function getFeatures() {
    return fetch(process.env.REACT_APP_API_URL)
            .then(response => response.json())
}

/*************************** APPS ***************************/

function createApp(options) {
    const token = localStorage.getItem('id_token');
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

function fetchApp(appId) {
    const token = localStorage.getItem('id_token');
    return fetch(`${process.env.REACT_APP_API_URL}/app/${appId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((data) => data.json())
}

function fetchApps() {
    const token = localStorage.getItem('id_token');
    return fetch(`${process.env.REACT_APP_API_URL}/app`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((data) => data.json())
}

function deleteApp(appId) {
    const token = localStorage.getItem('id_token');
    return fetch(`${process.env.REACT_APP_API_URL}/app/${appId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((data) => data.json())
}

/*************************** CLASSES ***************************/

function fetchClasses(appId, userId='588f5c3dca643e00552f4fe1') {
    const token = localStorage.getItem('id_token');
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
        const token = localStorage.getItem('id_token');
        const formData = new FormData();
        formData.append('uploads[]', file, file.name);
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

function deleteClass({appId, classId}) {
    const token = localStorage.getItem('id_token');
    return fetch(`${process.env.REACT_APP_API_URL}/app/${appId}/class/${classId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then((data) => data.json())
}

export {
    getFeatures,
    createApp,
    fetchApp,
    fetchApps,
    deleteApp,
    createClass,
    deleteClass,
    fetchClasses
}