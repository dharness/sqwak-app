const MlSample = require('./MlSample');

const mlClassSchema = new sqwak.mongoose.Schema({
    localClassId: Number,
    className: { type: String, required: true },
    packageName: { type: String, required: true },
    isEdited: { type: Boolean, required: true, default: false },
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    samples: [MlSample]
}, { collection: 'ml_classes' });

const MlClass = sqwak.mongoose.model('MlClass', mlClassSchema);

module.exports = {MlClass, mlClassSchema};