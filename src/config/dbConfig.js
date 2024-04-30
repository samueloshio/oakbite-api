import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // to initialize dotenv

const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 50000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

mongoose.set('strictQuery', true);

const connect_db = async () => {
  await mongoose.connect(process.env.MONGO_URL, options);
};
mongoose.connection.on('disconnected', () => {
  console.log('Database disconnected');
});
mongoose.connection.on('connected', () => {
  console.log('Database connected sucessfully');
});

export default connect_db;
