import { app } from './app.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
dotenv.config();

//Database connection : 
connectDB();

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started at port : ${port}`);
})