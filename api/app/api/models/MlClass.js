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

const MlClass = sqwak.mongoose.model('ModelClass', {
    id: String,
    className: String,
    package: String,
    numSamples: Number,
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
});

module.exports = { create, getAll, MlClass };