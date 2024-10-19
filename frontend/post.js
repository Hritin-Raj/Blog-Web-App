const urlParams = new URLSearchParams(window.location.search)
const postId = urlParams.get('id')

async function fetchPost() {
    const response = await fetch(`/api/posts/${postId}`)

    if(!response.ok) {
        console.log("Post Not Found")
        throw new Error("Post Not Found")
    }
    
    const post = await response.json()

    // Display post
    document.getElementById("post-title").innerText = post[0].title
    document.getElementById("post-content").innerText = post[0].content
}

// Fetch and display whenever page loads
fetchPost()