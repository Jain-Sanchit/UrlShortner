const mongoose=require('mongoose')


const urlSchema=new mongoose.Schema({
    urlCode:{
        type: String
    },
    longUrl: {
        type: String
    },
    shortUrl: {
        type: String
    },
    date:{
        type:String,
        default: Date.now
    },
    clicks:{
        type: Number,
        default: 0
    }
})

module.exports=mongoose.model('Url',urlSchema)
