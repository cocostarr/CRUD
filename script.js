// CRUD OPERATIONS
let localDBS = JSON.parse(localStorage.getItem("posts")) || [];
// localStorage.getItem("posts") fetches the saved string from the localStorage.
// JSON.parse(...) converts it back into the original array of objects.
// The || [] part ensures that if nothing is saved yet (e.g., first visit), it initializes with an empty array.

// Get all elements from the DOM
const postForm = document.getElementById("postForm");
const postTitle = document.getElementById("title");
const postBody = document.getElementById("body");
const showAllPostButton = document.getElementById("showAllPostbtn");
const localPostContainer = document.getElementById("localPostContainer");

// TO CREATE POST
postForm.addEventListener("submit", (e) => {
    e.preventDefault();  // e.preventDefault() stops the page from refreshing when you submit the form.

    const newPost = {
        id: Date.now(),
        title: postTitle.value,
        body: postBody.value 
    };

    localDBS.push(newPost);
    localStorage.setItem("posts", JSON.stringify(localDBS)); // To make sure posts are saved even after refresh, save localDBS into localStorage.
    postForm.reset(); // Reset the form to blank.
    alert("Post Created!");
});

// TO SHOW POSTS
showAllPostButton.addEventListener("click", () => {
    console.log(localDBS);
    localPostContainer.innerHTML = "";

    localDBS.forEach(post => {
    const div = document.createElement("div");
    div.innerHTML = ` <h3> ${post.title} </h3> <p> ${post.body} </p>
    <button onclick = "editPost(${post.id})">Edit</button>
    <button onclick = "deletePost(${post.id})">Delete</button>`;

    localPostContainer.appendChild(div);
    });    
});

// EDIT POST
window.editPost = function(id){
    const post = localDBS.find(p => p.id === id);
    if (post){
        const newTitle = prompt("Edit title:", post.title);
        const newBody = prompt("Edit body:", post.body);
        post.title = newTitle;
        post.body = newBody;
        localStorage.setItem("posts", JSON.stringify(localDBS)); // save update
        showAllPostButton.click();  // Refreshes the screen by simulating a click 
    }
}

// NOTE
// editPost() takes a function and finds the post with the matching ID.
// window. makes it accessible from the HTML button's onclick(edit button onclick).
// The prompt() is used to ask the user for a new title and body.
// The post.title is Updated to the values inside the array.


// DELETE POST
window.deletePost = function(id){
    localDBS = localDBS.filter(post => post.id !== id);
    localStorage.setItem("posts", JSON.stringify(localDBS)); // save update
    showAllPostButton.click();
}

// NOTE ALSO
// filter() creates a new array with only the posts that are NOT the one being deleted.
// To prevent the post from disappearing we use localStorage to save them permanently.
// After creating, editing, or deleting posts, always update localStorage
// localStorage is a web browser feature that allows you to store data in the user's browser permanently (until manually cleared). 
// This means: It persists even after the page reloads or the browser is closed.
// It only stores strings (text). You cannot directly store objects or arrays.
// Because localStorage only stores strings, you can’t save objects so we use JSON.stringify() and JSON.parse()
// Use JSON.stringify() to convert objects/arrays into a string
// Then, to read it back, use JSON.parse() to convert the string back into an object