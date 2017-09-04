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

exports.updateProfile = function (req, res, next) {
    const userId = req.params.userId;

    const role = req.params.role;

    //todo check role to accept custom params

    //if role belongs to haulier
    if(role === ROLE_ADMIN){

    }

    // if role belongs to forwarder
    if(role === ROLE_MANAGER){

    }

    // if role belongs to driver
    if(role === ROLE_USER){

    }

    //todo accept profile information in the form of json
    const name = req.params.name;
    const icNumber = req.params.icNumber;
    const passportNumber = req.params.passportNumber;

    //todo accept image of front ic


    //todo accept image of back ic


    //todo accept passport image

    const phone = req.params.phone;

    const licenseClass = req.params.licenseClass;

    const licenseExpiryDate = req.params.licenseExpiryDate;

    const westPortPassNo = req.params.westPortPassNo;

    const westPortPassExpiry = req.params.westPortPassExpiry;

    const northPortPassNo = req.params.northPortPassNo;

    const northPortPassExpiry = req.params.northPortPassExpiry;



    const emergencyContactName = req.params.emergencyContactName;

    const emergencyContactPhone = req.params.emergencyContactPhone;

    const address1  = req.params.address1;

    const address2 = req.params.address2;

    const city = req.params.city;

    const state = req.params.state;

    const country = req.params.country;



    if (req.user._id.toString() !== userId) {
        return res.status(401).json({error: 'You are not authorized to modify this user profile.'});
    }

    User.findById(userId, (err, user) => {
        if (err) {
            res.status(400).json({error: 'No user could be found for this ID.'});
            return next(err);
        }


    });

};
