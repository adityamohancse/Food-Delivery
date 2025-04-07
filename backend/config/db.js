import mongoose from "mongoose";

export const  connectDB = async () =>{

    await mongoose.connect('mongodb+srv://adityamohan:sanaaditya1234@cluster0.kxlevae.mongodb.net/food-del').then(()=>console.log("DB Connected"));
   
}

// add your mongoDB connection string above.
// Do not use '@' symbol in your database user's password else it will show an error. 
