import express from "express";
import session from "express-session";

// Import default config
import { config } from "./config/config";

// Declare data type for the current session
declare module "express-session" {
  export interface SessionData {
    user: { username: string; id: number };
  }
}

// Import routes
import routes from "./routes/routes";

// Default Setups
const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

app.set("trust proxy", 1);
app.use(
  session({
    secret: config.sessionSecretKey,
    name: "sid",
    // store: new MySQLStore({}, connection), // In production, use MySQLStore https://www.npmjs.com/package/express-mysql-session
    cookie: {
      secure: config.environment === "prod",
    },
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));

routes(app);

app.get("/", async (req, res) => {
  if (!req.session.user) res.redirect("/login");
  res.render("index", { title: "Hello World!" });
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
