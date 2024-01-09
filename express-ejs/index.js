const express = require("express");
const app = express();
const path = require("path");

const tagsData = require("./data.json");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/rand", (req, res) => {
    const random = Math.floor(Math.random() * 10) + 1;
    res.render("random.ejs", { random: random });
});

app.get("/tag/:tag", (req, res) => {
    const { tag } = req.params;
    const data = tagsData[tag];
    if (data) {
        res.render("tag.ejs", { data: data });
    } else {
        res.render("notfound.ejs", { tag: tag });
    }
    res.render("tag.ejs", { tag: tag });
});

app.get("/cats", (req, res) => {
    const cats = ["Blue", "Rocket", "Monty", "Stephanie", "Winston"];
    res.render("cats.ejs", { cats });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
