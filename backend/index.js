const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const mongoose = require("mongoose")
dotenv.config()

const app = express()

mongoose.connect(process.env.MONGODB_URL).then((res) => {
    console.log("Database connected");
}).catch(error => {
    console.log(error);
})

app.use(cors())
app.use(express.json())


//ROUTES
app.use("/v1/user", userRoute)
app.use("/v1/auth", authRoute)

const port = process.env.PORT || 8001

app.listen(port, (req, res) => {
    console.log("Server is running in ", + port)
})

