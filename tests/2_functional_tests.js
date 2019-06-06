var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var router = require('../app')

chai.use(chaiHttp)

suite("Functional Tests ",()=>{

    suite("API routing for /threads/:board",()=>{

        suite(" POST /threads/add ",()=>{
            test("Test api /threads/add",(done)=>{
                chai.request(router)
                    .post('/threads/add')
                    .send({
                        board : "Reason Terrorism",
                        thread_text : " Who is behind it",
                        passward: "abc123"
                    })
                    .end((err,res)=>{
                        assert.equal(res.status,200)
                        assert.isObject(res.body)
                        assert.equal(res.body.board, board)
                        assert.equal(res.body.Thread_text,thread_text)
                        assert.equal(res.body.Passward,password)
                        done()
                    })
            })
        })

        suite("GET",()=>{
            test("GET",(done)=>{
                chai.request(router)
                    .get('/boards/boardlist')
                    .query({})
                    .end((err,res)=>{
                        res.equal(res.status,200)
                        res.equal(Array.isArray(res.body),true)
                        res.property(res.body[0],"Board")
                        res.property(res.body[0],"Thread_text")
                        res.property(res.body[0],"Password")
                        res.property(res.body[0],"Created_on")
                        res.property(res.body[0],"Bump_on")
                        res.property(res.body[0],"Report")
                        done();
                    })
            })
            test("GET",(done) => {
                chai.request(router)
                    .get('/boards/threads/')
                    .query({board:'Marijuana'})
                    .end((err,res) =>{
                        res.equal(res.status,200)
                        res.equal(Array.isArray(res.body), true)
                        res.equal(res.body[0].Board,board)
                        done()
                    })
            })

             test("GET Wrong board Name", (done) => {
                 chai.request(router)
                     .get('/boards/threads/')
                     .query({
                         board: 'Smoking'
                     })
                     .end((err, res) => {
                         res.equal(res.status, 200)
                         res.equal(res.body.Error, "Sorry Something went wrong")
                         done()
                     })
             })
        })

        suite("PUT",()=>{
            test("Thread Report /threads/edit",(done)=>{
                chai.request(router)
                    .put('/threads/edit')
                    .send({
                        id : "5cf16f55cd5e61275cf894cd"
                    })
                    .end((err,res)=>{
                        res.equal(res.status,200)
                        res.equal(res.body.Report,true)
                        done()
                    })
            })
        })

        suite("DELETE",()=>{

            test("Thread DELETE /threads/delete",(done) =>{
                chai.request(router)
                    .delete('/threads/delete')
                    .send({
                        id:"5cf16f55cd5e61275cf894cd",
                        password:"abc123"
                    })
                    .end((err,res)=>{
                        res.equal(res.status,200)
                        res.equal(res.body.message, "Board Deleted")
                        done()
                    })

            })

             test("Thread DELETE would not exist /threads/delete", (done) => {
                 chai.request(router)
                     .delete('/threads/delete')
                     .send({
                         id: "5cf16f55cd5e61275c4cd",
                         password: "abc123"
                     })
                     .end((err, res) => {
                         res.equal(res.status, 200)
                         res.equal(res.body.message, "Incorrect Password")
                         done()
                     })

             })
        })
    })


    suite("API routing for /reply/{options}",()=>{

        suite("POST request /replies/add",()=>{
            test("POST request",(done)=>{
                chai.request(router)
                    .post('/replies/add')
                    .send({
                        board: "Marijuana",
                        id: "5cf16f55cd5e61275c4cd",
                        reply_text: "Some text missing",
                        password: "abc123"
                    })
                    .end((err,res)=>{
                        assert.equal(res.status, 200)
                        assert.isObject(res.body)
                        assert.equal(res.body.Parent_id, id)
                        assert.equal(res.body.Reply_text, reply_text)
                        assert.equal(res.body.Passward, password)
                        done()

                    })
            })
        })


        suite("GET route /boards/thread/{options}",()=>{
             test("GET", (done) => {
                 chai.request(router)
                     .get('/boards/thread/replylist')
                     .query({parent_id:"cf16f55cd5e61275c4cd"})
                     .end((err, res) => {
                         res.equal(res.status, 200)
                         res.equal(Array.isArray(res.body), true)
                         res.property(res.body[0], "Reply_text")
                         res.property(res.body[0], "Password")
                         res.property(res.body[0], "Created_on")
                         res.property(res.body[0], "Bump_on")
                         res.property(res.body[0], "Report")
                         done();
                     })
             })
              test("GET parent_id is wrong", (done) => {
                  chai.request(router)
                      .get('/boards/threads/replylist')
                      .query({
                          parent_id: "cf16f55cd5e61275c4cd"
                      })
                      .end((err, res) => {
                          res.equal(res.status, 200)
                          res.equal(res.body.message, "Something went wrong")
                          done();
                      })
              })

        })
        suite("PUT route /threads/edit",()=>{
            test("PUT",(done)=>{
                chai.request(router)
                    .put('/replies/edit')
                    .send({
                        board: "Marijuana",
                        thread_id: "f16f55cd5e61275c4cd",
                        id: "f16f55cd5e61275dfsdf"
                    })
                    .end((error, res) => {
                        res.equal(res.status, 200)
                        res.equal(res.body.message, "Updated")
                        done();
                    })
            })

            test("PUT reply id wrong", (done) => {
                chai.request(router)
                    .put('/replies/edit')
                    .send({
                        board: "Marijuana",
                        thread_id: "f16f55cd5e61275c4cd",
                        id: "f16f55cd5e61275dfsdf"
                    })
                    .end((error, res) => {
                        res.equal(res.status, 200)
                        res.equal(res.body.message, "Data not found")
                        done();
                    })
            })
            
        })

        suite("DELETE",()=>{

            test("DELETE",(done)=>{
                hai.request(router)
                    .delete('/replies/delete')
                    .send({
                        id: "5cf16f55cd5e61275cf894cd",
                        password: "abc123"
                    })
                    .end((err, res) => {
                        res.equal(res.status, 200)
                        res.equal(res.body.message, "Reply Deleted")
                        done()
                    })
            })
            test("DELETE", (done) => {
                hai.request(router)
                    .delete('/replies/delete')
                    .send({
                        id: "5cf16f55cd5e61275cf894cd",
                        password: "ab23123"
                    })
                    .end((err, res) => {
                        res.equal(res.status, 200)
                        res.equal(res.body.message, "Incorrect Password")
                        done()
                    })
            })
        })
    })
})