const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueString = require('unique-string');

const userSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userName: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    admin: {type: Boolean, default: 0},
    rememberToken: {type: String, default: null}
}, {timestamps: true, toJSON: {virtuals: true}});

userSchema.pre('save', function (next) {

    bcrypt.hash(this.password, bcrypt.genSaltSync(15), (err, hash) => {
        if (err) console.log(err);
        this.password = hash;
        next();
    });

});

userSchema.pre('findOneAndUpdate', function (next) {
    let salt = bcrypt.genSaltSync(15);
    this.getUpdate().$set.password = bcrypt.hashSync(this.getUpdate().$set.password, salt);
    next();
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.setRememberToken = function (res) {
    const token = uniqueString();
    res.cookie('remember_token', token, {maxAge: 1000 * 60 * 60 * 24 * 90, httpOnly: true, signed: true});
    this.update({rememberToken: token}, err => {
        if (err) console.log(err);
    });
};

userSchema.virtual('courses', {
    ref: 'Course',
    localField: '_id',
    foreignField: 'user'
});

userSchema.methods.isVip = function () {
    return true;
};

userSchema.methods.checkLearning = async function (course) {
    return false;
};


module.exports = mongoose.model('User', userSchema);