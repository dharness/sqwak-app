const MlSample = new sqwak.mongoose.Schema({
    features: { type: [Number], reuired: true },
    original_filename: String,
    extraction_method: String,
    start: Number,
    end: Number,
    salience: Number
});

module.exports = MlSample;