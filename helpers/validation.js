
const { check } = require('express-validator');

const validation = {

    signupValidation: function () {
        var validation = [
            check('username', 'username is empty!').notEmpty(),
            check('email', 'email is empty!').notEmpty(),
            check('password', 'password should contain at least 8 characters!').isLength({min: 8, max: 8}),
        ];

        return validation;
    },

    loginValidation: function () {
        var validation = [
            check('email', 'email is empty!').notEmpty(),
            check('password', 'password is empty!').notEmpty(),
        ];
        return validation;
    }
}

module.exports = validation;
