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
        var user = new GroupModal();
        user.groups.push(handlers.groups);
        user.id = handlers.id;
        return user.save(function(err, data){
            if(!err) {
                handlers.success([data._id,data.groups[0].persons,handlers.id]);
            } else {
                handlers.error(err);
            }
        })
})}

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