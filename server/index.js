const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send({ msg: "Hello World!" });
})

app.listen(5000);