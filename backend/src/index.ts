import express, {type Express } from "express";
import cors from "cors";
import bodyParser from 'body-parser';
import './firebaseConfig'; // ensures Firebase is initialized
import {signInRequest, createAccRequest, getUserData, updateData, modifyData, deleteData} from "./route";

// Configure and start the HTTP server.
const port: number = 8088;
const app: Express = express();
app.use(cors());
app.use(bodyParser.json());
app.get("/api/signIn", signInRequest);
app.get("/api/createAcc", createAccRequest);
app.get('/api/getUserData', getUserData);
app.post('/api/updateData', updateData);
app.post('/api/modifyData', modifyData);
app.post('/api/deleteData', deleteData)
app.listen(port, () => console.log(`Server listening on port ${port}`));