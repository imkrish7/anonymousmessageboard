document.addEventListener("DOMContentLoaded",() =>{

    var xhr = new XMLHttpRequest();
    var list = document.getElementById('list')

    xhr.onreadystatechange = () =>{

        if(xhr.readyState === 4 && xhr.status === 200){
            var boards = JSON.parse(xhr.response);
            var boardVarification = [];
            boards.forEach((element,i)=> {
                if(boardVarification.indexOf(element.Board)<0){
                var listNode = document.createElement('LI')
                var boardAnchor = document.createElement('a');
                boardAnchor.setAttribute("href","/boards/" + element.Board+"/")
                var dateparaNode = document.createElement('p')
                var dateText = document.createTextNode(moment(element.Created_on).format('DD-MM-YYYY'))
                dateparaNode.appendChild(dateText)
                var anchorText = document.createTextNode(element.Board)
                boardAnchor.appendChild(anchorText)
                boardAnchor.appendChild(dateparaNode)
                listNode.append(boardAnchor)
                list.appendChild(listNode)
                boardVarification.push(element.Board)
                }
                 
            });
        }
    }

    xhr.open('GET','/boards/boardlist',true)
    xhr.send()
})