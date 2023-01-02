const express = require('express');
const app = express();
const PORT = 3000;
const cors = require("cors");
const { obtenerPost, agregarPost } = require('./info.js');

app.use(express.json());
app.use(cors());




app.use(express.static("public"));

app.use(express.json())
app.use(express.static("public"));

app.get("/", (req, res) => {
    try {
        res.sendFile();
    } catch (error) {
        res.json({ message: "ERROR" });
    }
});
app.get('/posts', async (req, res) => {
    try {
        const post = await obtenerTodos();
        res.json(post);
    } catch (error) {
        console.log(error);
    }
});
app.post("/posts", async (req, res) => {
    try {
        const { titulo, url, descripcion } = req.body;
        await agregarPost(titulo, url, descripcion);
        res.send("Post creado");
    } catch (error) {
        console.log(error);
    }
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.listen(3000, console.log("servidor arriba"));