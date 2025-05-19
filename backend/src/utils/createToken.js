import jwt from "jsonwebtoken";

const generateToken = function (user) {
    const token = jwt.sign(
        {
            _id : user._id,
            email : user.email,
            firstName : user.name.firstName,
            lastName : user.name.lastName
        },
        process.env.ACCESS_TOKEN_SECRET, 
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )

    return token
}

export { generateToken }