const Post = require("./models/post")

async function insertPost(title, content, authorId) {
    const post = new Post({
        title: title,
        content: content,
        authorId: authorId
    })

    const savedPost = await post.save()
    console.log("Post Saved:", savedPost)
}

module.exports = insertPost