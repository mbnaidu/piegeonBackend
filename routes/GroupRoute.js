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
module.exports = router;