// SECTION  Modules
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");

// SECTION Instanced Modules
const app = express();

// SECTION Global Variables
const PORT = process.env.PORT || 4000;
const routes = require("./routes");

// SECTION Body Parser
app.unsubscribe(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

// SECTION Middleware
app.use((req, res, next) => {
  const url = req.url;
  const method = req.method;
  const requestedAt = new Date().toLocaleDateString();
  console.table({ url, method, requestedAt });
  next();
});

// SECTION User Sessions
app.use(
  session({
    secret: `${process.env.SECRET}`,
    resave: false,
    saveUninitialized: false
  })
);

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "PUT", "POST", "HEAD", "DELETE", "OPTIONS"],
  headers: ["Origin", "X-Reguested-With", "Content-Type", "Accept"],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.options("http://loaclhost:3000");

// SECTION Routes
// Home Root
app.get("/", (req, res) => {
  res.send("<h1>hello ig-clone</h1>");
});

// User Routes
app.use("/auth", routes.auth);
// app.use('/post', routes.post)
// app.use('/comment', routes.comment)

// SECTION Server Listener
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
