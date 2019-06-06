
document.addEventListener("DOMContentLoaded",()=>{
    var board = document.getElementById('board')
    var thread = document.querySelector('title').textContent;
    

    let http = new XMLHttpRequest()
    http.onreadystatechange = () => {
        if (http.readyState === 4 && http.status === 200) {
            let response = JSON.parse(http.response);
            console.log(response)
            if (Array.isArray(response) === true) {
                response.forEach(element => {
                    threadList(element)
                })
            } else {
                alert("It had no thread")
            }
        }
    }

    http.open("GET", '/boards/thread/' +thread , true)
    http.send()


    var threadList = (element) => {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {

            if (xhr.readyState === 4 && xhr.status === 200) {

                let response = JSON.parse(xhr.response)
                let form = replyform(element._id);
                var del = deleteform(threadDeleteSub, element._id);
                var report = reportform(reportSub, element._id);
                var list = document.getElementById('list')
                var node = document.createElement('LI');
                let text = document.createTextNode(element.Thread_text)
                let replylist = document.createElement('ul');
                replylist.setAttribute("class", "u1")
                node.appendChild(text)
                
                node.appendChild(replylist)
                node.appendChild(form);
                node.appendChild(del)
                node.appendChild(report)
                list.appendChild(node)
                if (Array.isArray(response) === true) {
                    response.forEach(ele => {
                        var del1 = deleteform(delReplySub, ele._id);
                        var report1 = reportform(reportReplySub, ele._id);
                        var nod = document.createElement('LI');
                        var text = ele.Reply_text || "No text"
                        var nodtext = document.createTextNode(text)
                        nod.appendChild(nodtext)
                        nod.appendChild(del1)
                        nod.appendChild(report1)
                        replylist.appendChild(nod)
                    })
                } else {
                    alert("No Reply, No problem you can add here")
                }
            }
        }

        xhr.open('GET', '/boards/thread/replylist/' + element._id, true)
        xhr.send();
        return;
    }

})