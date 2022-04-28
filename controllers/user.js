const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require('../models/User');

const register = async (req, res) => {
    try {
        const user = await User.create({
            name: req.body.name,
            contact: req.body.contact,
            email: req.body.email,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8)
        });

        const token = jwt.sign({
            user: user
        }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 hours
        });

        return res.json({
            user,
            access_token: token
        });
    } catch (error) {
        return res.status(406).send({
            message: "Unable To Register!"
        });
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        }).exec();

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        const token = jwt.sign({
            user: user
        }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 hours
        });
        // if (!req.body.username || !req.body.password) {

        // }
        return res.status(200).send({
            user,
            access_token: token
        });
    } catch (error) {
        return res.status(406).send({
            message: "Unable To Login!"
        });
    }

}

module.exports = {
    register,
    login
}