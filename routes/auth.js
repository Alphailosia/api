let jwt = require('jsonwebtoken')
let bcrypt = require('bcryptjs')
let config = require('../config.js')
let User = require('../model/user')

// commentaire :)
function registerUser(req, res) {
    var hashedPassword = bcrypt.hashSync(req.body.params.password, 8);

    User.create({
            name: req.body.params.name,
            email: req.body.params.email,
            password: hashedPassword
        },
        (err, user) => {
            if (err) return res.status(500).send("There was a problem registering the user.")
            // create a token
            var token = jwt.sign({
                id: user._id
            }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({
                auth: true,
                token: token
            });
        });
}

// commentaire :)
function getMe(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({
        auth: false,
        message: 'No token provided.'
    });

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(500).send({
            auth: false,
            message: 'Failed to authenticate token.'
        });

        User.findById(decoded.id, {password:0}, function (err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");

            res.status(200).send(user);
        });
    });
}

// commentaire
function login(req, res) {
    User.findOne({
        email: req.body.params.email
    }, function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        var passwordIsValid = bcrypt.compareSync(req.body.params.password, user.password);
        if (!passwordIsValid) return res.status(401).send({
            auth: false,
            token: null
        });

        var token = jwt.sign({
            id: user._id
        }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.status(200).send({
            auth: true,
            token: token
        });
    });

}

// commentaire
function logout(req, res) {
    res.status(200).send({
        auth: false,
        token: null
    });
}

function checkAdmin(req, res) {
    if(req.query.password=='admin'){
        res.status(200).send({
            admin: true
        });
    } else {
        res.status(200).send({
            admin: false
        });
    }
}

module.exports = {
    registerUser,
    getMe,
    login,
    logout,
    checkAdmin
};