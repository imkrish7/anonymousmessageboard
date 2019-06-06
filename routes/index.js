var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID

var { Board, Reply } = require('../model/board')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Anonymous Message Board' });
});


router.post('/threads/add',(req,res)=>{
  let board = req.body.board.trim();
  let thread = req.body.thread_text;
  let password = req.body.password;
  
  let newBoard= new Board({
      Board: board,
      Thread_text: thread,
      Password: password,
      Created_on:new Date().toISOString(),
      Bump_on:new Date().toISOString(),
      Report: false
  })

  newBoard.save((error,data)=>{
    if(error)
      res.send({
        "message": "Sorry! Something went wrong"
      })
    res.send(data)  
  })

})


router.put('/threads/edit',(req,res)=>{

    
    let id = req.query.id;

    
    
    Board.findById({_id: ObjectId(id)},(error,data)=>{
  
      if(error)
          res.send({"message":"Sorry! Someting went wrong"})

      if(data!==null){
        data.Reprot = true;
        data.save((error,sd)=>{

          if(error)
              res.send(error)

           res.send({"message":"Success!"});   
        })
      } 
      else{
        res.send({"message":"Id does not exist "})
      }   
    })
})


router.delete('/threads/delete',(req,res)=>{

  
  let id = req.query.id;
  let password = req.query.password;
  
  Board.findById({_id: ObjectId(id)},(error,data)=>{
    if(error)
        res.send({
          "message": "Something went wrong.!"
        })

        if(data!==null && data.length > 0 && data.Password === password ){
          Board.deleteOne({
            _id: ObjectId(id)
          },(error)=>{

            if(error)
                console.log(error)

                Reply.deleteMany({
                  Parent_id: id
                }, (error, datum) => {

                  if (error)
                    console.log(error)

                  if (datum !== null) {
                    res.send({
                      "message": "Board Deleted"
                    })
                  }
                })
          })
          
           
        }
        else{
          res.send({
            "message": "Incorrect Password"
          })

        }
    
    
  })

})

module.exports = router;
