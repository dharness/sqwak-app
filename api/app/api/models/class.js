function create(options) {
    return new Promise((resolve, reject) => {
        sqwak.db.collection('class').insertOne(options, (err, docs) => {
            if (err) { return reject(err); }
            resolve(docs);
        })
    });
}

function getAll() {
    return new Promise((resolve, reject) => {
        sqwak.db.collection('class').find({}, (err, docs) => {
            if (err) { return reject(err); }
            resolve(docs.toArray());
        })
    });
}

module.exports = { create, getAll };