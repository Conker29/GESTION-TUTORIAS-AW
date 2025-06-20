import {Schema, model} from 'mongoose'
import bcrypt from "bcryptjs"

const EstudianteSchema = new Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    apellido:{
        type:String,
        require:true,
        trim:true
    },
    celular:{
        type:String,
        trim:true,
        default:null
    },
    email:{
        type:String,
        require:true,
        trim:true,
				unique:true
    },
    password:{
        type:String,
        require:true
    },
    status:{
        type:Boolean,
        default:true
    },
    token:{
        type:String,
        default:null
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    rol:{
        type:String,
        default:"Estudiante"
    }

},{
    timestamps:true
})


// Método para cifrar el password del Estudiante
EstudianteSchema.methods.encrypPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}


// Método para verificar si el password ingresado es el mismo de la BDD
EstudianteSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}


// Método para crear un token 
EstudianteSchema.methods.crearToken = function(){
    const tokenGenerado = this.token = Math.random().toString(36).slice(2)
    return tokenGenerado
}


export default model('Estudiante',EstudianteSchema)