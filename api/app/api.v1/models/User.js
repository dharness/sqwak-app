const MlApp = require('./MlApp');


const userSchema = new sqwak.mongoose.Schema({
    apps: [MlApp]
}, { versionKey: false });

const User = sqwak.mongoose.model('User', userSchema);

module.exports = User;