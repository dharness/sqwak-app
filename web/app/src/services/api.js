function getFeatures() {
    return fetch(process.env.REACT_APP_API_URL)
            .then(response => response.json())
}

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

export {
    getFeatures,
    createApp,
    fetchApps,
    deleteApp
}