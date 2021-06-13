const mongoose = require('mongoose');
let messagesSchema = new mongoose.Schema({
    userId:String,
    senderId:String,
    messages:Array,
});

let messagesModal = mongoose.model('message',messagesSchema);
const message = mongoose.model('message', messagesSchema);

//Adding new message
message.addMessage = function(handlers) {
    return messagesModal.find({userId: handlers.userId,senderId:handlers.senderId}, {userId:1,senderId:1,_id:1,messages:1},  function(err, data) {
        if(data.length > 0) {
            handlers.success(data);
        } else {
            handlers.error(err)
        }
    })
}
message.getChat = function(handlers) {
    return messagesModal.find({userId: handlers.userId,senderId:handlers.senderId}, {userId:1,senderId:1,_id:1,messages:1},  function(err, data) {
        if(data.length > 0) {
            handlers.success(data);
        }
        else {
            return messagesModal.find({userId: handlers.senderId,senderId:handlers.userId}, {userId:1,senderId:1,_id:1,messages:1},  function(err, data) {
                if(data.length > 0) {
                    handlers.success(data);
                } else {
                    var message = new messagesModal();
                message.userId = handlers.userId;
                message.senderId = handlers.senderId;
                message.messages = message.messages;
                return message.save(function(err, data){
                    if(!err) {
                        handlers.success(data);
                    } else {
                        handlers.error(err);
                    }
                })
                }
            })
        }
    })
}

module.exports = message;