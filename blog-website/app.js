const express = require("express");

const app = express();
const PORT = 3000;

// array for posts
let posts = [];

// important for reading data
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");

// home page
app.get("/", (req, res) => {
    res.render("index", { posts });
  });
  
// create new post
app.post("/posts", (req, res) => {
    const newPost = {
        id: Date.now(),
        creator: req.body.creator,
        title: req.body.title,
        content: req.body.content,
        createdAt: new Date()
    };

    posts.push(newPost);

    res.redirect("/");
});

// edit 
app.get("/edit/:id", (req, res) => {
  const id = Number(req.params.id);

  const post = posts.find((post) => post.id === id);

  res.render("edit", { post });
});

// update 
app.post("/edit/:id", (req, res) => {
  const id = Number(req.params.id);

  const post = posts.find((post) => post.id === id);

  post.creator = req.body.creator;
  post.title = req.body.title;
  post.content = req.body.content;

  res.redirect("/");
});

// delete post
app.post("/delete/:id", (req, res) => {
  const id = Number(req.params.id);

  posts = posts.filter((post) => post.id !== id);

  res.redirect("/");
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});