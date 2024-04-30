const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const mongoose = require('mongoose');

const userSignup = async (req, res) => {
    try {
       
        const { email, password } = req.body
        console.log(req.body);

        const emailAlredyExist = await User.findOne({ email: email })
        if (emailAlredyExist) {
            return res.status(400).send({ message: "Email alredy exist" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            email: email,
            password: hashedPassword
        })
        const userSaved = await user.save()
        if (userSaved) {
            return res.status(201).send({ message: "user registered successfully" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error })
    }
}


const userLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).send({ message: "user not found" })
        }
        const hashedPassword = user.password
        const password = await bcrypt.compare(req.body.password, hashedPassword)
        if (!password) {
            return res.status(404).send({ message: "password not match" })
        }
        const { _id } = user.toJSON();
        console.log(_id, "idddddddddd");
        const token = jwt.sign({ _id: _id }, process.env.JWT_USER_SECERETKEY, { expiresIn: 360000 })
        console.log(token);

        res.status(200).json(
            { token }
        )
    } catch (error) {
        res.status(500).send({ message: "Error in user login" })
        console.log(error);
    }
}



module.exports = {
    userSignup,
    userLogin
}