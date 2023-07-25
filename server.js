const express =  require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const path = require('path');


const app = express();


var whitelist = ['https://svelte-game-server-4erv.onrender.com', 'http://localhost:4001']
var corsOptions = {
  origin: function (origin, callback) {
    console.log(origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error(`Not allowed by CORS ${origin}`))
    }
  }
}

app.use(cors(corsOptions))

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


app.use(express.static('client/dist'));
app.get('*', (req, res) => {
    console.log('wtf')
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});



const PORT = process.env.PORT || 4000
const server = app.listen(PORT, console.group(`server is running on ${PORT}`))

module.exports = server;  