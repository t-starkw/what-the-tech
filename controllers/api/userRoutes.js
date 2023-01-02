const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async  (req, res) => {
    try{
        const result = await User.create(req.body);
        res.json(result);
    }
    catch(err){
        res,json(err)
    }

})

module.exports = router;