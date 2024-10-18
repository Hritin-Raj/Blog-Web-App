const express = require("express")
const mongoose = require("mongoose")
const User = require("./models/user")
const insertPost = require("./insertPost")

// Connect to MongoDB
const uri = "mongodb://localhost:27017/blogdb"
mongoose
.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("Connection error:", error));

async function getUserId() {
    const user = await User.findOne({ email: "hritinraj.12a.24@gmail.com" })
    return user._id
}

// Main function to handle the post insertion
async function main() {
    try {
      let title = "Benefits of Mindfulness and Meditation in Everyday Life";
      let content = "In a world where stress and distractions are common, mindfulness and meditation have become invaluable tools for improving mental well-being and quality of life. These practices are rooted in ancient traditions but are increasingly supported by modern science, offering profound benefits for the mind and body. Here’s an in-depth look at the everyday benefits of mindfulness and meditation and how they can transform your life.";
  
      let authorId = await getUserId();
      await insertPost(title, content, authorId);  // Insert the post with retrieved authorId

      // Close the MongoDB connection after the operations are done
      await mongoose.connection.close(() => {
          console.log("MongoDB connection closed.");
      });

    } catch (error) {
        console.error("Error:", error);

         // Ensure connection is closed even in case of an error
        await mongoose.connection.close(() => {
            console.log("MongoDB connection closed due to an error.");
        });
    }
}

  
  // Call the main function
  main();