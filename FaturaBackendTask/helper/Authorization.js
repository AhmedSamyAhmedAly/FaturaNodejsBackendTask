const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
    //add permissions to roles 
    ac.grant("user")
        .readOwn("profile")
        .updateOwn("profile")
        .deleteOwn("profile")
    ac.grant("admin")
        .extend("user")
        .readAny("profile")
        .updateAny("profile")
        .deleteAny("profile")
    return ac;
})();