const express=require('express')
const mongoose=require('mongoose')
const hbs=require('hbs')
const app=express()

app.set('view engine','hbs')
//connect to db
const db = require("./config/keys").mongoURI;

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));


app.use(express.json({extended:false}))
app.use(express.urlencoded({extended: false}))
app.use('/',require('./routes/index'))
app.use('/api/url', require('./routes/url'))


const port=process.env.PORT || 5000;


app.listen(port,()=>{
    console.log("Server running");
    
})