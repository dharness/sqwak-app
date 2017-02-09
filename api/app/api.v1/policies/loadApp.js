function loadApp(req, res, next) {
  if(req.user) {
    if (!req.params.appId) { return res.sendStatus(403); }
    const currentApp = req.user.apps
      .find(app => app._id.toString() === req.params.appId);
    if (currentApp) {
      req.currentApp = currentApp;
      return next();
    }
  }
  return res.sendStatus(404);
}

module.exports = loadApp;