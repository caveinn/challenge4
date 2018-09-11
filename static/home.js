if(typeof localStorage.token === "undefined"){
    window.location = "login.html";
}
let token = localStorage.getItem("token");
let button =document.getElementById('button0');
let modal = document.getElementById('addentry');
let subm = document.getElementById('submit');
let editpost = false;
console.log(subm);
document.getElementById("homeform").addEventListener("submit", function(e) {
    e.preventDefault(); });
let newpost = false;
const uri = "https://kevin-diary-v2.herokuapp.com/api/v2/entries"
let header = new Headers();
header.append("access_token", token);
let req = new Request(uri,{
    headers: header,
    method : "GET"
});
fetch(req).then((response) => {
    if(response.ok){
        return response.json()
    } }).then((jsondata) => {
        if (jsondata.length < 1){

        }
        else{
            for (let entry of jsondata){
                console.log(entry);
            document.getElementById("entrytable").innerHTML +=`
			<tr>
				<td class="title">`+ entry["title"]+`</td>
				<td>`+ entry["content"]+`</td>
				<td>
				<button onclick = "edit(`+entry.id +`)"  id="button1"  class="button1">Edit </button>
				<br><button  onclick = "deletes(`+entry.id +`) "class="button2">Delete</button>
                </td>
            
				<td>`+ entry["date_created"]+`</td>
			</tr>`;
			}
        }

    })
    .catch ((err)=> {
        console.log("error", err.message);
    });
button.onclick =() => {
        newpost = true;
        modal.style.display="block";
    }
deletes = (id) => {
        let newreq = new Request(uri+"/"+id, {
            method:"delete",
            headers:header
        })
        fetch(newreq).
        then((res)=>{
            if(res.ok){
                return res.json();
            }
        }
    ).then((data) =>{
        window.location = "home.html"
    }).
    catch(error => console.log(error));
      
        
    }  
edit = (id) => {
    let newreq = new Request(uri+"/"+id, {
        method:"get",
        headers:header
    })
    fetch(newreq).
    then((res)=>{
        if(res.ok){
            return res.json();
        }
    }).
    then((data)=>{
        
        document.getElementById("title").value = data.title;
        document.getElementById("content").value = data.content;
        console.log(data.title)
        
    }
).catch(error => console.log(error));
modal.style.display = "block";
    editpost = true;
    localStorage.setItem("id",id);
  
    
}
subm.onclick = () =>{
    entry = {
        "title" : document.getElementById("title").value,
        "content": document.getElementById("content").value
    }
    if(editpost){
        header.append("Content-Type", "application/json");
        let addreq = new Request(uri + "/"+localStorage.getItem("id"), {
            headers:header,
            body:JSON.stringify(entry),
            method:"PUT"
        
        });
        console.log(addreq);
        fetch(addreq)
        .then((response) => {
            console.log(response);
            if (response.ok){
            editpost= false;
            localStorage.removeItem("id");
            modal.style.display="none";
            return response.json()
        }
        else{
            console.log(response.json());
        }
    })
        .then((jsondata) => {
            window.location= "home.html"
        });
        
    }
    if(newpost){
        document.getElementById("title").value = '';
        document.getElementById("content").value = '';
        header.append("Content-Type", "application/json");
        let addreq = new Request(uri, {
            headers:header,
            body:JSON.stringify(entry),
            method:"POST"
        });
        console.log(addreq);
        fetch(addreq)
        .then((response) => {
            console.log(response);
            if (response.ok){
            newpost = false;
            modal.style.display="none";
            return response.json();
        }
        else{
            console.log(response.json());
        }
    })
        .then((jsondata) => {
            document.getElementById("entrytable").innerHTML +=`
			<tr>
				<td class="title">`+ jsondata["title"]+`</td>
				<td>`+ jsondata["content"]+`</td>
				<td>
				<button onclick = "edit(`+jsondata +`)"  id="button1"  class="button1">Edit </button>
				<br><button  class="button2">Delete</button>
                </td>
            
				<td>`+ jsondata["date_created"]+`</td>
			</tr>`;
        });
        
    }
    
}