
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema
({
    username: String,
    email: String,
    firstName: String,
    lastName: String,
    password: String
});

const User = mongoose.model('User', userSchema);

function validateUser(user)
{
    const schema = Joi.object
    ({
        username: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(50).required(),
        password: JOI.string().min(3).max(50).required()
    })
    return schema.validate(user);
}

module.exports = User
//module.exports = mongoose.model('User', userschema)
