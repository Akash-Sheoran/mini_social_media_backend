import mongoose from "mongoose";
import "dotenv";


export async function connect_db(){
    await mongoose.connect(process.env.CONNETION_URL + process.env.DATABASE_NAME).then((data)=>{
        console.log('connection to database is succesfull');
    }).catch((err) => {
        console.log(`connection to database failed due to ${err}`)
    })
}