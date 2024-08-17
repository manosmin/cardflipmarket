import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import runScheduledTask from './utils/schedule.js';

import oracleCardRoutes from './routes/oracleCardRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/scryfall', oracleCardRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

connectDB().then(() => { runScheduledTask(); });

if (process.env.NODE_ENV === "PRODUCTION") {
    
    app.use(express.static("client/build"));
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }