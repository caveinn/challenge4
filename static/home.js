let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZ…M4N30.y2Qk_Zdw7FIBzbRD5Y2sIzqxh7d0beE6nLJYbJuEPyc'

const uri = "https://kevin-diary-v2.herokuapp.com/api/v2/entries"
let header = new Headers();
header.append  ("token",token)
let req = new Request(uri,{
    headers: header,
    method : "GET"
});
fetch(req).then((response) => {
    if(rsponse.ok){
        console.log(response);
    } }).then((jsondata) => {

    })
    .catch ((err)=> {
        console.log("error", err.message);
    });
