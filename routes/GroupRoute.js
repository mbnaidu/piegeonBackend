const express =  require('express');
const router = express.Router();
let group = require('../Models/GroupModel')
router.use(express.json());

router.post('/creategroup',(req, res) => {
    group.createGroup({success: function(data){res.status(200).send(data)},
                        error:function(err){res.status(200).send(err)},
                        groups:req.body.data.groups,
                        id:req.body.data.id,
                    });
});
router.post('/getallgroups',(req, res) => {
        group.findById(req.body.data1.id, function(err, data) {
            if (err) {
            res.send(err);
            } else {
            res.json(data);
            }
        });
});
router.post('/deletegroup',(req, res) => {
    console.log(req.body.data1.deletegroupid)
    group.findByIdAndDelete(req.body.data1.deletegroupid)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;