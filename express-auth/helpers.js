const ROLE_USER = require('./constants').ROLE_USER;
const ROLE_MANAGER = require('./constants').ROLE_MANAGER;
const ROLE_SUPER_ADMIN = require('./constants').ROLE_SUPER_ADMIN;
const ROLE_ADMIN = require('./constants').ROLE_ADMIN;

// Set user info from request
exports.setUserInfo = function setUserInfo(request) {
    const getUserInfo = {
        _id: request._id,
        // firstName: request.profile.firstName,
        // lastName: request.profile.lastName,
        email: request.email,
        role: request.role
    };

    return getUserInfo;
};

exports.getRole = function getRole(checkRole) {
    let role;

    switch (checkRole) {
        case ROLE_SUPER_ADMIN:
            role = 4;
            break;
        case ROLE_ADMIN:
            role = 3;
            break;
        // case ROLE_OWNER: role = 3; break;
        case ROLE_MANAGER:
            role = 2;
            break;
        case ROLE_USER:
            role = 1;
            break;
        default:
            role = 1;
    }

    return role;
};
