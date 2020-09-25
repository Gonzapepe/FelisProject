const express = require('express')
const router = express.Router();
const User = require('../database/user')
const auth = require('../middleware/auth')

router.get('/contact', auth, async (req,res)=>{
    userId = req.query.id
            try {
            const query = await User.findById( userId )
            console.log(query)
            if(contacts){
            res.send( query)   
            } 
            }catch (err) {
                res.status(500).json({ msg: 'server error' })
            }
        
})

module.exports = router