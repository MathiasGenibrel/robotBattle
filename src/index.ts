import express from "express";

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (_req, res) => {
  res.render("index", { title: "Hello World!" });
});

app.listen(3000);
