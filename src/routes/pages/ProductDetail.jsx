import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'


import { HeartIcon } from '@heroicons/react/24/solid'
import { UserContext } from '../context/UserContext'
import { CartContext } from '../context/CartContext'

export default function ProductDetail() {
    const params = useParams()
    const [item, setItem] = useState()

    const { product } = useContext(ProductContext)
    const { productAction } = product

    const { usuario } = useContext(UserContext)
    const { userStore, userAction } = usuario

    const { addToCart } = useContext(CartContext);

    const [selectedImage, setSelectedImage] = useState()

    const getProduct = async (id) => {
        const productDetail = await productAction.getProductDetail(id)
        console.log(productDetail)
        setItem(productDetail)
        setSelectedImage(productDetail.image_1)

        if (JSON.parse(localStorage.getItem('userFavorites'))) {
            const favorites = JSON.parse(localStorage.getItem('userFavorites'))
            const intId = parseInt(id)

            if (favorites.includes(intId)) {
                const updatedProduct = { ...productDetail, favorite: true }
                console.log("updatedproduct: ", updatedProduct)
                setItem(updatedProduct)
            }
        }

    }

    const handleLike = (id) => {
        if (localStorage.getItem('userName')) {
            userAction.addFavorite(id)
            setItem(prevItem => ({ ...prevItem, favorite: true }))
        }
        else {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Ingresa con tu cuenta para agregar favoritos!',
            })
        }
    }

    const handleDislike = (id) => {
        if (localStorage.getItem('userName')) {
            userAction.deleteFavorite(id)
            setItem(prevItem => ({ ...prevItem, favorite: false }))
        }
        else {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Ingresa con tu cuenta para agregar favoritos!',
            })
        }
    }

    const handleAddToCart = (id) => {
        addToCart(id)
      }

    useEffect(() => {
        getProduct(params.id)
    }, [])

    return (
        <div className='bg-white'>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="mt-4 mb-2 md:py-2 text-center text-3xl md:text-4xl font-normal bg-gradient-to-r from-emerald-400 to-indigo-500 text-white">Lunes a Viernes hasta 20% OFF</h1>

            </div>

            {/* Product info */}
            <div className='mx-auto max-w-2xl px-4 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-4 lg:px-8 lg:pb-24'>

                <div className='h-1 bg-gradient-to-r from-emerald-400 to-indigo-500 font-semibold text-center my-2 col-span-full'> </div>

                <div className='lg:col-span-2 lg:border-r lg:border-emerald-200 lg:pr-4 '>

                    <div className='relative h-80 lg:h-[600px] sm:h-[500px] w-full overflow-hidden bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 border-b border-emerald-200 p-3'>


                        {item && (
                            <div className='absolute top-0 right-0 text-xl pr-1 pt-1 z-10'>
                                {item.favorite ? (
                                    <HeartIcon className='h-12 w-12 cursor-pointer text-red-500' aria-hidden='true' onClick={() => handleDislike(item.id)} />
                                ) : (
                                    <HeartIcon className='h-12 w-12 cursor-pointer text-gray-200 hover:text-red-500 transition-colors duration-300' aria-hidden='true' onClick={() => handleLike(item.id)} />
                                )}
                            </div>
                        )}

                        {/* Big image */}
                        {item && (<img
                            src={selectedImage}
                            className='h-full w-full object-contain'
                        />
                        )}

                    </div>

                    {/* Miniature images */}
                    <div className='flex justify-center items-start h-28 gap-4 p-4 overflow-x-auto'>

                        {item?.image_1 && (<img
                            src={item.image_1}
                            className='h-16 w-16 md:ml-2 object-contain cursor-pointer scale-125'
                            onClick={() => setSelectedImage(item.image_1)}
                        />
                        )}

                        {item?.image_2 && (<img
                            src={item.image_2}
                            className='h-16 w-16 md:ml-2 object-contain cursor-pointer scale-125'
                            onClick={() => setSelectedImage(item.image_2)}
                        />
                        )}

                        {item?.image_3 && (<img
                            src={item.image_3}
                            className='h-16 w-16 md:ml-2 object-contain cursor-pointer scale-125'
                            onClick={() => setSelectedImage(item.image_3)}
                        />
                        )}

                        {item?.image_4 && (<img
                            src={item.image_4}
                            className='h-16 w-16 md:ml-2 object-contain cursor-pointer scale-125'
                            onClick={() => setSelectedImage(item.image_4)}
                        />
                        )}

                    </div>
                </div>


                {/* Options */}
                <div className='mt-8'>
                    <div className='flex'>
                        <p className='text-3xl md:text-3xl tracking-tight text-gray-900'>
                            U$D {item?.price || 0}
                        </p>
                        <p className='text-3xl md:text-3xl tracking-tight text-gray-300 mx-1'>/</p>
                        <p className='text-3xl md:text-3xl tracking-tight text-gray-300 line-through'>
                            {(1 + (item?.discount || 0) / 100) * (item?.price || 0)}
                        </p>

                    </div>

                    <div className='my-2'>
                        <span className='text-emerald-500 font-semibold underline'>Envío Gratis</span> <span className='font-medium text-base text-gray-400 mx-1'>A cualquier parte del país </span>
                    </div>

                    <div className='text-lg border-2 border-gray-100 shadow-sm text-gray-500 px-2 py-2 mt-4 rounded-sm'>
                        {item?.short_description}
                    </div>

                    <div className='text-lg border-2 border-gray-100 shadow-sm text-gray-500 px-2 py-2 mt-2 rounded-sm'>
                        {item?.long_description}
                    </div>

                    {/* <ul className='text-lg border-2 border-gray-100 text-gray-500 p-2 mt-2 rounded-sm'>
                        <li>
                            <span className='text-indigo-500 font-semibold'> ● </span> <span className='font-medium text-base'> Una tarjeta gráfica potente y confiable. </span>
                        </li>
                    </ul> */}

                    <ul className='border-2 border-gray-100 shadow-sm text-gray-600 p-2 mt-2 rounded-sm'>
                        <span className='text-indigo-400 text-lg font-semibold'>Sobre este artículo</span>

                        {item?.characteristic_1_title &&
                            <li>
                                <span className='text-indigo-700 text-sm font-semibold'> ● {item.characteristic_1_title} :</span> <span className='font-normal text-sm '> {item.characteristic_1_description} </span>
                            </li>
                        }
                        {item?.characteristic_2_title &&
                            <li>
                                <span className='text-indigo-700 text-sm font-semibold'> ● {item.characteristic_2_title} :</span> <span className='font-normal text-sm '> {item.characteristic_2_description} </span>
                            </li>
                        }
                        {item?.characteristic_3_title &&
                            <li>
                                <span className='text-indigo-700 text-sm font-semibold'> ● {item.characteristic_3_title} :</span> <span className='font-normal text-sm '> {item.characteristic_3_description} </span>
                            </li>
                        }
                        {item?.characteristic_4_title &&
                            <li>
                                <span className='text-indigo-700 text-sm font-semibold'> ● {item.characteristic_4_title} :</span> <span className='font-normal text-sm '> {item.characteristic_4_description} </span>
                            </li>
                        }
                    </ul>


                    
                        <button
                        onClick={() => handleAddToCart(item?.id)}
                            className='mt-2 flex w-full items-center justify-center border border-transparent bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2'
                        >
                            Agregar al Carrito
                        </button>

                        <button
                            className='mt-2 flex w-full items-center justify-center border border-transparent bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        >
                            Comprar Ahora
                        </button>

                        <div className='h-1 bg-gradient-to-r from-emerald-400  to-indigo-500 font-semibold text-center mt-2 '>

                        </div>
                    


                </div>

                <div className=' '>
                    {/* Description and details */}
                    {/* <div>
                        <h3 className='sr-only'>Description</h3>
                        <div className='space-y-6'>
                            <p className='text-base text-gray-900'>{item.long_description}</p>
                        </div>
                    </div> */}

                    {/* <div className='mt-10'>
                        <h3 className='text-sm font-medium text-gray-900'>Highlights</h3>
                        <div className='mt-4'>
                            <ul role='list' className='list-disc space-y-2 pl-4 text-sm'>
                                {product.highlights.map((highlight) => (
                    <li key={highlight} className='text-gray-400'>
                      <span className='text-gray-600'>{highlight}</span>
                    </li>
                  ))}
                            </ul>
                        </div>
                    </div> */}

                    {/* <div className='mt-10'>
                        <h2 className='text-sm font-medium text-gray-900'>Details</h2>
                        <div className='mt-4 space-y-6'>
                            <p className='text-sm text-gray-600'>{product.details}</p>
                        </div>
                    </div> */}

                </div>
            </div>

        </div>

    )
}
