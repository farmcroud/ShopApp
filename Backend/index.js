const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();
app.use(express.json());
app.use(cors());


app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);


async function main() {
    await mongoose.connect("mongodb+srv://doadmin:bh2k15u6p4z9C7I3@dbaas-db-6126458-ab3ca6ce.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=dbaas-db-6126458")
    app.listen(3000);
    console.log("listening on port 3000")
}

main()
