const mongoose = require('mongoose');

// MongoDB 서버 URI
const dbURI = `${process.env.DB_URI}`;
const dbName = `${process.env.DB_NAME}`;

exports.connectDB = async () => {
    try {
        await mongoose.connect(dbURI + dbName);
        // await mongoose.connect(dbURI + dbName, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // });
        console.log('MongoDB conncected successfully');
    } catch (err) {
        console.error('Database connection error:', err);
        //process.exit(1);
    }
};

exports.disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log('MongoDB disconnected succesfully');
    } catch (err) {
        console.error('Error disconnecting database:', err);
    }
};
