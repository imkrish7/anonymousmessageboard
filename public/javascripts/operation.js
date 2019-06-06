var reportSub = (formdata = null) => {
 
        var formData ;
         var queryString = {};
         console.log(formdata)
        if(formdata === null){

            var report = document.getElementById('report');
            formData = new FormData(report)
            for (pair of formData) {
                queryString[pair[0]] = pair[1];
            }

        }
        else{

            for (let [key, value] of Object.entries(formdata)) {
               
                queryString[key] = value
            }
        }

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert(xhr.response.message)
        }
    }
    xhr.open("PUT", '/threads/edit?id=' + queryString["id"], true);
    
    xhr.send() 
}

var threadDeleteSub = (formdata = null) => {
    
//  console.log(formdata)

      var formData;
      var queryString = {};
      if (formdata === null) {

         var del = document.querySelector('#delthread');
          formData = new FormData(del);
           
           for (pair of formData) {
               queryString[pair[0]] = pair[1];
           }

      } else {

          for (let [key, value] of Object.entries(formdata)) {
              queryString[key]=value
          }
      }
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert(xhr.response.message)
        }
    }
   

    xhr.open("DELETE", "/threads/delete?id=" + queryString['id']+"&password=" + queryString['password'], true);
    xhr.send(null)
}




var reportReplySub = (formdata = null) => {
     

     var formData;
     var queryString = {};
     if (formdata === null) {

         let reportreply = document.getElementById('replyreport');
         formData = new FormData(reportreply)

         
         for (pair of formData) {
             queryString[pair[0]] = pair[1];
         }
     } else {

         for (let [key, value] of Object.entries(formdata)) {
             queryString[key] = value
         }
     }

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
           alert(xhr.response.message)
        }
    }
    

    xhr.open('PUT', '/replies/edit?id=' + queryString['id'], true);
    xhr.send()

}

var delReplySub = (formdata = null) => {

    var formData;
    var queryString = {};
    if (formdata === null) {

        let delReply = document.getElementById('delreplythread');
        formData = new FormData(delReply);
        
        for (pair of formData) {
            // console.log(pair[0])
            queryString[pair[0]] = pair[1];
        }

    } else {
        // console.log()
        for (let [key, value] of Object.entries(formdata)) {
            queryString[key] = value
        }
    }

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert(xhr.response.message)
        }
    }
     
    xhr.open("DELETE", "/replies/delete?id=" + queryString['id']+"&password=" + queryString['password'], true);
    xhr.send()

}

exports = {
    reportSub,
    threadDeleteSub,
    delReplySub,
    reportReplySub
}