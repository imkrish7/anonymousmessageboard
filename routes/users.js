var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID
var { Board , Reply } = require('../model/board')

router.post('/add',(req,res)=>{
  let thread_id = req.body.id;
  let thread_text = req.body.thread_text;
  let password = req.body.password;
  let url = req.headers.referer;
  let find = req.headers.origin;
  
  let newReply = new Reply({
    Parent_id : thread_id,
    Reply_text: thread_text,
    Password: password,
    Created_on : new Date().toUTCString(),
    Bump_on : new Date().toUTCString(),
    Report: false
  })

  newReply.save((error,data) => {

    if(error)
        res.send({
          "message": "Sorry! Something went wrong"
        })

    res.redirect(url.substr(find.length))
  })
})


router.put('/edit',(req,res)=>{
  let reply_id = req.query.id;

  Reply.findById({_id:ObjectId(reply_id)},(error,data)=>{
      
    if(error)
        res.send({"message":"Sorry! Something went wrong"})
    
    if(data!==null){

      data.Report = true;

      data.save((error,d)=>{
        if(error)
            res.send(error)
        
        res.send({"message":"Updated"})    
      })
    }
    else{
      res.send({ "message":"Data not found" })
    }
  })

})


router.delete('/delete',(req,res) => {

  let password = req.query.password;
  let reply_id = req.query.id;
  let url = req.headers.referer;
  let find = req.headers.origin;
  
  Reply.findById({_id: ObjectId(reply_id)},(error,data)=>{

    if(error)
        res.send({
          "message": "Sorry! Something went wrong"
        })
    
    if(data!==null && data.Password === password){
      Reply.deleteOne({
        _id: ObjectId(reply_id)
      },(error)=>{
        if(error)
          res.send({"message":"Sorry! Something went wrong"})

         res.redirect(url.substr(find.length))
      })

    }
    else {    
    res.send({"message":"Incorrect Password"}) 
    }   
  })
})

module.exports = router;

 