const mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    number: {
        type:String,
        unique: true
    },
    id:String,
});

let UserModal = mongoose.model('user',userSchema);
const user = mongoose.model('user', userSchema);

//Adding new user
user.addUser = function(handlers) {
    var user = new UserModal();
    user.number = handlers.number;
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
    return UserModal.find({username: handlers.username}, {number:1,_id:1},  function(err, data) {
        if(!err) {
            handlers.success(data);
        } else {
            handlers.error(err);
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