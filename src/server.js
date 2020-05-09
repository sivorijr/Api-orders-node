const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(require("./routes"));

mongoose.connect("mongodb+srv://root:root@cluster-x26u1.gcp.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(process.env.PORT || 3434);