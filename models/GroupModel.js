const mongoose = require('mongoose');
let groupSchema = new mongoose.Schema({
    groups:Array,
    id:String,
});

let GroupModal = mongoose.model('group',groupSchema);
const group = mongoose.model('group', groupSchema);

//Adding new user
group.createGroup = function(handlers) {
    return GroupModal.find({id: handlers.id}, {groups:1},  function(err, data) {
        if(data.length > 0) {
            group.findById(data[0]._id)
                .then(donor => {
                    donor.groups.push(handlers.groups)
                    donor.save()
                        .then(() => console.log(donor))
                        .catch(err => console.log(err));
                    })
                .catch(err => console.log(err));
        }
        else {
                var user = new GroupModal();
                user.groups.push(handlers.groups);
                user.id = handlers.id;
                return user.save(function(err, data){
                    if(!err) {
                        handlers.success(data);
                    } else {
                        handlers.error(err);
                    }
                })
        }
    })
}

group.getGroup = function(handlers) {
    return GroupModal.find({number: handlers.number}, {_id:1},  function(err, data) {
        if(!err) {
            handlers.success(data);
        } else {
            handlers.error(err);
        }
    })
}
group.deleteGroup = function(handlers) {
    return GroupModal.find({number: handlers.number}, {_id:1},  function(err, data) {
        if(!err) {
            handlers.success(data);
        } else {
            handlers.error(err);
        }
    })
}
group.getAllGroups = function(handlers) {
    return GroupModal.find({number: handlers.number}, {_id:1},  function(err, data) {
        if(!err) {
            handlers.success(data);
        } else {
            handlers.error(err);
        }
    })
}
module.exports = group;