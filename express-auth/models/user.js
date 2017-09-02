'use strict';

const mongoose = require('mongoose');
const crypto   = require('crypto');
const pbkdf2   = crypto.pbkdf2;

const ROLE_MEMBER = require('../constants').ROLE_MEMBER;
const ROLE_CLIENT = require('../constants').ROLE_CLIENT;
const ROLE_OWNER = require('../constants').ROLE_OWNER;
const ROLE_ADMIN = require('../constants').ROLE_ADMIN;

const config = require('../config/main');

const Schema = mongoose.Schema;

const SALT   = config.secret;
const ITER   = 100000;
const KEYLEN = 512;
const DIGEST = 'sha512';

//================================
// User Schema
//================================
const UserSchema = new Schema({
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        profile: {
            // firstName: {type: String},
            // lastName: {type: String}
        },
        role: {
            type: String,
            enum: [ROLE_MEMBER, ROLE_CLIENT, ROLE_OWNER, ROLE_ADMIN],
            default: ROLE_MEMBER
        },
        resetPasswordToken: {type: String},
        resetPasswordExpires: {type: Date}
    },
    {
        timestamps: true
    });

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', function (next) {
    const user       = this;
    const changePass = user.isModified('password');
    if (!changePass) { return next(); }

    pbkdf2(user.password, SALT, ITER, KEYLEN, DIGEST, (err, key) => {
        if (err) { return next(err); }
        user.password = key.toString('hex');
        next();
    });
});

// Method to compare password for login
UserSchema.methods.comparePassword = function (password, next) {

    pbkdf2(password, SALT, ITER, KEYLEN, DIGEST, (err, key) => {
        if (err) { return next(err); }
        const isMatch = this.password === key.toString('hex');
        next(null, isMatch);
    });

};

module.exports = mongoose.model('User', UserSchema);
