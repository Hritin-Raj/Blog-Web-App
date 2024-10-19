const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    postId: {
        type: Number,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// pre-Middleware -> This Middleware gets activated whenever the 'save' operation is performed
postSchema.pre("save", async (next) => {
    // 'this' refers to the current post that is going to be saved
    const post = this

    if(!post.postId) {
        // count number of posts
        const count = await mongoose.model("posts").countDocuments()

        post.postId = count + 1
        next()
    }
    else {
        next()
    }
})


// Model
const Post = mongoose.model("posts", postSchema)

module.exports = Post