import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

mongoose.set('strictQuery', true);

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL_PRODUCTION);
    console.log('✅ Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('❌ Error de conexión a MongoDB:', error.message);
    process.exit(1);
  }
};

export default connection;
