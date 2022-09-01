import express from "express";

// Import routes
import routes from "./routes/routes";

// Default Setups
const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));

routes(app);

app.get("/", (req, res) => {
  if (!req.cookies.user) res.redirect("/login");
  res.render("index", { title: "Hello World!" });
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
