import express from "express";

const app = express();

app.use(express.json())

//ROUTES
app.use(require("./routes/Login"));

app.listen(3000, () => {
    console.log("Server is running")
})