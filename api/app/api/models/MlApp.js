const MlApp = new sqwak.mongoose.Schema({
    userId: { type: String, required: true },
    appName: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    queryUrl: String,
    metrics: { type: sqwak.mongoose.Schema.Types.Mixed, default: {} },
    model : {}
});

module.exports = MlApp;