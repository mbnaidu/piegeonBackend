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
module.exports = router;