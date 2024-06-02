const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const addressRoute = require("./routes/address")
const productRoute = require("./routes/product")
const orderRoute = require("./routes/order")
const mongoose = require("mongoose")
dotenv.config()

const app = express()

mongoose.connect(process.env.MONGODB_URL).then((res) => {
    console.log("Database connected");
}).catch(error => {
    console.log("error", error);
})

app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
}))
app.use(express.json({ limit: '50mb' }));

//ROUTES
app.use("/v1/user", userRoute)
app.use("/v1/auth", authRoute)
app.use("/v1/product", productRoute)
app.use("/v1/address", addressRoute)
app.use("/v1/order", orderRoute)

const port = process.env.PORT || 8001

app.listen(port, (req, res) => {
    console.log("Server is running in ", + port)
})

