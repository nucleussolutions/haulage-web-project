// Importing Node packages required for schema
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const config = require('../config/main');
const crypto   = require('crypto');
const pbkdf2   = crypto.pbkdf2;

const SALT   = config.secret;
const ITER   = 100000;
const KEYLEN = 512;
const DIGEST = 'sha512';

const ROLE_USER = require('../constants').ROLE_USER;
const ROLE_MANAGER = require('../constants').ROLE_MANAGER;
const ROLE_SUPER_ADMIN = require('../constants').ROLE_SUPER_ADMIN;
const ROLE_ADMIN = require('../constants').ROLE_ADMIN;

const Schema = mongoose.Schema;

//= ===============================
// User Schema
//= ===============================
const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    // firstName: { type: String },
    // lastName: { type: String }
  },
  role: {
    type: String,
    enum: [ROLE_USER, ROLE_MANAGER, ROLE_SUPER_ADMIN, ROLE_ADMIN],
    default: ROLE_USER
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
},
  {
    timestamps: true
  });

//= ===============================
// User ORM Methods
//= ===============================

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
