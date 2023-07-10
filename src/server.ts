import express from "express";

const app = express();

app.use(express.json())

//ROUTES
app.use(require("./routes/login/Login"));
app.use(require("./routes/user/User"));
app.use(require("./routes/company/Company"));

app.listen(3000, () => {
    console.log("Server is running")
})