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

        
//      var refresh = $window.localStorage.getItem('refresh');
//      console.log(refresh);
//      if (refresh===null){
//      window.location.reload();
//      $window.localStorage.setItem('refresh', "1");
// }
        fetchUser()
        fetchFollowers()
        fetchFollows()
        fetchAllUsers()
        renderNewPostForm()
        fetchPosts()
        renderLoadMoreButton()
        fetchSupportOrg()
        fetchUserForExplore()
        // fetchFriends()
        

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

function fetchAllUsers(){


    fetch("http://localhost:3000/people")
    .then(resp => resp.json())
    .then(users => {
        // var changed = users.filter(user => {
        //     return !(followers.includes(user.username) || follows.includes(user.username))
        // })
        localStorage["users"] = JSON.stringify(users)
        
        // const shuffled = changed.sort(() => 0.5 - Math.random());
        
        // let selected = shuffled.slice(0, 6);
        // shuffled.forEach(user => {
        //     exploreUsers(user) })
        }  
    )

}

function aboutPage() {
    console.log("Hit button")
    const aboutAnchor = document.querySelector("about-page")
    const bodyHtml = document.querySelector("body")
    const loggedInHome = document.querySelector("#logged-in-home")
    loggedInHome.innerHTML = ""
    // const loggedOutHome = document.querySelector("#logged-out-home")
    // loggedOutHome.innerHTML = ""
    // debugger
    const aboutDiv = document.querySelector(".about") 
    const aboutInfoDiv = document.querySelector(".about-information")
    const aboutWelDiv = document.querySelector(".about-welcome")
    const welcome = document.createElement("h2")
    welcome.style = "text-align: center;"
    welcome.innerText = "Welcome To AnimalGram!"
    const purposeh3 = document.createElement("h3")
    purposeh3.innerText = "A social media App for all pet lovers!"
    const functionalityP = document.createElement("p")
    functionalityP.innerText = "While using our AnimalGram a user can: "
    const functionUl = document.createElement("ul")
    const firstLi = document.createElement("li")
    firstLi.innerText = "Check out there post on the left and click on a picture to expand it in the section below."
    const secondLi = document.createElement("li")
    secondLi.innerText = "Create a new post that includes a location, a graphic_url, and a post caption."
    const thirdLi = document.createElement("li")
    thirdLi.innerText = "Like a post, view the comments on a post, and write a post there own or other posts."
    const fourthLi = document.createElement("li")
    fourthLi.innerText = "Delete a current Post that belongs to them."
    const fifthLi = document.createElement("li")
    fifthLi.innerText = "Explore other users and support a local wildlife organization."
    const thankYouh4 = document.createElement("h4")
    thankYouh4.innerText = "Thank You for visiting our Application!  We hope to see you back in the near future :)"
    aboutWelDiv.append(welcome)
    functionUl.append(firstLi, secondLi, thirdLi, fourthLi, fifthLi)
    aboutInfoDiv.append(purposeh3, functionalityP, functionUl, thankYouh4)
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
        loginAnchor.addEventListener("click", loginNavOpen)
        navLiLogin.append(loginAnchor)
        navList.append(navLiLogin) 
        displayWelcome()
    }
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
    }

function loginNavOpen(){
    document.getElementById('id01').style.display='block'
}

// function load_home() {
//     document.getElementById("content").innerHTML='<object type="text/html" data="home.html" ></object>';
// }

function logOut(event){
    event.preventDefault()
    let divBody = document.querySelector("#logged-in-home")
    let divBodyLogin = document.querySelector(".logged-out-home")

    // let userLeft = document.querySelector(".left")
    // userLeft.style.display = "none"
    // divBody.style.display = "none"
    loggedId = 0
    localStorage.clear()
    // location.reload()
    //needs to also switch to logged out screen
    //needs to clear local storage 

}

function displayWelcome() {
    let mainDiv = document.querySelector(".welcome-page")
    const welcome = document.createElement("h1")
    const br1 = document.createElement("br")
    const br2 = document.createElement("br")
    const br3 = document.createElement("br")
    const br4 = document.createElement("br")
    const animalImg = document.createElement("img")
    animalImg.src = "https://pbs.twimg.com/profile_images/378800000070360921/bb52a40b89a2be0c8ddf3fb903167165_400x400.jpeg"
    welcome.innerText = "Welcome to AnimalGram!"
    const informationh2 = document.createElement("h2")
    informationh2.innerText = "This Application is meant for all Animal Lovers!  To login to your already created profile click the Login button above."
    const infoh2 = document.createElement("h2")
    infoh2.innerText = "To learn more about this application click on the About page above!"
    mainDiv.append(br1, br2, br3, welcome, br4, animalImg, informationh2, infoh2)
}

function loggingIn(){
    alert("Logging in User")
}

function reloadPage() {
    location.reload()
}

function logoutAlert() {
    alert("We Hope To See You Again!")
}

function fetchFollowers(){

    fetch(`http://localhost:3000/followers/${localStorage.id}`)
    .then(resp => resp.json())
    .then(users => {
        localStorage["followers"] = JSON.stringify(users)
        // followers = users.map(user => {return user.username})
        // users.forEach(user => {
        //     followers.push(user.username)
        // })
    })
}

function fetchFollows(){

    fetch(`http://localhost:3000/follows/${localStorage.id}`)
    .then(resp => resp.json())
    .then(users => {
        localStorage["follows"] = JSON.stringify(users)
        // followers = users.map(user => {return user.username})
        // users.forEach(user => {
        //     followers.push(user.username)
        // })
    })
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
        // localStorage["followers"] = JSON.stringify(user.followers)
        // localStorage["followed"] = JSON.stringify(user.followed)
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
    const usernameh1 = document.createElement("h1")
    usernameh1.className = "username"
    usernameh1.innerText = `@${user.username}`
    const fullnameh2 = document.createElement("h2")
    fullnameh2.className = "fullname"
    fullnameh2.innerText = user.fullname
    const bioP = document.createElement("p")
    bioP.className = "bio"
    bioP.innerText = user.bio
    
    const followDiv = document.querySelector(".follower-following-count")
    const followersh4 = document.createElement("h4")
    followersh4.innerText = "FOLLOWERS"
    
    const followersNumP = document.createElement("p")
    followersNumP.innerText = user.followers.length
    followersNumP.className="total-followers"
    const followingh4 = document.createElement("h4")
    followingh4.innerText = "FOllOWING"

    const followingNumP = document.createElement("p")
    followingNumP.className="total-following"
    
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
    userDiv.append(usernameh1, fullnameh2, bioP)
    
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
    captionp.className="post-description-p"
    captionp.innerText = `${post.user.username}: ${post.post_text}`

    //adds delete button and appends to h4
    if (parseInt(localStorage.user_id) === post.user_id) {
        // Add Split Button to Post where User is signed in.
        const deleteButton = document.createElement("button")
        deleteButton.id = `${post.id}`
        deleteButton.className = "btn btn-default delete"
        deleteButton.innerText = "Delete"
        deleteButton.addEventListener("click", deletePost ) 
        // const editButton = document.createElement("button")
        // editButton.id = `${post.id}`
        // editButton.innerText = "Edit"
        // editButton.className = "btn btn-primary"
        // editButton.addEventListener("click", handleEditPost)
        locationh4.append(deleteButton)

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
    likeBtn.className = "btn-danger btn-sm"
    likeBtn.id = post.id 
    likeBtn.innerText = "<3"
    likeBtn.addEventListener("click", (event) => {
        console.log(event.target.dataset);
        likeFunction(event)
    })

    likeCount.append(likeBtn)
    //create comments section header
    const commenth4 = document.createElement("h5")
    commenth4.className = "middle-comment"
    commenth4.innerText = "COMMENTS"

    //adds comment section 
    let commentSection = document.createElement("div")
    commentSection.className = `comments-${post.id}`
    // newPostCard.append(commentSection)

    //leave a comment link 
    const leaveAComment = document.createElement("div")
    leaveAComment.className = "leave-a-comment"
    leaveAComment.innerText = "Leave a comment."
    leaveAComment.addEventListener("click", renderCommentForm)

    

    newPostCard.append(nameh2, locationh4, postImg, captionp, likeCount,  commenth4, commentSection)

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

function renderEditPost() {
 
}

function handleEditPost(event) {
    console.log("Edit Button Works")
    const id = event.target.id
    debugger
    const obj = {
        location: event.target.parentElement
    }

    fetch(urlPosts + "/" + `${id}`)
}

function likeFunction(event) {
    console.log("likeFunction has been hit")
    
    event.preventDefault()
   
    let more = parseInt(event.target.parentElement.id)+1
    console.log(more)

    let xButton = event.target.id


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
        event.target.parentElement.innerHTML = `${more} likes <button class="btn-danger btn-sm" id="` + xButton + `"><3</button>`;
    }))

}

function renderLoadMoreButton(){
    let loadMoreSection = document.querySelector(".load-more")

    let loadMoreBtn = document.createElement("button")
    loadMoreBtn.className ="btn-default"
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
        cmtText.className = "form-control input-lg"
        cmtText.rows="2"
        cmtText.placeholder = "Write your comment here...."
        // document.getElementById("comment-text-input").setAttribute("required", "")


        let commentSubmit = document.createElement("button")
        commentSubmit.className = "btn btn-default"
        commentSubmit.innerText = "Post Comment"
        // commentSubmit.class = "comment-submit-button"
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
    let z = localStorage.username 
   
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
    console.log(comment)

    //if we want to make the new comment "time since posted" to be dynamic.
    let newCmtTime = new Date(0);
    
    let comments = document.querySelector(".comments-"+ `${comment.post_id}`)
    let newCmt = document.createElement("div")
    newCmt.className= "single-comment-div"
    newCmt.innerHTML = `<b>@${comment.user.username}</b> <br> ${comment.comment_text} <br> just now... `
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

    let xForm = document.querySelector(".create-post-form")

    xForm.reset()
    
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

function fetchUserForExplore() {

    let exploreSection = document.querySelector(".explore")
    let exploreH2 = document.createElement("h2")
    exploreH2.innerText= "Explore"
    const exploreUserss = document.createElement("button")
    exploreUserss.type="button"
    exploreUserss.innerText = "Explore New Users"
    exploreUserss.className= "btn btn-outline-secondary"
    exploreUserss.onclick = reloadPage
    let usersBr = document.createElement("br")

    exploreH2.append(exploreUserss)
    exploreSection.prepend(exploreH2, usersBr)

    // var followers = JSON.parse(localStorage.followers)
    // var follows = JSON.parse(localStorage.follows)
    // var people = JSON.parse(localStorage.users)
    var followers = JSON.parse(localStorage.followers).map(user => user.username)
    
    var follows = JSON.parse(localStorage.follows).map(user => user.username)
    var people = JSON.parse(localStorage.users)
    var filteredPeople = people.filter(user => {
            return !(followers.includes(user.username) || follows.includes(user.username) || user.username === localStorage.username)
        
        })

        

    const shuffled = filteredPeople.sort(() => 0.5 - Math.random());
    // var i = 0
    // while(i < 5){
    //    exploreUsers(shuffled[i])
    //        i++
    // }
    
    var i = 0
    shuffled.forEach(user => {
        // if(i < 5){
        exploreUsers(user) 
        // }
        // else{
            
        // }
    })
   
      

    // fetch("http://localhost:3000/people")
    // .then(resp => resp.json())
    // .then(users => {
    //     var changed = users.filter(user => {
    //         return !(followers.includes(user.username) || follows.includes(user.username))
        
    //     })
        
    //     const shuffled = changed.sort(() => 0.5 - Math.random());
        
    //     // let selected = shuffled.slice(0, 6);
    //     shuffled.forEach(user => {
    //         exploreUsers(user) })
    //     }  
    // ) 

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
    followButton.className="btn btn-primary"
    followButton.id = user.id
    followButton.addEventListener("click", newFriend)
    const listItem = document.createElement("li")
    listItem.className= "user-list-item"
    listItem.innerText = user.username
    // console.log(exploreArray.sort())
    listItem.append(followButton)
    ulList.append(listItem)
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
    supportHeader.className="support-header-h2"
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
    supportTitle.className="support-org-title"

    ///begin website url link
    let imgLink2 = document.createElement("a")
    imgLink2.href= org.website
    imgLink2.target= "_blank"

    let webLink = document.createElement("div")
    webLink.className = "support-link"
    webLink.innerText = org.website 

    imgLink2.append(webLink)
    //end website URL link
  
    let orgDescription = document.createElement("div")
    orgDescription.className="support-description"
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
    // locationInput.attributes.required = ""
    locationInput.id = "location-input"

    let imageInput = document.createElement("input")
    imageInput.required = true
    imageInput.type= "text"
    imageInput.placeholder="Img URL..."
    // imageInput.attributes.required = ""
    imageInput.id = "image-url"

    let captionInput = document.createElement("input")
    captionInput.required = true
    captionInput.type = "text"
    captionInput.placeholder = "Write a fun caption here..."
    // captionInput.attributes.required = ""
    captionInput.id = "caption-input"

    
    let submitButton = document.createElement("button")
    submitButton.innerText="POST"
    submitButton.className ="btn-info"
    submitButton.type="submit"
    

    newPostForm.append(locationInput, imageInput, captionInput, submitButton)
   

    newPostNode.append(newPostH2, newPostForm)


}

function newFriend(event){
    console.log("Follow Button Hit")    
    // event.preventDefault()

    let obj = {
        follower_id: parseInt(event.target.id),
        follow_id: parseInt(localStorage.id)
    }
    fetch("http://localhost:3000/friends", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(obj)
            })
            .then(resp => resp.json())
            .then(friend => {
                const totalFollowers = document.querySelector(".total-following")
                let x = parseInt(totalFollowers.innerText)
                let y = x+1
                totalFollowers.innerText = `${y}`
                event.target.parentElement.remove()
            })
        }
    




// function likeFunction(event) {
//     console.log("likeFunction has been hit")
    
//     event.preventDefault()
//     let more = parseInt(event.target.previousElementSibling.id)+1
//     console.log(more)

 

//     fetch(urlLikes, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify({
//             user_id: parseInt(localStorage.user_id),
//             post_id: parseInt(event.target.id)
//         })
//     })
//     .then(res => res.json())
//     .then((like_obj => {
//         event.target.previousElementSibling.innerText = `${more} likes`;
//     }))

// }