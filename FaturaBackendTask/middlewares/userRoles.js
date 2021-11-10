const { roles } = require("../helper/Authorization");

/// check for the user role
exports.grantAccess = function (action, resource) {
  return async (req, res, next) => {
    try {
      console.log(req.user);
      //  check for granted permissions for a specific resource and action.
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
