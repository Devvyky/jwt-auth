const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

async function auth(req, res, next) {
    let token = req.headers.authorization;
    try {
        let verifyUser = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verifyUser.id)
        console.log(user)
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        res.json({
            status: "failed",
            message: "please login"
        })
    }
}

module.exports = auth