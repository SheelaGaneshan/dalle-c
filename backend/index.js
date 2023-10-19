import express from "express";
import * as dotenv from "dotenv"
import cors from 'cors'
import connectDB from "./db/db.js";
import postRoute from "./routes/postRoute.js";
import imgaiRoute from "./routes/imgaiRoute.js";
 

dotenv.config();
 
const app = express();
app.use(cors()
);

app.use(express.json({limit: '50mb'}));

app.use('/api/v1/post', postRoute);
app.use('/api/v1/imgai', imgaiRoute);

app.get('/', async (req, res)=>{
    res.send('Hello from Me');
})
const server = async() =>{
    try{
        connectDB(process.env.MONGODB_URL);
    
        app.listen(4000, ()=> console.log('Port in working'))
    } catch (error){
      console.log(error);   
    }
    
    
}

server();

