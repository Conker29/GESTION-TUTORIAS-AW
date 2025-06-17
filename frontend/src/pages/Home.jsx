import estudiantes from '../assets/estudiantes.webp'
import logoEPN from '../assets/logoEPN.svg';
import logoESFOT from '../assets/logoESFOT.png';
import { Link } from 'react-router';
import { MdDashboard } from "react-icons/md";
import { FaRobot } from "react-icons/fa";
import { FaCommentSms } from "react-icons/fa6";
import { TbDog } from "react-icons/tb";
import { GiMedicines } from "react-icons/gi";
import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

export const Home = () => {
    return (
        <>
            <header className="
                w-full
                py-4 px-4 
                flex items-center justify-between 
                md:py-2 md:px-6 shadow-md
                bg-gray-100
            ">
                {/* Contenedor para los logos */}
                <div className="flex items-center space-x-2"> 
                    <img src={logoEPN} alt="Logo EPN" className='w-25 h-auto' />   {/* Tamaños más pequeños para la cabecera */}
                    <img src={logoESFOT} alt="Logo ESFOT" className='w-30 h-auto' /> {/* Tamaños más pequeños para la cabecera */}
                </div>
                
                {/* Botón de LOGIN a la derecha */}
                <Link 
                    to="/login" 
                    href="#" 
                    className='
                        block                   
                        bg-blue-900             
                        w-32                    {/* Ancho ligeramente más pequeño para la cabecera */}
                        py-2                    
                        text-white              
                        rounded-2xl             
                        text-center             
                        hover:bg-red-800       
                        transition-colors duration-300 
                    '
                >
                    LOGIN
                </Link>
            </header>

            {/* MAIN con la imagen de fondo y texto de bienvenida */}
            <main 
                className='
                    relative flex flex-col items-center justify-center min-h-screen
                    text-center          
                    py-12 px-8           
                    bg-cover bg-center   
                    md:flex-row          
                    md:text-left         
                    md:py-8
                '
                style={{ backgroundImage: `url(${estudiantes})` }} 
            >
                {/* Overlay encima del fondo grande */}
                <div className='absolute inset-0 bg-black opacity-80'></div> 

                {/* Contenido Principal (Texto de bienvenida) */}
                <div className='relative z-10 text-white md:w-1/2'> 
                    <h1 className='text-center font-lato font-extrabold uppercase text-4xl my-4 md:text-6xl'>
                        BIENVENIDO A LA PLATAFORMA
                    </h1>
                    <p className='text-center text-2xl my-6 font-sans'>
                        Agenda una cita con tu tutor académico aquí
                    </p>
                </div>
            </main>

            <section className='container mx-auto px-4'>
                <div className='container mx-auto relative mt-6'>
                    <h2 className='font-semibold text-3xl relative z-1 w-50 text-red-900 text-center mx-auto'>MAS INFORMACION</h2>
                    <div className='text-blue-900 absolute top-1/2 w-full z-0' />
                </div>

                <div className='my-10 flex flex-col gap-10 items-center sm:flex-row sm:justify-around sm:items-center'>
                    <div className='px-10 sm:w-1/2'>
                        <p className='my-4'>Mediante esta plataforma puedes
                        </p>
                        <ul className='space-y-4'>
                            <li>
                                <MdDashboard className='inline text-2xl mr-2' />Agendar una cita con tu docente de acuerdo a su disponibilidad
                            </li>
                            <li>
                                <FaRobot className='inline text-2xl mr-2' />
                                Dudas en tiempo real
                            </li>
                            <li>
                                <FaCommentSms className='inline text-2xl mr-2' />
                                Realtime chat
                            </li>
                            <li>
                                <TbDog className='inline text-2xl mr-2' />
                                Management Patients
                            </li>
                            <li>
                                <GiMedicines className='inline text-2xl mr-2' />
                                Management Treatments
                            </li>
                        </ul>
                        <p className='my-4'>And other features that leverage the modern technologies</p>
                    </div>
                </div>
            </section>


            <section className='container mx-auto px-4'>
                <div className='container mx-auto relative mt-6'>
                    <h2 className='font-semibold text-3xl relative z-1 w-50 text-center mx-auto bg-white'>SERVICIOS</h2>
                    <div className='text-amber-900 border-2 absolute top-1/2 w-full z-0' />
                </div>

                <div className='my-10 flex justify-between flex-wrap gap-5'>
                    <div className="text-center shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.3)] hover:shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.5)] transition-shadow duration-300 relative pt-4 bg-red-50 sm:flex-1">
                        <TbDog className='inline text-5xl' />
                        <h4 className="text-xl font-bold py-4 text-amber-700 hover:underline">Management Patients</h4>
                        <p className="my-4 px-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
                            similique sint eius consectetur rerum voluptate rem tenetur quisquam veniam quos ad facilis alias
                            necessitatibus.</p>
                        <hr className="border-1 border-amber-900 absolute w-full" />
                    </div>

                    <div className="text-center shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.3)] hover:shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.5)] transition-shadow duration-300 relative pt-4 bg-red-50 sm:flex-1">
                        <GiMedicines className='inline text-5xl' />
                        <h4 className="text-xl font-bold py-4 text-amber-700 hover:underline">Management Treatments</h4>
                        <p className="my-4 px-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
                            similique sint eius consectetur rerum voluptate rem tenetur quisquam veniam quos ad facilis alias
                            necessitatibus.</p>
                        <hr className="border-1 border-amber-900 absolute w-full" />
                    </div>

                    <div className="text-center shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.3)] hover:shadow-[0.1rem_0.1rem_1rem_rgba(0,0,0,0.5)] transition-shadow duration-300 relative pt-4 sm:flex-1">
                        <FaCommentSms className='inline text-5xl' />
                        <h4 className="text-xl font-bold py-4 text-amber-700 hover:underline">Realtime Chat</h4>
                        <p className="my-4 px-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
                            similique sint eius consectetur rerum voluptate rem tenetur quisquam veniam quos ad facilis alias
                            necessitatibus.</p>
                        <hr className="border-1 border-amber-900 absolute w-full" />
                    </div>
                </div>
            </section>


            <footer className='text-center bg-gray-50 p-6 sm:px-20 sm:py-10 mt-20 rounded-tr-3xl rounded-tl-3xl space-y-8'>

                <div className='flex justify-between items-center'>
                    <div className='text-left'>
                    <p className='text-3xl font-extrabold text-amber-800'>Contacto</p>
                        <p className='font-bold my-2'>Email: tutorias.esfot@gmail.com</p>
                        <p className='font-bold'>Para más información acercarse a la casona de la ESFOT</p>
                    </div>
                    <ul className='flex gap-4'>
                        <li><FaFacebook className='text-2xl' /></li>
                        <li><FaSquareInstagram className='text-2xl' /></li>
                        <li><FaXTwitter className='text-2xl' /></li>
                    </ul>
                </div>

                <hr className='border-1 border-blue-800' />

                <p className='font-semibold'>
                    Copyright 2025 © - Tutorías ESFOT
                </p>
            </footer>

        </>
    )
}
