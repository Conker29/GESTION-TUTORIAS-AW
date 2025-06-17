import buhoImage from '../assets/buho.jpg'
import {Link, useParams} from 'react-router'
import axios from 'axios';
import { useEffect } from 'react'
import { ToastContainer ,toast} from 'react-toastify';

export const Confirm = () => {
    const {token} = useParams()

    const verifyToken = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/Confirmar/${token}`
            const respuesta = await axios.get(url)
            toast.success(respuesta?.data?.msg)
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }
    }

    useEffect(() => {
        verifyToken()
    }, [])


    return (
        
        <div className="flex flex-col items-center justify-center h-screen">
                <ToastContainer/>
                
            <img className="object-cover h-80 w-80 rounded-full border-slate-600" src={buhoImage} alt="image description"/>

            <div className="flex flex-col items-center justify-center">
                <p className="text-3xl md:text-4xl lg:text-5xl text-red-800 mt-12">Cuenta confirmada</p>
                <p className="md:text-lg lg:text-xl text-black mt-8">Ya puedes iniciar sesión</p>
                <Link to="/login" className="p-3 m-5 w-full text-center bg-amber-900 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white">Login</Link>
            </div>

        </div>
    )
}
