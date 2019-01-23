var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstname: String,
    lastName: String,
    username: {
        type: String, 
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        validate: [
            function(password){
                return password && password.length >= 6;
            },
            'Password must be at least 6 characters'
        ]
    },
    salt: {
        type: String
    },
    email: {
        type: String, 
        index: true,
        match: /.+\@.+\.+/
    },
    role: {
        type: String,
        enum: ['admin','user','member']
    },
    created: {
        type: Date,
        default: Date.now
    },
/*     group_id: {
        type: Schema.ObjectId,
        ref: 'GroupMember'
    } */
});

//ก่อน Save
UserSchema.pre('save', function(next){
    if(this.password){
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

//สร้าง method ให้กับ model instance
UserSchema.methods.hashPassword = function(password){
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
}

UserSchema.methods.authenticate = function(password){
    return this.password === this.hashPassword(password);
}


mongoose.model('User', UserSchema);