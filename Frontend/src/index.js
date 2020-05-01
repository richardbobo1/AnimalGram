var loggedId = 39;
const urlUsers = "http://localhost:3000/users"
const urlPosts =  "http://localhost:3000/posts"
const urlFriends = "http://localhost:3000/friends"

document.addEventListener("DOMContentLoaded", function(){

    displayHeader();
    
    if(loggedId > 0){
        fetchUser()
        fetchPosts()
        // fetchFriends()
        exploreUsers()
    }else{
        console.log("you need to login")
        // loadLoginScreen();
    }

    let newPostForm = document.getElementById("create-post-form")
    newPostForm.addEventListener("submit", createPost )
    
})

function logIn(){
}

// function createNewUser(){
    
//     let data = {
//         username:
//         fullname:
//         bio: 
//     }
    
//     fetch()
//     method: "POST",

//     .then(resp => resp.json())
//     .then(user =)
// }

function displayHeader(){
    // hides or shows logout button in header 
    let headerNode = document.getElementById("login-header")
    if(loggedId === 0){
        headerNode.hidden = true 
    } else {
        let logoutBtn = document.createElement("button")
        logoutBtn.innerText = "Logout"
        logoutBtn.addEventListener("click", logOut )
        headerNode.append(logoutBtn)
    }
}

// function load_home() {
//     document.getElementById("content").innerHTML='<object type="text/html" data="home.html" ></object>';
// }

function logOut(){
    loggedId = 0
    //needs to also switch to logged out screen
}
function fetchAllUsers(){
    
}

// Left side of the DOM
function fetchUser() {
    fetch(`${urlUsers}/${loggedId}`)
    .then(resp => resp.json())
    .then(user => {
        localStorage["username"] = user.username,
        localStorage["fullname"] = user.fullname,
        localStorage["bio"] = user.bio,
        localStorage["user_id"] = user.id,
        localStorage["followers"] = JSON.stringify(user.followers)
        localStorage["followed"] = JSON.stringify(user.followed)
        return user 
    } )
    .then(user => renderLeftUser(user))
}

function renderLeftUser(user) {
    let createPost = document.getElementById("create-posts")
    if (loggedId === 0){
        createPost.hidden = true
    }else{
        createPost.hidden = false
    }
    const userDiv = document.querySelector(".user-info")
    const usernameh4 = document.querySelector(".username")
    usernameh4.innerText = user.username
    const fullnameh2 = document.querySelector(".fullname")
    fullnameh2.innerText = user.fullname
    const bioP = document.querySelector("p")
    bioP.innerText = user.bio
    
    const followDiv = document.querySelector(".follower-following-count")
    const followersh4 = document.createElement("h4")
    followersh4.innerText = "FOLLOWERS"
    const followersNumP = document.createElement("p")
    followersNumP.innerText = user.followers.length
    const followingh4 = document.createElement("h4")
    followingh4.innerText = "FOLLOWING"
    const followingNumP = document.createElement("p")
    followingNumP.innerText = user.followed.length
    followDiv.append(followersh4, followersNumP, followingh4, followingNumP)

    const postsImages = document.querySelector("posts-pictures")
    user.posts.forEach(post => {
        const userImageDiv = document.querySelector(".users-posts")
        const postsImages = document.createElement("img")
        postsImages.classList.add("user-post")
        postsImages.id = post.id
        postsImages.src = post.graphic_url
        // postsImages.style.display = "10px"
        userImageDiv.append(postsImages)
        postsImages.addEventListener("click", () => handleImageWindow(event, post))
    })
    // Allow our user to view a post that they click on on the left side of the DOM
    // const viewPost = document.querySelector("view-post")
    userDiv.append(usernameh4, fullnameh2, bioP)
    

    
}


// Handles the bottom left side of the DOM to display picture in expanded form!
function handleImageWindow(event, post) {
    console.log("Picture Clicked")
    const imageDiv = document.querySelector(".image-expanded")
    const postImage = document.getElementById(`${post.id}`)
    if (imageDiv.children.length === 0) {
        imageDiv.appendChild(postImage.cloneNode())
    } else {
        // imageDiv.firstChild.remove()
        imageDiv.innerHTML = ""
        imageDiv.appendChild(postImage.cloneNode())
    }
    // imageDiv.removeChild(imageDiv.firstChild)
        // imageDiv.appendChild(postImage.cloneNode())
    
}


// Fetching Post for the Middle of the DOM
function fetchPosts() {
    fetch(urlPosts)
    .then(resp => resp.json())
    .then(posts => posts.forEach(post => renderPosts(post)))
}

function renderPosts(post) {
    const divPostImage = document.querySelector(".post-image")
    let newPostCard = document.createElement("div")
    newPostCard.className = "one-post-card"

    const nameh2 = document.createElement("h2")
    nameh2.className = "middle-username"
    nameh2.innerText = post.user.username
    const locationh4 = document.createElement("h4")
    locationh4.className = "middle-location"
    locationh4.innerText = post.location

    //adds delete button and appends to h4
    if (parseInt(localStorage.user_id) === post.user_id) {
        // Add Split Button to Post where User is signed in.
        const deleteButton = document.createElement("button")
        deleteButton.id = `${post.id}`
        deleteButton.innerText = "Delete"
        deleteButton.addEventListener("click", deletePost ) 
        const editButton = document.createElement("button")
        editButton.innerText = "Edit"
        editButton.addEventListener("click", editPost)
        locationh4.append(deleteButton, editButton)

    } 
    const postImg = document.createElement("img")
    postImg.className = "middle-photo"
    postImg.src = post.graphic_url
    const commenth4 = document.createElement("h4")
    commenth4.className = "middle-comment"
    commenth4.innerText = "COMMENTS"

    //adds comment section 
    let commentSection = document.createElement("div")
    commentSection.className = `comments-${post.id}`
    // newPostCard.append(commentSection)

    const viewMoreh4 = document.createElement("h4")
    viewMoreh4.className = "middle-view-more"
    viewMoreh4.innerText = "VIEW MORE"

    newPostCard.append(nameh2, locationh4, postImg, commenth4, commentSection, viewMoreh4)

    //NOTE need to switch this to append to beginning rather than end. Should be .unshift
    divPostImage.prepend(newPostCard)



        //iterate through and list current comments 
      if(post.comments.length === 0) {
          commentSection.innerText = "Post a comment below"
      } else { post.comments.forEach(iterateComments) }
      // end of comment iteration 

}



function iterateComments(comment){
    // console.log(comment)
    let comments = document.querySelector(".comments-"+ `${comment.post_id}`)
    let newCmt = document.createElement("div")
    newCmt.id = comment.id 
    
    ///need to refactor to do "time ago" for date/time posted. 
    //also need to add which user left the comment 
    newCmt.innerHTML = `${comment.created_at} <br> ${comment.comment_text}`
    comments.append(newCmt)

}



function createPost(event){
    event.preventDefault()

    let data = {
        user_id: loggedId,
        location: document.getElementById("location-input").value,
        post_text: document.getElementById("caption-input").value,
        graphic_url: document.getElementById("image-url").value,
        user: {
            username: localStorage.username 
        },
        comments: []
    }
    fetch(urlPosts, {
        method: "POST",
        headers:  {
            "Content-Type" : "application/json"
          },
        body: JSON.stringify(data)
    }).then( () => renderPosts(data))

    
}

function deletePost(event){
    const postId = event.target.id
    fetch(urlPosts + "/" + postId, {
        method: "DELETE"
    } ).then( () => {
        let nextLevel = event.target.parentElement
        nextLevel.parentElement.remove()
    })
}

function editPost() {
    console.log("Edit Button Works")

    fetch 

}

function exploreUsers(friend){
    let followers = JSON.parse(localStorage.followers)
    let followedMap = JSON.parse(localStorage["followed"]).map(follow => follow.follow_id)

    let explore = followers.filter(follower => !followedMap.includes(follower.follower_id))
    
    
    // let exploreOne = explore.sample()
    console.log(explore)
    
    
}