var loggedId = 0
const urlUsers = "http://localhost:3000/users"
const urlPosts =  "http://localhost:3000/posts"
const urlFriends = "http://localhost:3000/friends"
const urlComments = "http://localhost:3000/comments"

document.addEventListener("DOMContentLoaded", function(){
    loggedId = localStorage.id;
    displayHeader();

    if (loggedId === 0) {
        const body = document.querySelector("body")
        body.innerHTML = ""
    }
    else if (loggedId > 0){
        fetchUser()
        fetchPosts()
        // fetchFriends()
        exploreUsers()

        let newPostForm = document.getElementById("create-post-form")
        newPostForm.addEventListener("submit", createPost )
    }else{
        
        console.log("you need to login")
        // loadLoginScreen();
    }
})





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
    let divBody = document.querySelector(".logged-in-home")
   
    divBody.style.display = "none"
    renderSignIn()
    
    loggedId = 0
    localStorage.clear()
    //needs to also switch to logged out screen
    //needs to clear local storage 

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
        localStorage.id = user.id
        return user 
    } )
    .then(user => renderLeftUser(user))
}

function renderLeftUser(user) {
    let createPost = document.getElementById("create-posts")
    if (localStorage.id === 0){
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
    newPostCard.id = post.id 

    const nameh2 = document.createElement("h2")
    nameh2.className = "middle-username"
    nameh2.innerText = post.user.username
    const locationh4 = document.createElement("h4")
    locationh4.className = "middle-location"
    locationh4.innerText = post.location
    const captionp = document.createElement("p")
    captionp.innerText = ` ${post.user.username}: ${post.post_text}`

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

    //need to refactor so this only appears if there are more than 3 or so comments 
    const viewMoreh4 = document.createElement("h4")
    viewMoreh4.className = "middle-view-more"
    viewMoreh4.innerText = "VIEW MORE"
    
    //leave a comment link 
    const leaveAComment = document.createElement("p")
    leaveAComment.className = "leave-a-comment"
    leaveAComment.innerText = "Leave a comment."
    leaveAComment.addEventListener("click", renderCommentForm)

    

    newPostCard.append(nameh2, locationh4, postImg, captionp, commenth4, commentSection, viewMoreh4, leaveAComment)

    //NOTE need to switch this to append to beginning rather than end. Should be .unshift
    divPostImage.prepend(newPostCard)



        //iterate through and list current comments 
      if(post.comments.length === 0) {
          commentSection.innerText = "Post a comment below"
      } else { post.comments.forEach(iterateComments) }
      // end of comment iteration 

}

function timeSince(date) {
    
    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = Math.floor(seconds / 31536000);
  
    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

function iterateComments(comment){
    // console.log(comment)
    let comments = document.querySelector(".comments-"+ `${comment.post_id}`)
    let newCmt = document.createElement("div")
    newCmt.id = comment.id 
    var t = comment.created_at.split(/[- : T]/);
    t[5] = t[5].split(".")[0]
    var d = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
    let commentTime = timeSince(d)
    ///need to refactor to do "time ago" for date/time posted. 
    //also need to add which user left the comment 
    newCmt.innerHTML = `${comment.comment_text} <br> <i>${commentTime} ago</i> `
    comments.append(newCmt)

}

function renderCommentForm(event){

        event.preventDefault()
        
        let currentPostCard = event.target.parentElement
    
        let commentForm = document.createElement("form")
       commentForm.id = `comment-form-id-${currentPostCard.id}`

        let commentPostId = document.createElement("input")
        commentPostId.id = `comment-post-id-${currentPostCard.id}`
        //needs to pass through post ID
        commentPostId.innerText = currentPostCard.id 
        //needs to make this input field hidden 
        commentPostId.setAttribute("type", "hidden")


        let cmtText = document.createElement("input")
        cmtText.id = `comment-text-input-${currentPostCard.id}`
        cmtText.type = "text-area"
        cmtText.placeholder = "Write your comment here...."
        // document.getElementById("comment-text-input").required = true;


        let commentSubmit = document.createElement("input")
        commentSubmit.class = "comment-submit-button"
        commentSubmit.type = "submit"

        
        commentForm.append(commentPostId, cmtText, commentSubmit)
        commentForm.addEventListener("submit", createComment )
       


        currentPostCard.append(commentForm)


}

function createComment(event){
    //POST request to submit comment form and persist data 
    event.preventDefault()
    console.log("Comment Submitted")

   let x = event.target.parentElement
   let y = document.querySelector(`#comment-form-id-${x.id}`)

   
    let data = {
        user_id: loggedId,
        post_id: parseInt(x.id), 
        comment_text: document.getElementById(`comment-text-input-${x.id}`).value,
        //passing through current user name so we can use it to render to the dom after persisting to database
        user: {  username: localStorage.username }
        }


    fetch(urlComments, {
        method: "POST",
        headers:  {
            "Content-Type" : "application/json"
          },
        body: JSON.stringify(data)
        //iterate comment onto DOM, need to confirm this works 
    }).then( () => renderNewComment(data))

    y.reset()

}

function renderNewComment(comment){
    //targets comment section of current post
    //renders new comment to the DOM, appending to comments section
    console.log("rendering comments hit")

    //if we want to make the new comment "time since posted" to be dynamic.
    let newCmtTime = new Date(0);
    
    let comments = document.querySelector(".comments-"+ `${comment.post_id}`)
    let newCmt = document.createElement("div")

    newCmt.innerHTML = `${comment.comment_text} <br> just now... `
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

}

function exploreUsers(friend){
    // debugger
    let followers = JSON.parse(localStorage.followers)
    let followedMap = JSON.parse(localStorage["followed"]).map(follow => follow.follow_id)

    let explore = followers.filter(follower => !followedMap.includes(follower.follower_id))
    
    
    // let exploreOne = explore.sample()
    console.log(explore)
    
    
}