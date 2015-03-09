'use strict';

module.exports = function poweredByCoach(req, res, next) {
  res.set('X-Powered-By', 'Coach Networks with love');
  next();
};
