let token = localStorage.getItem("token");


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
        console.log(jsondata[0].content);
    })
    .catch ((err)=> {
        console.log("error", err.message);
    });
