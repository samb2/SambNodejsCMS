const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    firstName : { type : String , require : true },
    lastName : { type : String , require : true },
    userName : { type : String , require : true },
    email : { type : String , unique : true  ,require : true},
    password : { type : String ,  require : true },
    admin : { type : Boolean ,  default : 0 }
} , { timestamps : true });

userSchema.pre('save' , function(next) {

    bcrypt.hash(this.password , bcrypt.genSaltSync(15) , (err, hash) => {
        if(err) console.log(err);
        this.password = hash;
        next();
    });

});

module.exports = mongoose.model('User' , userSchema);