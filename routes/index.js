const express = require('express')
const router = express.Router()
const Url = require("../models/url");

router.get('/',async (req,res)=>{
    const urls=await Url.find()
    res.render('home',{urls:urls})
})

router.get("/:short", async (req, res) => {
    const shortenUrl= await Url.findOne({urlCode: req.params.short})
    console.log(shortenUrl);
    
    if(shortenUrl==null){
        return res.sendStatus(404)
    }

    shortenUrl.clicks++;
    shortenUrl.save()

    res.redirect(shortenUrl.longUrl)



});

module.exports = router