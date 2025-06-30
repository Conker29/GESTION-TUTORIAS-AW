import Estudiante from "../models/estudiante.js"
import {sendMailToRegister, sendMailToRecoveryPassword} from "../config/nodemailer.js"
import { crearTokenJWT } from "../middlewares/JWT.js"
import mongoose from "mongoose" 

const registro = async (req,res)=>{
    const {email,password} = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Todos los campos son obligatorios."})
    const verificarEmailBDD = await Estudiante.findOne({email})
    if(verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
    const nuevoEstudiante = new Estudiante(req.body)
    nuevoEstudiante.password = await nuevoEstudiante.encrypPassword(password)
    const token = nuevoEstudiante.crearToken()
    await sendMailToRegister(email,token)
    await nuevoEstudiante.save()
    res.status(200).json({msg:"Revisa tu correo electrónico para confirmar tu cuenta"})
}

const confirmarMail = async (req,res)=>{
    if(!(req.params.token)) return res.status(400).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    const EstudianteBDD = await Estudiante.findOne({token:req.params.token})
    if(!EstudianteBDD?.token) return res.status(404).json({msg:"La cuenta ya ha sido confirmada"})
    EstudianteBDD.token = null
    EstudianteBDD.confirmEmail=true
    await EstudianteBDD.save()
    res.status(200).json({msg:"Token confirmado, ya puedes iniciar sesión"}) 
}

//Etapa 1
const recuperarPassword = async(req, res) => {
    //Primera validacion: Obtener el email 
    const {email} = req.body
    //2: Verificar que el correo electronico no este en blanco
    if (Object.values(req.body).includes("")) return res.status(404).json({msg: "Todos los campos deben ser llenados obligatoriamente."})

    //Verificar que exista el correo electronico en la base de datos
    const EstudianteBDD = await Estudiante.findOne({email})

    if (!EstudianteBDD) return res.status(404).json({msg: "Lo sentimos, el usuario no existe"})
    //3
    const token = EstudianteBDD.crearToken()
    EstudianteBDD.token = token

    //Enviar email
    await sendMailToRecoveryPassword(email,token)
    await EstudianteBDD.save()
    //4
    res.status(200).json({msg: "Revisa tu correo electrónico para restablecer tu contraseña."})
}

//Etapa 2
const comprobarTokenPassword = async (req, res) => {
    //1
    const {token} = req.params
    //2
    const EstudianteBDD = await Estudiante. findOne({token})
    if (EstudianteBDD.token !== token) return res.status (404).json({msg:"Lo sentimos, no se puede validar la cuenta"})
    //3
    await EstudianteBDD.save()
    //4
    res.status(200).json({msg:"Token confirmado ya puedes crear tu password"})
}

//Etapa 3
const crearNuevoPassword = async (req, res) => {
    //1
    const {password,confirmpassword} = req.body
    //2
    if (Object.values(req.body).includes("")) return res.status(404).json({msg: "Lo sentimos debes llenar todos los campos"})
    
    if (password!== confirmpassword) return res.status(404).json({msg: "Lo sentimos, los passwords no coinciden"})
    
    const EstudianteBDD = await Estudiante.findOne({token:req.params.token})

    console.log(EstudianteBDD);
    

    if (EstudianteBDD.token !== req.params.token) return res.status(404).json({msg: "Lo sentimos no se puede validar su cuenta"})

    //3
    EstudianteBDD.token = null
    EstudianteBDD.password = await EstudianteBDD.encrypPassword(password)
    await EstudianteBDD.save()


    //4


    res.status(200).json({msg:"Ya puede iniciar sesion con su nueva contraseña."})
}

const login = async (req, res) => {
    //1
    const {email, password} = req.body
    //2
    if(Object.values(req.body).includes("")) return res.status(400).json({msg: "Todos los campos son obligatorios."})
    
    const EstudianteBDD = await Estudiante.findOne({email}).select("-status -__v -token -createdAt -updateAt")   //Quitar de la base de datos los siguientes campos
    
    //Verificar que el usuario ha creado la cuenta.
    if (EstudianteBDD?.confirmEmail === false) return res.status(401).json({msg: "Su usuario debe estar registrado antes de iniciar sesión."})
    //Verificar que el email del usuario exista en la base de datos.
    if(!EstudianteBDD) return res.status(404).json({msg: "Lo sentimos, el usuario no existe."})
    
    const verificarPassword = await EstudianteBDD.matchPassword(password)

    if (!verificarPassword) return res.status(401).json({msg: "Lo sentimos, la contraseña es incorrecta."})
    //3
    const{nombre, apellido,telefono, _id, rol} = EstudianteBDD
    const token = crearTokenJWT(EstudianteBDD._id,EstudianteBDD.rol)

    //4: Enviar los siguientes campos al frontend
    res.status(200).json({
        token,
        rol,
        nombre,
        apellido,
        telefono,
        _id,
        email: EstudianteBDD.email
    })
}

const perfil =(req,res)=>{
		const {token,confirmEmail,createdAt,updatedAt,__v,...datosPerfil} = req.EstudianteBDD
    res.status(200).json(datosPerfil);
}

const actualizarPerfil = async (req,res)=>{
    const {id} = req.params
    const {nombre,apellido,direccion,celular,email} = req.body
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, debe ser un id válido`});
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"});
    const EstudianteBDD = await Estudiante.findById(id)
    if(!EstudianteBDD) return res.status(404).json({msg:`Lo sentimos, no existe el Estudiante ${id}`})
    if (EstudianteBDD.email != email)
    {
        const EstudianteBDDMail = await Estudiante.findOne({email})
        if (EstudianteBDDMail)
        {
            return res.status(404).json({msg:`Lo sentimos, el email existe ya se encuentra registrado`})  
        }
    }
        EstudianteBDD.nombre = nombre ?? EstudianteBDD.nombre
        EstudianteBDD.apellido = apellido ?? EstudianteBDD.apellido
        EstudianteBDD.celular = celular ?? EstudianteBDD.celular
        EstudianteBDD.email = email ?? EstudianteBDD.email
        await EstudianteBDD.save()
        console.log(EstudianteBDD)
        res.status(200).json(EstudianteBDD)
}

const actualizarPassword = async (req,res)=>{
    const EstudianteBDD = await Estudiante.findById(req.EstudianteBDD._id)
    if(!EstudianteBDD) return res.status(404).json({msg:`Lo sentimos, no existe el Estudiante ${id}`})
    const verificarPassword = await EstudianteBDD.matchPassword(req.body.passwordactual)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password actual no es el correcto"})
    EstudianteBDD.password = await EstudianteBDD.encrypPassword(req.body.passwordnuevo)
    await EstudianteBDD.save()
    res.status(200).json({msg:"Password actualizado correctamente"})
}

export {
    registro,
    confirmarMail,
    recuperarPassword,
    comprobarTokenPassword,
    crearNuevoPassword,
    login,
    perfil,
    actualizarPerfil,
    actualizarPassword
}
