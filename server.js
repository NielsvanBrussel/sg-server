const express =  require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')


const app = express();

app.use(cors({origin: `*`}))
app.use(express.json());
app.options('*', cors())
app.use(cookieParser())


const router = express.Router();
dotenv.config({path: './config/.env'})

// auth0 config for dashboard login


// connect to mongoDB

connectDB()


// routes

const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/authRoute')
const savegameRoute = require('./routes/savegameRoute')
const testRoute = require('./routes/testRoute')

app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/savegame', savegameRoute)
app.use('/api/test', testRoute)



const PORT = process.env.PORT || 4000
const server = app.listen(PORT, console.group(`server is running on ${PORT}`))

module.exports = server;  