import app from './app.js';
import mongoose from 'mongoose';
import config from './config/config.js';


mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err.message);
        console.error("MongoDB URI used:", config.mongoUri);
        process.exit(1);
    });

mongoose.connection.on('error', () => {
    throw new Error(`Unable to connect to the database: ${config.mongoUri}`);
});

if (process.env.NODE_ENV === 'development') {
    app.listen(config.port, (err) => {
        if (err) {
            console.log(err);
        }
        console.info(`Server started on port ${config.port}`);
    });
}