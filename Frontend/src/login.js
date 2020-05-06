document.addEventListener("DOMContentLoaded", () => {
    console.log("Login DOM Loaded")
    const form = document.querySelector("#form-id")
    form.addEventListener("submit", handleForm)
    
})

function handleForm(event) {
    event.preventDefault()
    const userInput = document.querySelector("#user-input")
    fetch("http://localhost:3000/users")
    .then(resp => resp.json())
    .then(userArray => {
        userArray.find(user => {
            if (user.username === userInput.value) {
                localStorage.id = user.id
                location.reload()
            }
        })
    })
}
