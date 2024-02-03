function authorizeRoles(roles) {
  return (req, res, next) => {
    // Check if user has any of the required roles
    if (!roles.some((role) => req.user.roles.includes(role))) {
      return res.status(403).send("Access denied. Insufficient permissions.");
    }
    next();
  };
}

module.exports = { authorizeRoles };
