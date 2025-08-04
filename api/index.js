const serverlessExpress = require('serverless-http');
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('../src/config/db');
const taskRoutes = require('../src/routes/taskRoutes');

dotenv.config();

const app = express()
connectDB();

app.use(cors({
  origin: 'https://todo-frontend-steel-eight.vercel.app',
  credentials: true
}))
app.use(express.json())

app.use('/', taskRoutes);

app.get('/', (req,res) => {
  res.send("API is running")
})


module.exports = serverlessExpress(app)