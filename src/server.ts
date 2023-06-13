import express from "express";

const app = express();
const PORT = parseInt(`${process.env.PORT}`) || 3000;

app.listen(PORT, () => {
    console.log("Server is running")
})