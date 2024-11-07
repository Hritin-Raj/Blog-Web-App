const express = require("express")
const mongoose = require("mongoose")
const User = require("./models/user")
const Post = require("./models/post")
const path = require("path")
const cors = require("cors");
const { title } = require("process")

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
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests


app.listen(PORT, console.log(`Server started at port ${PORT}`))

// Routes
app.get("/", (req, res) => {
    console.log(__dirname)
    // res.sendStatus(200)
    res.sendFile(path.join(__dirname + "/../frontend/index.html"))
})

app.get("/api/recent-posts", async (req, res) => {
    try {
        const recentPosts = await Post.find().sort({ createdAt: -1 }).limit(5);
        res.json(recentPosts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching recent posts" });
    }
});


app.get("/api/posts/:id", async (req, res) => {
    const postId = req.params.id
    const post = await Post.find({ postId: postId })
    console.log(post)

    if(!post) {
        return res.status(404).json({ message: "Post Not Found" })
    }

    res.status(200).send(post)
})

app.get("/api/details", async (req, res) => {
    const posts = await Post.find().populate('authorId', 'username')

    res.json(posts)
})

app.post("/api/create", async (req, res) => {
    const {title, content, username, email} = req.body

    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
        //return res.json({ success: false, message: "Email already exists." });

        // Create corresponding post
        const newPost = new Post({
        title: title,
        content: content,
        authorId: existingUser._id,
        });

        await newPost.save();
        return res.json({ success: true, message: "New post created successfully for existing user." });
    }
    else {
        // Create new user document
        const newUser = new User({ username: username, email: email });
        await newUser.save();

        // Create corresponding post
        const newPost = new Post({
        title: title,
        content: content,
        authorId: newUser._id,
        });
        
        await newPost.save();
        return res.json({ success: true, message: "User and post created successfully." });
    }
})


app.get("/api/posts/title/:title", async (req, res) => {
    const title = req.params.title

    const post = await Post.findOne({ title: title })
    return res.status(200).send(post)    
})

app.get("/api/posts/author/:email", async (req, res) => {
    const email = req.params.email;

    const user = await User.findOne({ email: email });
    if (!user) {
        console.log("Author not found");
        return res.status(404).json({ message: "Author Not Found" });
    }

    const posts = await Post.find({ authorId: user._id });
    console.log(posts);
    return res.status(200).send(posts);
});

/** Error Reason:
 The issue here is that await User.findOne({ email: email })._id is attempting to access the _id property directly on the result of findOne, but if no user is found, findOne will return null, causing undefined when accessing _id. This is why you’re seeing undefined for the id and an empty array for posts.
 */
// app.get("/api/posts/author/:email", async (req, res) => {
//     const email = req.params.email

//     const id = await User.findOne({ email: email })._id
//     console.log(id)
//     const posts = await Post.find({ authorId: id})
//     console.log(posts)
//     return res.status(200).send(posts)    
// })


