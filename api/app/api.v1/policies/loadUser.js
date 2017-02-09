const jwt = require('jsonwebtoken');
const User = require('./../models/User');


module.exports = (loadSamples) => {
  return (req, res, next) => {
    var decoded = jwt.decode(req.token, { complete: true });
    if (decoded && decoded.payload && decoded.payload.sub) {
      const userId = decoded.payload.sub.split('|')[1];
      let selection = {};
      if (!loadSamples) {
        selection["apps.mlClasses.samples"] = 0;
      }

      User
        .findOne({ _id: userId })
        .select(selection)
        .exec((err, user) => {
          if (err) { return res.send(err); }
          req.user = user;
          next();
        });
    }
  }
};