const express =  require('express');
const router = express.Router();
let user = require('../Models/user.model')
router.use(express.json());

router.post('/usersignup',(req, res) => {
    user.addUser({success: function(data){res.status(200).send(data)},
                        error:function(err){res.status(200).send(err)},
                        number:req.body.data.number,
                    });
});
router.post('/login',(req, res) => {
    user.getPassword({success:function(data){res.status(200).send(data)},
                            error:function(err){res.send(err)},
                        username:req.body.data.username
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