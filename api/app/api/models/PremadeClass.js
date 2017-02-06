const MlSample = require('./MlSample');

const premadeClassSchema = new sqwak.mongoose.Schema({
    localClassId: Number,
    className: { type: String, required: true },
    packageName: { type: String, required: true },
    isEdited: { type: Boolean, required: true, default: false },
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    samples: [MlSample]
}, { collection: 'premadeClasses' });

const PremadeClass = sqwak.mongoose.model('PremadeClass', premadeClassSchema);

module.exports = PremadeClass;