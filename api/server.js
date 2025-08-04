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
  origin: 'https://todo-frontend-steel-eight.vercel.app/'
}))
app.use(express.json())

app.use('/api/tasks', taskRoutes);

app.get('/', (req,res) => {
  res.send('API running...')
})

module.exports = serverlessExpress(app)