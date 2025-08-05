const serverlessExpress = require('serverless-http');
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('../src/config/db');
const taskRoutes = require('../src/routes/taskRoutes');

dotenv.config();

const app = express()
let isConnected = false;

async function initDB() {
  if (!isConnected) {
    console.log("connecting to DB....")
    try {
      await connectDB();
      isConnected = true;
      console.log('✅ DB Connected');
    } catch (error) {
      console.error('❌ DB Error:', error.message);
    }
  }
}

app.use(cors({
  origin: 'https://todo-frontend-steel-eight.vercel.app/',
  credentials: true
}))

app.use(express.json())

app.get('/', async (req, res) => {
  await initDB();
  res.status(200).send('✅ API is running');
});

app.use('/api/tasks', async (req, res, next) => {
  await initDB();
  next();
}, taskRoutes);

module.exports = serverlessExpress(app)