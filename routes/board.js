var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var { Board,Reply } = require('../model/board')

router.get('/', function (req, res, next) {
    res.render('board', {
        title: 'Boards'
    });
});

router.get('/boardlist', (req, res) => {
    Board.find({}, (error, data) => {
        if (error)
            res.send(error)
        if (data !== null) {
            res.send(data);
        } else {
            res.send({
                "message": "Something went wrong"
            })
        }
    })
})
router.get('/:board', (req, res) => {
    
    res.render('thread', {
        "title": req.params.board
    })

})

router.get('/threads/:board', (req, res) => {

    var board = req.params.board;
    
    Board.find({
        Board: board
    }, (error, data) => {

        if (error)
            res.send(error)

        if (data !== null && data.length > 0) {
            res.send(data)
        } 
        else {
            res.send({
                "message": "Sorry Something went wrong"
            })
        }
    })

})


router.get('/thread/replylist/:parent_id', (req, res) => {
    var parent_id = req.params.parent_id;
    Reply.find({
        Parent_id: parent_id
    }, (error, data) => {
        if (error)
            res.send(error)

        if (data !== null && data.length > 0) {
            res.send(data)

        } else {
            res.send({
                "message": "Something went wrong"
            })
        }
    })
})

router.get('/:boardName/thread/:id',(req,res)=>{
    res.render('replylist',{title:req.params.id,board:req.params.boardName})
})

router.get('/thread/:id', (req, res) => {
    var id = req.params.id;
    Board.find({_id: ObjectId(id)},(error,data)=>{

        if(error)
            res.send({"message":"Something went wrong"})
        
        if(data!==null){
            res.send(data)
        }
        else{
            res.send({"message":"Data not found"})
        }
    })
})

module.exports = router;