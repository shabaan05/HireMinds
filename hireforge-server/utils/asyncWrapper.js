//Wraps async controllers so errors go to the error middleware.
const asyncWrapper = (fn) => {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = asyncWrapper;