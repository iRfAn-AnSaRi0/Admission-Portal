import mongoose from 'mongoose'

const DbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("DB Connected");

    } catch (error) {
        console.log("Error : ", error);

    }
}

export { DbConnection }