const express = require("express")
const mongoose = require("mongoose")
const User = require("./models/user")
const Post = require("./models/post")
const path = require("path")

const app = express()
const PORT = 3000

// Connect to MongoDB
const uri = "mongodb://localhost:27017/blogdb"
mongoose
.connect(uri)
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("Connection error:", error));


// Middleware
app.use(express.static(path.join(__dirname + "/../frontend")))


app.listen(PORT, console.log(`Server started at port ${PORT}`))

// Routes
app.get("/", (req, res) => {
    console.log(__dirname)
    // res.sendStatus(200)
    res.sendFile(path.join(__dirname + "/../frontend/index.html"))
})

app.get("/api/posts/:id", async (req, res) => {
    const postId = req.params.id
    const post = await Post.find({ postId: postId })
    console.log(post)

    if(!post) {
        return res.status(404).json({ message: "Post Not Found" })
    }

    res.status(200).send(post)
})

app.get("/api/posts", async (req, res) => {
    const posts = await Post.find().populate('authorId', 'username')

    res.json(posts)
})