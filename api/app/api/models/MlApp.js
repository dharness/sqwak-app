const MlApp = new sqwak.mongoose.Schema({
    appName: { type: String, required: true, unique: true },
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    queryUrl: String,
    metrics: {
        updatedAt: { type: Date, default: Date.now },
        createdAt: { type: Date, default: Date.now },
    },
    model: {
        updatedAt: { type: Date, default: Date.now },
        createdAt: { type: Date, default: Date.now },
        trainedAt: { type: Date },
        classes: [String],
        untrained_classes: [String],
        modelFile: String
    },
});

module.exports = MlApp;