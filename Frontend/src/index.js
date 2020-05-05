var loggedId = 0
let posts_page = 1;

const urlUsers = "http://localhost:3000/users"
const urlPosts =  "http://localhost:3000/posts"
const urlFriends = "http://localhost:3000/friends"
const urlComments = "http://localhost:3000/comments"
const urlOrgs = "http://localhost:3000/organizations"
const urlLikes = "http://localhost:3000/likes"

document.addEventListener("DOMContentLoaded", function(){
    loggedId = localStorage.id;
    displayHeader();

    if (loggedId === 0) {
        // const body = document.querySelector("body")
        // body.innerHTML = ""

        let divBody = document.querySelector(".logged-in-home")
        divBody.style.display = "none"
        let divBodyLogin = document.querySelector(".logged-out-home")
        divBodyLogin.style.display = "reset"
         
    }
    else if (loggedId > 0){
        
        fetchUser()
        renderNewPostForm()
        fetchPosts()
        renderLoadMoreButton()
        // fetchFriends()
        fetchSupportOrg()
        fetchUserForExplore()

        //targets load more button, calls a function to load more
        const loadMore = document.getElementById('load-more-button')
        loadMore.onclick= nextPage;

        let newPostForm = document.getElementById("create-post-form")
        newPostForm.addEventListener("submit", createPost )
    }else{
        
        console.log("you need to login")
        // loadLoginScreen();
    }
})

function homePage() {
    // const homeAnchor = document.querySelector("home-page"")
    location.reload()
}

function aboutPage() {
    console.log("Hit button")
    const aboutAnchor = document.querySelector("about-page")
    const bodyHtml = document.querySelector("body")
    const loggedInHome = document.querySelector("#logged-in-home")
    loggedInHome.innerHTML = ""
    const loggedOutHome = document.querySelector("#logged-out-home")
    loggedOutHome.innerHTML = ""
    // debugger
    const aboutDiv = document.querySelector(".about")   
    const welcome = document.createElement("h2")
    welcome.innerText = "WELCOME TO ANIMALGRAM!  WE'RE GLAD TO SEE YOU USING OUR APP!!"
    aboutDiv.append(welcome)
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
    let headerNode = document.querySelector("#login-header")
    const navList = document.querySelector(".nav-bar-list")
    // Render Login
    if (loggedId === undefined) {
        const navLiLogin = document.createElement("li")
        const loginAnchor = document.createElement("a")
        loginAnchor.innerText = "Login"
        loginAnchor.class = "login-button"
        loginAnchor.style = "width:auto;"
        loginAnchor.href = "#"
        loginAnchor.onclick = loginNavOpen
        navLiLogin.append(loginAnchor)
        navList.append(navLiLogin) }
    // Render Logout
    else if (loggedId > 0) {
        const navLiLogout = document.createElement("li")
        const logoutAnchor = document.createElement("a")
        logoutAnchor.innerText = "Logout"
        logoutAnchor.href = "#"
        logoutAnchor.addEventListener("click", logOut)
        navLiLogout.append(logoutAnchor)
        navList.append(navLiLogout)
        logoutAnchor.addEventListener("click", reloadPage)
        logoutAnchor.addEventListener("click", logoutAlert)
    }
        // debugger
        // let divBody = document.querySelector(".logged-out-home")
        // let logoutBtn = document.createElement("button")
        // logoutBtn.innerText = "Logout"
        // logoutBtn.addEventListener("click", logOut )
        // headerNode.append(logoutBtn)
    }

function loginNavOpen(){
    document.getElementById('id01').style.display='block'
}

// function load_home() {
//     document.getElementById("content").innerHTML='<object type="text/html" data="home.html" ></object>';
// }

function logOut(){
    let divBody = document.querySelector("#logged-in-home")
    let divBodyLogin = document.querySelector(".logged-out-home")
    // let userLeft = document.querySelector(".left")
    // userLeft.style.display = "none"
    divBody.style.display = "none"
    loggedId = 0
    localStorage.clear()
    // location.reload()
    //needs to also switch to logged out screen
    //needs to clear local storage 

}

function reloadPage() {
    location.reload()
}

function logoutAlert() {
    alert("We Hope To See You Again!")
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
    const usernameh2 = document.createElement("h2")
    usernameh2.className = "username"
    usernameh2.innerText = user.username
    const fullnameh4 = document.createElement("h4")
    fullnameh4.className = "fullname"
    fullnameh4.innerText = user.fullname
    const bioP = document.createElement("p")
    bioP.className = "bio"
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

    // const postsImages = document.querySelector("posts-pictures")
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
    userDiv.append(usernameh2, fullnameh4, bioP)
    
}

// Handles the bottom left side of the DOM to display picture in expanded form!
function handleImageWindow(event, post) {
    console.log("Picture Clicked")
    const imageDiv = document.querySelector(".image-expanded")
    const postImage = document.getElementById(`${post.id}`)
    postImage.classList.add("expand")
    if (imageDiv.children.length === 0) {
        const newImage = document.createElement("img")
        newImage.src = postImage.src
        newImage.classList = "clone"
        // debugger
        imageDiv.appendChild(newImage)
    } else {
        // imageDiv.firstChild.remove()
        const newImage = document.createElement("img")
        newImage.src = postImage.src
        newImage.className = "clone"
        imageDiv.innerHTML = ""
        imageDiv.appendChild(newImage)
    }
    // imageDiv.removeChild(imageDiv.firstChild)
        // imageDiv.appendChild(postImage.cloneNode())
    
}


// Fetching Post for the Middle of the DOM
function fetchPosts() {

    fetch(`http://localhost:3000/posts/?_limit=5&_page=` + posts_page )
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

    //current # of likes 
    let z = post.likes.length 
    let likeCount = document.createElement("div")
    likeCount.className = "like-count"
    likeCount.id = z;
    likeCount.innerText =  `${z} likes`

    //like button 
    let likeBtn = document.createElement("button")
    likeBtn.class= "like-button"
    likeBtn.id = post.id 
    likeBtn.innerText = "<3"
    likeBtn.addEventListener("click", (event) => {
        console.log(event.target.dataset);
        likeFunction(event)
    })


    //create comments section header
    const commenth4 = document.createElement("h4")
    commenth4.className = "middle-comment"
    commenth4.innerText = "COMMENTS"

    //adds comment section 
    let commentSection = document.createElement("div")
    commentSection.className = `comments-${post.id}`
    // newPostCard.append(commentSection)

    
    //leave a comment link 
    const leaveAComment = document.createElement("span")
    leaveAComment.id = "leave-a-comment"
    leaveAComment.className = "border-top"
    leaveAComment.innerText = "Leave a comment."
    leaveAComment.addEventListener("click", renderCommentForm)

    

    newPostCard.append(nameh2, locationh4, postImg, captionp, likeCount, likeBtn, commenth4, commentSection)

    if(post.comments.length > 3){
        const viewMoreh4 = document.createElement("h4")
        viewMoreh4.className = "middle-view-more"
        viewMoreh4.innerText = "VIEW MORE"
        newPostCard.append(viewMoreh4, leaveAComment)
        }
        else {
            newPostCard.append(leaveAComment)
        }
        


    //NOTE need to switch this to append to beginning rather than end. Should be .unshift
    divPostImage.prepend(newPostCard)



        //iterate through and list current comments 
      if(post.comments.length === 0) {
          commentSection.innerText = "Post a comment below"
      } else { post.comments.forEach(iterateComments) }
      // end of comment iteration 

}

function likeFunction(event) {
    console.log("likeFunction has been hit")
    
    event.preventDefault()
    let more = parseInt(event.target.previousElementSibling.id)+1
    console.log(more)

 

    fetch(urlLikes, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            user_id: parseInt(localStorage.user_id),
            post_id: parseInt(event.target.id)
        })
    })
    .then(res => res.json())
    .then((like_obj => {
        event.target.previousElementSibling.innerText = `${more} likes`;
    }))

}

function renderLoadMoreButton(){
    let loadMoreSection = document.querySelector(".load-more")

    let loadMoreBtn = document.createElement("button")
    loadMoreBtn.className ="ui button"
    loadMoreBtn.id="load-more-button"
    loadMoreBtn.innerText="LOAD MORE"
    
    loadMoreSection.append(loadMoreBtn)

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
    newCmt.className= "single-comment-div"

    let usernameDiv = document.createElement("div")
    usernameDiv.className="username-comment-node"
    
    // fetch user info from comments
    fetch(`${urlComments}/${comment.id}`)
    .then(res => res.json())
    .then( (comment_obj) => {
        usernameDiv.innerText = `@${comment_obj.user.username}`;
        newCmt.prepend(usernameDiv);
    })

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
        cmtText.required = true
        cmtText.placeholder = "Write your comment here...."
        // document.getElementById("comment-text-input").setAttribute("required", "")


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
        comments: [],
        likes: []
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


function fetchUserForExplore() {

    let exploreSection = document.querySelector(".explore")
    let exploreH2 = document.createElement("h2")
    exploreH2.innerText= "Explore"
    exploreSection.prepend(exploreH2)

    var followers = []
    var follows = []
    fetch(`http://localhost:3000/followers/${localStorage.id}`)
    .then(resp => resp.json())
    .then(users => {
        
        followers = users.map(user => {return user.username})
        
        // users.forEach(user => {
        //     followers.push(user.username)
        // })
    })
    

    fetch(`http://localhost:3000/follows/${localStorage.id}`)
    .then(resp => resp.json())
    .then(users => {
        users.forEach(user => follows.push(user.username))
    })
    
    fetch("http://localhost:3000/people")
    .then(resp => resp.json())
    .then(users => {
        var changed = users.filter(user => {
            return !(followers.includes(user.username) || follows.includes(user.username))
        
        })
        
        const shuffled = changed.sort(() => 0.5 - Math.random());
        
        // let selected = shuffled.slice(0, 6);
        shuffled.forEach(user => {
            exploreUsers(user) })
        }  
    )
    

}


var exploreArray = []

function exploreUsers(user){


    
    // let followers = JSON.parse(localStorage.followers)
    // let followedMap = JSON.parse(localStorage["followed"]).map(follow => follow.follow_id)

    // let explore = followers.filter(follower => !followedMap.includes(follower.follower_id))
    
    // let exploreOne = explore.sample()
    // console.log(explore)

    //Target the unorder list to plug a list of names into the list.
    //The list items will be usernames of people who have accounts on our application
    //The usernames will come from the fetch of all the users and will then be rendered to the screen
    //There will be a total of 3 users who appear on the screen at a time.
    //Each User will have a follow button appended to there list item as well.

    const ulList = document.querySelector(".list-of-users")
    const followButton = document.createElement("button")
    followButton.innerText = "FOLLOW"
    const listItem = document.createElement("li")
    listItem.innerText = user.username
    // console.log(exploreArray.sort())
    ulList.append(listItem, followButton)
    if (listItem.innerText === localStorage.username) {
            listItem.remove()
            followButton.remove()
        } 
    // else if (ulList.children <= 2) {
    //     listItem.remove()
    //     followButton.remove()
    // }
}

function fetchSupportOrg(){
    //fetches a random org to promote support for
    fetch(urlOrgs)
    .then(resp => resp.json())
    .then(orgs => {
        var randomValue = orgs[Math.floor(Math.random() * orgs.length)];
        renderSupportOrg(randomValue)
    }
    )
}

function renderSupportOrg(org){

    //renders the support org details to the right side of page
    //includes image, org name, website, and description
    let supportSection = document.querySelector(".support")

    let supportHeader =document.createElement("h2")
    supportHeader.innerText = "Support"

    //begin image with link
    let imgLink = document.createElement("a")
    imgLink.href= org.website
    imgLink.target= "_blank"
    
    let supportImage = document.createElement("img")
    supportImage.src = org.image
    supportImage.className = "support-image"

    imgLink.append(supportImage)
    
    //end img with link

    let supportTitle = document.createElement("h4")
    supportTitle.innerText = org.name 


    ///begin website url link
    let imgLink2 = document.createElement("a")
    imgLink2.href= org.website
    imgLink2.target= "_blank"

    let webLink = document.createElement("div")
    webLink.className = "support-description"
    webLink.innerText = org.website 

    imgLink2.append(webLink)
    //end website URL link
  
    let orgDescription = document.createElement("div")
    orgDescription.innerText = org.description

    supportSection.append(supportHeader, imgLink, supportTitle, imgLink2, orgDescription)


   
}


//this NextPage function was for loading additional posts but previous fitler isn't working yet
function nextPage(){
    console.log("load more has been clicked")
    ++posts_page;
    fetchPosts();
}


function renderNewPostForm(){

    let newPostNode = document.querySelector("#create-posts")
    
    let newPostH2 = document.createElement("h2")
    newPostH2.innerText="Create a New Post"
    
    let newPostForm =document.createElement("form")
    newPostForm.className="create-post-form"
    newPostForm.id="create-post-form"

    let locationInput = document.createElement("input")
    locationInput.required = true
    locationInput.type = "text"
    locationInput.placeholder= "Location (optional)..."
    locationInput.attributes.required = ""
    locationInput.id = "location-input"

    let imageInput = document.createElement("input")
    imageInput.required = true
    imageInput.type= "text"
    imageInput.placeholder="Img URL..."
    imageInput.attributes.required = ""
    imageInput.id = "image-url"

    let captionInput = document.createElement("input")
    captionInput.required = true
    captionInput.type = "text"
    captionInput.placeholder = "Write a fun caption here..."
    captionInput.attributes.required = ""
    captionInput.id = "caption-input"

    
    let submitButton = document.createElement("input")
    submitButton.className ="ui button"
    submitButton.type="submit"
    

    newPostForm.append(locationInput, imageInput, captionInput, submitButton)
   

    newPostNode.append(newPostH2, newPostForm)


}