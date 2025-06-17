import mongoose from 'mongoose'
const uri = mongodb+srv://GESTOR-TUTORIAS-AW:<E5f0t2025>@gestor.41b6ekm.mongodb.net/?retryWrites=true&w=majority&appName=Gestor


mongoose.set('strictQuery', true)

const connection = async()=>{
    try {
        const {connection} = await mongoose.connect(process.env.MONGODB_URI_PRODUCTION)
        console.log(`Conectado con exito en ${connection.host} - ${connection.port}`)
    } catch (error) {
        console.log(error);
        process.exit(1)  // Detiene el servidor si falla la conexión
    }
}

export default connection
