function getFeatures() {
    return fetch('http://localhost:3000/api/v0')
            .then(response => response.json())
}

export default getFeatures