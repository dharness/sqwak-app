const MlModel = sqwak.mongoose.model('MlModel', {
    id: String,
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    trainedAt: { type: Date },
    classes: [String],
    untrained_classes: [String]
});

module.exports = { MlModel };