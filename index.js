import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import pool from "./src/config/db.js";
import ServerlessHttp from "serverless-http";
import router from './src/routes/userRoutes.js'
//import errorHandling from "./src/middlewares/errorHandler.js";
//import createCompanyTable from "./src/data/createCompanyTable.js";
//import createUserTable from "./src/data/createUserTable.js";
//import createOrderTable from "./src/data/createOrderTable.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

//Middlewares

app.use(express.json({limit:'50mb'}));

app.use(cors());
//Routes
app.use("/api", router);

// Error Handling middleware
//app.use(errorHandling);

// Create Table
//createCompanyTable();
//createUserTable();
//createOrderTable();


//testing
app.get("/", async(req, res) => {

    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is : ${result.rows[0].current_database}`)
})

//Server running
app.listen(port, () => {
   console.log(`Server is running on http:localhost:${port}`)
});



