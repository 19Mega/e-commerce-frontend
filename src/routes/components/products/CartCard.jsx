import React, { useState } from 'react'
// import { HeartIcon } from '@heroicons/react/24/solid'
// import { XMarkIcon } from '@heroicons/react/24/outline'
import { MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { TrashIcon } from '@heroicons/react/24/outline';


export const CartCard = ({ product, onRemoveItem, onQuantityChange }) => {

    const [item, setItem] = useState(product)

    const addItem = () => {
        if (item.quantity === item.stock) {
            return
        }
        else {
            setItem(prevItem => ({
                ...prevItem,
                quantity: prevItem.quantity + 1
            }))
            onQuantityChange(item.id, item.quantity + 1)
        }
    }

    const removeItem = () => {
        if (item.quantity === 1) {
            return
        }
        else {
            setItem(prevItem => ({
                ...prevItem,
                quantity: prevItem.quantity - 1
            }))
            onQuantityChange(item.id, item.quantity - 1)
        }
    }



    return (
        <div key={item.id} className='mb-2 ring-2 ring-transparent '>
            <div className='relative cursor-pointer'>

                <div className='absolute top-0 right-0 text-xl pr-1 pt-1 z-10'>
                    <TrashIcon className='m-1 h-5 w-5 cursor-pointer text-gray-400 hover:text-red-500 stroke-2' aria-hidden='true' onClick={() => onRemoveItem(item.id)} />
                </div>

                {/* poner max-h-48 */}
                <div className='w-full shadow-sm border-2'>
                    <div className='grid grid-cols-3 gap-2 p-2'>

                        <div className='col-span-1 md:max-h-36 w-full overflow-hidden rounded-sm bg-gray-50 lg:aspect-none group-hover:opacity-75 image-container'>
                            <img className='h-screen max-h-32 md:max-h-36 w-full object-scale-down' src={item.image_1} alt='Producto' />
                        </div>

                        <div className='col-span-2 w-full h-full bg-white-200 relative flex flex-col justify-between rounded-sm'>
                            <span className='pl-2 mr-3 pr-2 md:mr-4 md:pr-2 text-sm md:text-xl block hover:text-indigo-600 cursor-pointer'>{item.short_description}</span>

                            <div className='mt-2 flex'>
                                <span className='pl-2 pb-1 text-gray-500 text-md md:pr-1 md:text-md md:font-medium block'>U$D</span>
                                <span className='pl-1 pb-1 text-gray-900 text-xl md:text-2xl block'>{item.price.toFixed(2)} </span>
                                <span className='pl-2 pb-1 text-gray-300 text-xl md:text-2xl block'> / </span>
                                <span className='pl-2 pb-1 text-gray-300 text-xl md:text-2xl block line-through'>{(item.price * 1.2).toFixed()}</span>
                                <span className='pl-2 pb-1 text-red-500 text-xs font-semibold md:text-lg block '>{item.discount}% OFF </span>
                            </div>

                            <div className='flex justify-between items-start'>
                                <div className='px-2 text-indigo-500 font-medium text-sm'>Stock: {item.stock}</div>
                                <div className='flex'>
                                    <MinusIcon className='h-6 w-6 cursor-pointer bg-gray-100 text-gray-500  hover:text-red-500' aria-hidden='true' onClick={removeItem} />
                                    <span className='px-2 w-9 font-bold text-center'>{item.quantity}</span>
                                    <PlusIcon className='h-6 w-6 cursor-pointer bg-gray-100 text-gray-500  hover:text-emerald-500' aria-hidden='true' onClick={addItem} />
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
