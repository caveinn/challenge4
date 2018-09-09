buton = document.getElementById('loginbtn')
document.getElementById("loginform").addEventListener("submit", function(e) {
e.preventDefault(); });


buton.onclick = function(){
  
  let user= {
  username: document.getElementById("username").value,
  password: document.getElementById("password").value,
  }

	fetch("https://kevin-diary-v2.herokuapp.com/api/v2/auth/login", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      .then((res) =>{
        if(res.ok){
          return res.json();
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.token) ;
        window.location = "home.html";

      })
      // catch error that may occur
      .catch(error => console.log(error));

}