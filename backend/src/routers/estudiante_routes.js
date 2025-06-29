import {Router} from 'express'
import { confirmarMail, recuperarPassword, registro, comprobarTokenPassword, crearNuevoPassword, login, perfil, actualizarPerfil,
    actualizarPassword} from '../controllers/estudiante_controller.js'
import { verificarTokenJWT } from '../middlewares/JWT.js'

const router = Router()

//Rutas públicas
router.post('/registro',registro)

router.get('/confirmar/:token', confirmarMail)

router.post('/recuperarpassword',recuperarPassword)

router.get('/recuperarpassword/:token',comprobarTokenPassword)

router.post('/nuevopassword/:token',crearNuevoPassword)

router.post ('/login',login)

//Rutas privadas
router.get('/perfil',verificarTokenJWT,perfil)

router.put('/estudiante/:id',verificarTokenJWT,actualizarPerfil)

router.put('/estudiante/actualizarpassword/:id',verificarTokenJWT,actualizarPassword)

export default router
