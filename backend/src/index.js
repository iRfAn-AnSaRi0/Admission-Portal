import { app } from "./app.js";
import dotenv from "dotenv"
import { DbConnection } from "./db/DbConnection.js"

dotenv.config({
    path: './.env'
})

DbConnection()
.then(app.listen(process.env.PORT || 8080 ,()=>{
    console.log(`Server is running on ${process.env.PORT}`);
    
})).catch((error)=>{
    console.log("Error :" ,error);
    
})