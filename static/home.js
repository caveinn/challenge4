let token = localStorage.getItem("token");
let button =document.getElementById('button0');
let modal = document.getElementById('addentry');
let subm = document.getElementById('submit');
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
				<button id="button1"  class="button1">Edit </button>
				<br><button  class="button2">Delete</button>
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
subm.onclick = () =>{
    entry = {
        "title" : document.getElementById("title").value,
        "content": document.getElementById("content").value
    }
    if(newpost){
        alert();
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
				<button id="button1"  class="button1">Edit </button>
				<br><button  class="button2">Delete</button>
                </td>
            
				<td>`+ jsondata["date_created"]+`</td>
			</tr>`;
        });
    }
    
}