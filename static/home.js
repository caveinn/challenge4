let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im5ldyIsImV4cCI6MTUzNjUwNDA1MX0.9wvmqnqHIZpTdCo5UTxh273vFgAbZGxTBp0x4N_2o38"


const uri = "https://kevin-diary-v2.herokuapp.com/api/v2/entries"
let header = new Headers();
header.append("access_token", token);
let req = new Request(uri,{
    headers: header,
    method : "GET"
});
fetch(req).then((response) => {
    if(response.ok){
        console.log(response);
    } }).then((jsondata) => {

    })
    .catch ((err)=> {
        console.log("error", err.message);
    });
