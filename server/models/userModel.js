const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')


/**
 * Define a Mongooes schema for nurses and patients 
 * with required fields of roleId, firstName, lastName, email, and password
 * Hash password from user registration before saving to database
 * Define a static method 'login' to authenticate user login    
 */


// User schema
const userSchema = new mongoose.Schema({
    roleId: {
        type: String,
        required: [true, 'Please select your role']
    },
    firstName: {
        type: String,
        required: [true, 'Please provide your first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please provide your last name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        lowercase: true,
        validator: [isEmail, 'Please check your email format']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Min length of password is 6']
    },
})

// Hash the password
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// Handle user login
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const isAuth = await bcrypt.compare(password, user.password);
        if (isAuth) {
            return user;
        }
        throw new Error('Incorrect password');
    }
    else {
        throw new Error('Email not found');
    }
}

// Define and export the user model
const User = mongoose.model('user', userSchema);
module.exports = User;