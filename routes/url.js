const express =require('express')
const router=express.Router()
const validUrl=require('valid-url')
const shortId=require('shortid')
const base=require('../config/keys')

const Url=require('../models/url')



router.post('/shorter',async (req,res)=>{
    const {longUrl}=req.body;
    const baseUrl = base.baseURL;

    //check base url
    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json('invalid base url')
    }


    //create url code
    const urlCode=shortId.generate();


    //check long url
    if (validUrl.isUri(longUrl)) {
        try{
            let url= await  Url.findOne({longUrl});

            if(url){
                //res.json(url)
                res.redirect('/')
            }
            else{
                const shortUrl=baseUrl+'/'+urlCode
                const clicks=0;
                url= new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    clicks,
                    date: new Date()
                });


                await url.save().then(()=>{
                    console.log("done");
                    
                })
                res.redirect("/");
                //res.json(url)
            }
        }
        catch(err){
            console.log(err);
            res.redirect("/");
            //res.status(500).json("server error ")
            
        }
    }
    else{
        res.redirect("/");
        //res.status(401).json("Invalid long url")
    }
    
})
module.exports=router