import mongoose from 'mongoose'

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
