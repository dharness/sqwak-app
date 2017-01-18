function getFeatures() {
    return fetch(process.env.REACT_APP_API_URL)
            .then(response => response.json())
}

export default getFeatures