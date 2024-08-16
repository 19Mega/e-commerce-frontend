import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'

//import { HeartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { HeartIcon } from '@heroicons/react/24/solid'

import Swal from 'sweetalert2'

export default function ProductCategory({ products }) {

    const { usuario } = useContext(UserContext)
    const { userStore, userAction } = usuario

    const handleLike = async (id) => {
        const like = await userAction.addFavorite(id);
        if (!like.success) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Ingresa con tu cuenta para agregar favoritos!',
            });
        }
    }

    function handleDislike(id) {
        userAction.deleteFavorite(id)
    }

    return (
        <ul>
            {products.map((item) => (
                <li key={item.id} className='mb-2'>
                    <div className='relative cursor-pointer'>

                        {item.favorite ? (
                            <div className='absolute top-0 right-0 text-xl pr-1 pt-1 z-10' onClick={() => handleDislike(item.id)}>
                                <HeartIcon className='h-7 w-7 cursor-pointer text-indigo-700' aria-hidden='true' />
                            </div>
                        ) : (
                            <div className='absolute top-0 right-0 text-xl pr-1 pt-1  z-10' onClick={() => handleLike(item.id)}>
                                <HeartIcon className='h-7 w-7 cursor-pointer text-gray-300' aria-hidden='true' />
                            </div>
                        )}


                        {/* poner max-h-48 */}
                        <div className='w-full bg-gray-100 border-b border-gray-400'>
                            <div className='grid grid-cols-3 gap-2 p-2'>

                                <div className='col-span-1  md:max-h-48 w-full overflow-hidden rounded-sm bg-gray-100 lg:aspect-none group-hover:opacity-75 lg:80 image-container'>
                                    <img className='h-screen max-h-36 md:max-h-48 w-full object-cover object-center ' src={item.imageSrc} alt='Producto' />
                                </div>

                                <div className='col-span-2 w-full h-full bg-white-200 relative flex flex-col justify-between rounded-sm'>
                                    <div>
                                        <div className='flex justify-between'>
                                            {/* <span className='pl-2 pb-1 text-black font-bold text-md md:text-2xl md:font-semibold block'> Titulo producto</span> */}
                                            {/* <button className='p-2 text-red-500 hover:underline focus:outline-none'>Like</button> */}
                                        </div>
                                        <span className='pl-2 mr-3 pr-2 md:mr-4 md:pr-2 text-sm md:text-xl block hover:text-indigo-600 cursor-pointer'>{item.description}</span>
                                    </div>

                                    <div className='mt-2 flex'>
                                        <span className='pl-2 pb-1 text-gray-700 text-md md:text-md block'>U$D</span>
                                        <span className='pl-1 pb-1 text-gray-900 text-xl md:text-2xl block'>{item.price.toFixed(2)} </span>
                                        <span className='pl-2 pb-1 text-gray-300 text-xl md:text-2xl block'> / </span>
                                        <span className='pl-2 pb-1 text-gray-300 text-xl md:text-2xl block line-through'>{(item.price * 1.2).toFixed()}</span>
                                        <span className='pl-2 pb-1 text-red-600 text-xs md:text-lg block '>20% OFF </span>
                                    </div>

                                    <div className='flex justify-between items-end'>
                                        <button className='ml-2 px-3 md:p-1 text-black bg-yellow-300 hover:bg-yellow-500 focus:outline-none rounded-sm'>Al carrito</button>
                                        <button className='px-3 md:p-1 text-white bg-indigo-600 hover:bg-indigo-900 focus:outline-none rounded-sm'>Comprar</button>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </li>

            ))}


        </ul>

    )
}

