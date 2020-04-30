var loggedId = 0
const url = "http://localhost:3000/users"

document.addEventListener("DOMContentLoaded", function(){

    if(loggedIn > 0){
        fetchUsers()
    }else{
        console.log("you need to login")
        // loadLoginScreen();
    }


    
})

function logIn(){
}

function createNewUser(){
    
    let data = {
        username:
        fullname:
        bio: 
    }
    
    fetch()
    method: "POST",

    .then(resp => resp.json())
    .then(user =)
}

function logOut(){
    loggedIn = 0
}

function fetchUsers() {
    fetch(`${url}/${loggedId}`)
    .then(resp => resp.json())
    .then(user => renderUser(user[0]))
}

function renderUser(user) {
    // const userDiv = document.createElement("div")
    // const usernameh4 = document.createElement("h4")
    // username.innerText = user.username
    // const fullnameh2 = document.createElement("h2")
    // fullnameh2.innerText = user.fullname
    // const post
}