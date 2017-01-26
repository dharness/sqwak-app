function getFeatures() {
    return fetch(process.env.REACT_APP_API_URL)
            .then(response => response.json())
}

function createApp(options) {
    return fetch(`${process.env.REACT_APP_API_URL}/app`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2tpbmdvZnRoZXN0YWNrLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ODg2OWQ0M2M1NmJmNTY0YmQzMTk1NGYiLCJhdWQiOiJsNHB4ZWpPWGhUT1YzMkJIclp4QVNJSEh1TnE0dXJ3aCIsImV4cCI6MTQ4NTQ4NTY4MiwiaWF0IjoxNDg1NDQ5NjgyfQ.IiuJqeZIFBiyPficjiChmmJb_WE3QHj5V4jpWk4A7t0'
        },
        body: JSON.stringify({
            appName: options.appName
        })
    }).then((data) => data.json())
}

export {
    getFeatures,
    createApp
}