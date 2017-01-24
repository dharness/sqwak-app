const User = sqwak.mongoose.model('User', {
    userId: { type: String, unique : true, required: true }
});

module.exports = User;