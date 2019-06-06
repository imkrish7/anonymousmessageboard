

document.addEventListener('DOMContentLoaded',()=>{

    // thread oprations

    var reportsub = document.querySelector('#repsub');
    var threadDelSub = document.querySelector("#delsub");

    reportsub.addEventListener("click",(e)=>{
        e.preventDefault();
        
        reportSub();
    })

    threadDelSub.addEventListener("click",(e) =>{
        e.preventDefault();
        
        threadDeleteSub();
    })

    // Reply oprations
    var reportReply = document.getElementById('replyreportsub');
    var replyDel = document.getElementById('delreplythreadsub')

    reportReply.addEventListener("click",(e) => {
        e.preventDefault();
        reportReplySub()
    })

    replyDel.addEventListener("click",(e) => {
        e.preventDefault();
        delReplySub();
    })

})




