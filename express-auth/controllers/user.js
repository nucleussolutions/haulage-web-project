const User = require('../models/user');
const setUserInfo = require('../helpers').setUserInfo;
const ROLE_USER = require('../constants').ROLE_USER;
const ROLE_MANAGER = require('../constants').ROLE_MANAGER;
const ROLE_SUPER_ADMIN = require('../constants').ROLE_SUPER_ADMIN;
const ROLE_ADMIN = require('../constants').ROLE_ADMIN;


//= =======================================
// User Routes
//= =======================================
exports.viewProfile = function (req, res, next) {
    const userId = req.params.userId;

    if (req.user._id.toString() !== userId) {
        return res.status(401).json({error: 'You are not authorized to view this user profile.'});
    }
    User.findById(userId, (err, user) => {
        if (err) {
            res.status(400).json({error: 'No user could be found for this ID.'});
            return next(err);
        }

        const userToReturn = setUserInfo(user);

        return res.status(200).json({user: userToReturn});
    });
};

exports.listProfiles = function(req, res, next){

    const userId = req.params.userId;
    const role = req.params.role;



    //check if it's super admin role, then proceed, else show error message
    //User.find().all()



};
