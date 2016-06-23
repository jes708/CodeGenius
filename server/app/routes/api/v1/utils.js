'use strict';


module.exports = {
  ensureAuthenticated(req, res, next) {
      if (req.isAuthenticated()) {
          next();
      } else {
          res.status(401).end();
      }
  };
}
