

var reportform = (action, id) => {
    
    var form = document.createElement('FORM')
    form.setAttribute("method", "PUT")
    var button = document.createElement('BUTTON')
    button.setAttribute('class', "report")
    var div = document.createElement('div')
    var buttonText = document.createTextNode('Report')
    button.appendChild(buttonText)
    button.addEventListener("click", (e) => {
        e.preventDefault();
        action({
            id: id
        });
    })
    div.appendChild(button)

    form.appendChild(div)

    return form
}


var deleteform = (action, id) => {
    var pass;
    var form = document.createElement('FORM');
    form.setAttribute("method", "DELETE")
    var input = document.createElement('INPUT')
    var div = document.createElement('div')
    input.setAttribute('placeholder', 'Enter a password')
    input.setAttribute('type', 'password')
    input.onchange = (e) => {
        pass = e.target.value
    }
    var button = document.createElement('BUTTON')
    button.setAttribute('class', "del")
    var buttonText = document.createTextNode('Delete')
    button.appendChild(buttonText)
    button.addEventListener("click", (e) => {
        e.preventDefault()

        action({
            "id": id,
            "password": pass
        })
    })
    div.appendChild(input)
    div.appendChild(button)
    form.appendChild(div)

    return form
}


var replyform = (board_id) => {
    var form = document.createElement('FORM');
    form.setAttribute('action', '/replies/add')
    form.setAttribute("method", "POST")
    var div = document.createElement('div')
    var textArea = document.createElement('TEXTAREA')
    textArea.setAttribute('name', 'thread_text')
    textArea.setAttribute('placeholder', " Quick Reply........   ")
    var input = document.createElement('INPUT')
    input.setAttribute('name', 'password')
    var input2 = document.createElement('INPUT')
    input2.setAttribute('type', 'hidden')
    input2.setAttribute('name', "id")
    input2.setAttribute('value', board_id)
    input.setAttribute('placeholder', 'Enter a password')
    input.setAttribute('type', 'password')
    var button = document.createElement('BUTTON')
    var buttonText = document.createTextNode('Reply')
    button.appendChild(buttonText)
    form.appendChild(textArea)
    form.appendChild(input2)
    div.appendChild(input)
    div.appendChild(button)
    form.appendChild(div)

    return form;
}
exports = {
    reportform,
    deleteform,
     replyform
}