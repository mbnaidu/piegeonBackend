const mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    number: {
        type:String,
        unique: true
    },
    id:String,
    username:String,
    groups:Array,
    special:Array,
});

let UserModal = mongoose.model('user',userSchema);
const user = mongoose.model('user', userSchema);

//Adding new user
user.addUser = function(handlers) {
    var user = new UserModal();
    user.number = handlers.number;
    user.groups = handlers.groups;
    user.special = handlers.special;
    user.id = handlers.id;
    return user.save(function(err, data){
        if(!err) {
            handlers.success(data);
        } else {
            handlers.error(err);
        }
    })
};

user.getPassword = function(handlers) {
    return UserModal.find({number: handlers.number}, {_id:1,id:1,},  function(err, data) {
        if(!err) {
            handlers.success(data);
        } else {
            handlers.error(err);
        }
    })
}
user.getGroup = function(handlers) {
    return UserModal.find({id: handlers.id}, {_id:1},  function(err, data) {
        if(!err) {
            handlers.success(data);
        } else {
            handlers.error(err);
        }
    })
}
user.usersGroup = function(handlers) {
    return UserModal.findOne({number: handlers.number} ,{ _id:1,id:1}, function(err, data) {
        if(!err) {
            
        } else {
            
        }
    })
}
user.getallusers = function(handlers) {
    return UserModal.find(function(err, data) {
        if(!err) {
            handlers.success(data);
        } else {
            handlers.error(err);
        }
    })
}

module.exports = user;