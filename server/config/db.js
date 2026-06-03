import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Check if MONGODB_URI is configured
        if (!process.env.MONGODB_URI) {
            console.error('❌ MONGODB_URI is not set in .env file');
            console.error('   Please configure your MongoDB connection string.');
            console.error('   Example: MONGODB_URI=mongodb://localhost:27017/global-fame-monitor');
            process.exit(1);
        }

        console.log('🔄 Connecting to MongoDB...');

        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error('');
        console.error('❌ MongoDB Connection Failed!');
        console.error('');
        console.error('   Error:', error.message);
        console.error('');
        console.error('   Common solutions:');
        console.error('   1. Make sure MongoDB is running locally');
        console.error('      - Install: https://www.mongodb.com/try/download/community');
        console.error('      - Or use MongoDB Atlas: https://www.mongodb.com/atlas');
        console.error('');
        console.error('   2. Check your MONGODB_URI in server/.env:');
        console.error(`      Current: ${process.env.MONGODB_URI || 'NOT SET'}`);
        console.error('');
        console.error('   3. For local MongoDB, start the service:');
        console.error('      Windows: net start MongoDB');
        console.error('      Mac/Linux: sudo systemctl start mongod');
        console.error('');
        process.exit(1);
    }
};

export default connectDB;

