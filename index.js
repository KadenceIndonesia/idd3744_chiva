const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
require("dotenv").config()
const indexRoutes = require("./routes/index");
const loginRoutes = require("./routes/login")
const kepoRoutes = require("./routes/kepo")
const session = require("express-session")
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(error => handleError(error));

global.baseurl = function(){
	var url = process.env.DOMAIN+":"+process.env.PORT+"/";
    return url;
}
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(session({
    secret: process.env.PROJECT,
    resave: true,
    saveUninitialized: true,
    name: process.env.PROJECT
}))
app.use("/", indexRoutes)
app.use("/login", loginRoutes)
app.use("/kepo/", kepoRoutes)
app.get("/logout", (req,res) => {
    req.session.destroy();
    res.redirect("/login")
})

app.listen(process.env.PORT, (req,res) => {
    
})