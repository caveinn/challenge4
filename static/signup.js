buton = document.getElementById('signbtn')
document.getElementById("signform").addEventListener("submit", function(e) {
e.preventDefault(); });


buton.onclick = function(){
  
  let user= {
  username: document.getElementById("username").value,
  password: document.getElementById("password").value,
  email:document.getElementById("email").value
  }

	fetch("https://kevin-diary-v2.herokuapp.com/api/v2/auth/signup", {
        method: 'POST',
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
          
        },
        body: JSON.stringify(user)
      })
      .then(res =>{ 
        return res.json();
      })
      .then(data => {
        document.getElementById("message").innerHTML = data.message;
        if (data[0].message == "user_created") {
          let msg = data[0].message;
          console.log(msg)
          document.getElementById("message").innerHTML = msg;
          setTimeout(() => {document.getElementById("message").innerHTML = "";}, 5000);
          window.location = "login.html";
        } else {
          let msg = data.message;
          document.getElementById("message").innerHTML = msg;
          setTimeout(() => {document.getElementById("message").innerHTML = "";}, 5000);

        }

      })
      // catch error that may occur
      .catch(error => console.log(error));

}