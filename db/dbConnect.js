// external imports
const mongoose = require("mongoose");

const connectDb = async() => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = connectDb