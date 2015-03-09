'use strict';

module.exports = function poweredByCoach(req, res, next) {
  res.header('X-Powered-By', 'Coach Networks with love');
  next();
};
