const fetchButton = document.getElementById("fetchBtn");
const postContainer = document.getElementById("postContainer");
// accessing the button and post container with their id: This allows us to attach behavior to them (like clicking, displaying).

// Fetch makes a request to a URL (API)
// async means this function will include asynchronous operations (like fetch()).
fetchButton.addEventListener("click", async () => {
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");

        // Converts the raw response to JSON (usable JS object)
        const posts = await response.json();

        postContainer.innerHTML = "";

        posts.forEach(post => {
            const div = document.createElement("div");
            div.innerHTML = `<h3>${post.title}</h3> <p>${post.body}</p>`;
            postContainer.appendChild(div)
        });
    }catch (error){
        console.error("Sorry, there was an error in fetching posts:", error);
    }
});


// NOTES
// A try block is used to catch errors safely.
// .json() is a method to extract the data from the response in JSON format.