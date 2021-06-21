const express =  require('express');
const router = express.Router();
let user = require('../Models/user.model')
router.use(express.json());

router.post('/signup',(req, res) => {
    user.addUser({success: function(data){res.status(200).send(data)},
                        error:function(err){res.status(200).send(err)},
                        number:req.body.data.number,
                    });
});
router.post('/profile',(req, res) => {
	user.findById(req.body.data.id)
        .then(user => {
            user.username = req.body.data.username
            user.save()
                .then(() => res.json(user))
                .catch(err => res.status(400).json('Error: ' + err));
            })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/exitgroup',(req, res) => {
	user.findById(req.body.data.userid)
        .then(user => {
            user.groups.map((m)=>{
                if(m === req.body.data.groupid) {
                    let index = user.groups.indexOf(req.body.data.groupid);
                    if (index > -1) {
                        user.groups.splice(index, 1);
                    }
                }
            })
            user.save()
                .then(() => res.json(user))
                .catch(err => res.status(400).json('Error: ' + err));
            })
        .catch(err => res.status(400).json('Error: ' + err));
});
router.post('/getgroups',(req, res) => {
	user.findById(req.body.data.id)
        .then(user => {
            user.save()
                .then(() =>res.json(user))
                .catch(err => res.status(400).json('Error: ' + err));
            })
        .catch(err => res.status(400).json('Error: ' + err));
});
router.post('/setspecialmessagefrom',(req, res) => {
	user.findById(req.body.data.from)
        .then(add => {
            add.special.push(req.body.data.special)
            add.save()
                .then(() =>{})
                .catch(err => res.status(400).json('Error: ' + err));
            })
        .catch(err => res.status(400).json('Error: ' + err));
});
router.post('/setspecialmessageto',(req, res) => {
	user.findById(req.body.data.to)
        .then(add => {
            add.special.push(req.body.data.special)
            add.save()
                .then(() =>{})
                .catch(err => res.status(400).json('Error: ' + err));
            })
        .catch(err => res.status(400).json('Error: ' + err));
});
router.post('/admingroup',(req, res) => {
	user.findById(req.body.datas.userid)
        .then(user => {
            user.groups.push(req.body.datas.groupid)
            user.save()
                .then(() => res.json(user))
                .catch(err => res.status(400).json('Error: ' + err));
            })
        .catch(err => res.status(400).json('Error: ' + err));
});
router.post('/login',(req, res) => {
    user.getPassword({success:function(data){res.status(200).send(data)},
                            error:function(err){res.send(err)},
                        number:req.body.data.number
                    });
});
router.post('/usercheck', function(req, res) {
    user.findOne({number: req.body.data1.number}, function(err, user){
        if(err) {
            console.log(err);
        }
        if(user) {
            user.groups.push(req.body.data1.groupid)
            user.save(function (err) {
                if(err){console.log(err)}
            });
        } else {
        }
    });
});
router.post('/messagecheck', function(req, res) {
    user.findOne({number: req.body.data.number}, function(err, user){
        if(err) {
            console.log(err);
        }
        if(user) {
            user.save().then(() => res.json(user))
        } else {
        }
    });
});
router.post('/exitgrouptoall', function(req, res) {
    user.findOne({number: req.body.data.number}, function(err, user){
        if(err) {
            console.log(err);
        }
        if(user) {
            user.groups.map((m)=>{
                if(m === req.body.data.groupid) {
                    let index = user.groups.indexOf(req.body.data.groupid);
                    if (index > -1) {
                        user.groups.splice(index, 1);
                    }
                }
            })
            user.save().then(() => res.json(user))
        } else {
            res.json(user)
        }
    });
});
router.post('/finduser',(req, res) => {
    
	user.findById(req.body.data.number)
        .then(donor => {
            donor.save()
                .then(() => res.json(donor))
                .catch(err => res.status(400).json('Error: ' + err));
            })
        .catch(err => res.status(400).json('Error: ' + err));
});
router.post('/getallusers',(req, res) => {
    user.getallusers({success: function(data){res.status(200).send(data)},
                        error:function(err){res.status(200).send(err)}
                    });
});
module.exports = router;