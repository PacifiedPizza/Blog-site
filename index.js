import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));

let blogPosts = [
    { id: 1, title: "Example 1", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.", author: "Lorem Ipsum" },
];

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index.ejs", { blogPosts });
});

app.get("/post/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = blogPosts.find((post) => post.id === postId);
    const cssFilePath = `/styles/post${postId}.css`;

    res.render("post.ejs", { post, cssFilePath });
});

app.get("/compose", (req, res) => {
    res.render("compose.ejs");
});

app.get("/back", (req, res) => {
    res.render("index.ejs", { blogPosts });
});

app.post("/compose", (req, res) => {
    const { title, content, author } = req.body;

    const newPostId = blogPosts.length + 1;

    blogPosts.push({ id: newPostId, title, content, author });

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
