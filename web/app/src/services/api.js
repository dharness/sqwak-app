function getFeatures() {
    console.log(process.env.REACT_APP_API_URL);
    return fetch(process.env.REACT_APP_API_URL)
            .then(response => response.json())
}

export default getFeatures