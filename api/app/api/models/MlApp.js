const { mlClassSchema } = require('./MlClass')

const MlApp = new sqwak.mongoose.Schema({
    appName: { type: String, required: true, unique: true },
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    queryUrl: String,
    mlClasses: [mlClassSchema],
    metrics: {
        updatedAt: { type: Date, default: Date.now },
        createdAt: { type: Date, default: Date.now },
    },
    workingModel: {
        updatedAt: { type: Date, default: Date.now },
        createdAt: { type: Date, default: Date.now },
        trainedAt: { type: Date },
        mlClasses: [mlClassSchema],
        modelFile: String
    },
    publishedModel: {
        updatedAt: { type: Date, default: Date.now },
        createdAt: { type: Date, default: Date.now },
        trainedAt: { type: Date },
        mlClasses: [mlClassSchema],
        modelFile: String
    }
});

module.exports = MlApp;