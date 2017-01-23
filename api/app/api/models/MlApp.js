const MlApp = sqwak.mongoose.model('ModelClass', {
    appName: String,
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    queryUrl: String,
    metrics: {},
    model : {}
});

module.exports = { MlApp };