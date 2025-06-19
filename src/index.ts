import express from 'express'
import http from 'http'
import { createToken } from './controllers/createLST';


const app = express();
const server = http.createServer(app);


app.post("/helius", createToken)


server.listen(8080, () => {
    console.log("app is listening at port 8080");
})