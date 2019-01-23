var mongoose = require('mongoose');
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

mongoose.model('User', UserSchema);