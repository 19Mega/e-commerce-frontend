import React, { Fragment, useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'

import { ProductContext } from '../context/ProductContext'
import { UserContext } from '../context/UserContext'

import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, Squares2X2Icon } from '@heroicons/react/20/solid'

import ProductCard from '../components/products/ProductCard'

const sortOptions = [
    { name: 'Most Popular', current: true },
    { name: 'Lowest Price', current: false },
    { name: 'Highest Price', current: false }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const checkBox = [

    {
        id: 1,
        name: 'Categories',
        options: [
            { id: '1', name: 'subcategory', value: 'Motherboards', description: 'Motherboards' },
            { id: '2', name: 'subcategory', value: 'Graphics Cards', description: 'Graphics Cards' },
            { id: '3', name: 'subcategory', value: 'Keyboards', description: 'Keyboards' },
            { id: '4', name: 'subcategory', value: 'Mouses', description: 'Mouses' },
        ]
    },
    {
        id: 3,
        name: 'Discounts',
        options: [
            { id: '1', name: 'discount', value: 5, description: 'Up to 5% off' },
            { id: '2', name: 'discount', value: 10, description: 'Up to 10% off' },
            { id: '3', name: 'discount', value: 15, description: 'Up to 15% off' },
            { id: '4', name: 'discount', value: 20, description: 'Up to 20% off' },
        ]
    },
    {
        id: 4,
        name: 'Price Range',
        options: [
            { id: '1', name: 'price', value: [0, 250], description: 'From 0 to 250 USD' },
            { id: '2', name: 'price', value: [251, 500], description: 'From 251 to 500 USD' },
            { id: '3', name: 'price', value: [501, 1000], description: 'From 501 to 1000 USD' },
            { id: '4', name: 'price', value: [1001, 999999], description: 'Over 1000 USD' },
        ]
    }
]

export default function Products({ initialFilter }) {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    const { usuario } = useContext(UserContext)
    const { userStore, userAction } = usuario

    const { product } = useContext(ProductContext)
    const { productStore, productAction } = product

    const [products, setProducts] = useState([])
    const [filter, setFilter] = useState({})
    const [sortedProducts, setSortedProducts] = useState([])

    const location = useLocation()

    useEffect(() => {
        const newFilter = initialFilter || (location.state && location.state.filter) || {}
        setFilter(newFilter)
    }, [initialFilter, location])

    const handleFilter = (e, category, value) => {
        setFilter(prevFilter => {
            if (e.target.checked) {
                return { ...prevFilter, [category]: value }
            } else {
                const newFilter = { ...prevFilter }
                delete newFilter[category]
                return newFilter
            }
        })
    }

    const getProducts = async () => {
        const fetchedProducts = await productAction.getProduct(filter)
        const favorites = JSON.parse(localStorage.getItem('userFavorites')) || []
        const updatedProducts = fetchedProducts.map(product => ({
            ...product,
            favorite: favorites.includes(product.id)
        }))
        setProducts(updatedProducts)
        setSortedProducts([])
    }

    useEffect(() => {
        getProducts()
    }, [filter])

    const sortByPriceDescending = () => {
        const sorted = [...products].sort((a, b) => b.price - a.price)
        setSortedProducts(sorted)
    }

    const sortByPriceAscending = () => {
        const sorted = [...products].sort((a, b) => a.price - b.price)
        setSortedProducts(sorted)
    }

    return (
        <div className='bg-white'>

            <div className="flex items-center justify-center py-2 my-2 bg-gray-700">
                <h1 className="gradient-text md:text-5xl md:p-2">eTec-NaN-Logic</h1>
            </div>
            <div className="flex items-center justify-center bg-gray-300">
                <h2 className="font-bold tracking-[0.15em]">Your Best Choice For Gaming</h2>
            </div>
            <div>
                {/* Mobile filter dialog */}
                <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as='div' className='relative z-40 lg:hidden' onClose={setMobileFiltersOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter='transition-opacity ease-linear duration-300'
                            enterFrom='opacity-0'
                            enterTo='opacity-100'
                            leave='transition-opacity ease-linear duration-300'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                        >
                            <div className='fixed inset-0 bg-black bg-opacity-25' />
                        </Transition.Child>

                        <div className='fixed inset-0 z-40 flex'>
                            <Transition.Child
                                as={Fragment}
                                enter='transition ease-in-out duration-300 transform'
                                enterFrom='translate-x-full'
                                enterTo='translate-x-0'
                                leave='transition ease-in-out duration-300 transform'
                                leaveFrom='translate-x-0'
                                leaveTo='translate-x-full'
                            >
                                <Dialog.Panel className='relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl'>
                                    <div className='flex items-center justify-between px-4'>
                                        <h2 className='text-lg font-medium text-gray-900'>Filters</h2>
                                        <button
                                            type='button'
                                            className='-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400'
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className='sr-only'>Close menu</span>
                                            <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                                        </button>
                                    </div>

                                    {/* Filters Mobile*/}
                                    <form className='mt-4 pt-4 border-t border-gray-200'>
                                        <h3 className='sr-only'>Categories</h3>
                                        <ul>
                                            {checkBox.map(item => (
                                                <li className='mb-3' key={item.id}>
                                                    <span className='font-semibold text-indigo-500 mx-4'>{item.name}</span>
                                                    <ul className="mx-3">
                                                        {item.options.map(option => (
                                                            <li key={option.id}>
                                                                <input
                                                                    type="checkbox"
                                                                    name={option.name}
                                                                    value={option.value}
                                                                    checked={filter[option.name] === option.value}
                                                                    onChange={e => handleFilter(e, option.name, option.value)}
                                                                    className="custom-checkbox ml-6"
                                                                />
                                                                <span className='mx-2 font-medium text-gray-700'>{option.description}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            ))}
                                        </ul>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='flex items-baseline justify-between border-b border-gray-200 pb-4 pt-5'>
                        <h1 className='text-4xl font-bold tracking-tight text-gray-900'></h1>

                        <div className='flex items-center'>
                            {/* Fast filter menu */}
                            <Menu as='div' className='relative inline-block text-left'>
                                <div>
                                    <Menu.Button className='group inline-flex justify-center text-sm font-medium text-indigo-500 hover:text-indigo-700'>
                                        Orden
                                        <ChevronDownIcon
                                            className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                                            aria-hidden='true'
                                        />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter='transition ease-out duration-100'
                                    enterFrom='transform opacity-0 scale-95'
                                    enterTo='transform opacity-100 scale-100'
                                    leave='transition ease-in duration-75'
                                    leaveFrom='transform opacity-100 scale-100'
                                    leaveTo='transform opacity-0 scale-95'
                                >
                                    <Menu.Items className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                        <div className='py-1'>
                                            <Menu.Item key="option1">
                                                {({ active }) => (
                                                    <button
                                                        className={classNames(
                                                            active ? 'bg-indigo-100' : '',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                        onClick={sortByPriceDescending}
                                                    >
                                                        Highest Price
                                                    </button>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item key="option2">
                                                {({ active }) => (
                                                    <button
                                                        className={classNames(
                                                            active ? 'bg-indigo-100' : '',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                        onClick={sortByPriceAscending}
                                                    >
                                                        Lowest Price
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            {/* way to see products, list or boxes (these are the 2 buttons)*/}
                            <button type='button' className='-m-2 ml-5 p-2 text-indigo-500 hover:text-indigo-700 sm:ml-7'>
                                <span className='sr-only'>View grid</span>
                                <Squares2X2Icon className='h-5 w-5' aria-hidden='true' />
                            </button>
                            <button
                                type='button'
                                className='-m-2 ml-4 p-2 text-indigo-500 hover:text-indigo-700 sm:ml-6 lg:hidden'
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className='sr-only'>Filters</span>
                                <FunnelIcon className='h-5 w-5' aria-hidden='true' />
                            </button>
                        </div>
                    </div>

                    {/* Gradient line */}
                    <div className='h-0.5 flex-grow bg-gradient-to-r from-emerald-400 to-indigo-500'> </div>

                    <section aria-labelledby='products-heading' className='pt-4'>
                        <div className='grid grid-cols-1 lg:grid-cols-4'>
                            {/* Filters big screen*/}
                            <form className='hidden lg:block mr-2'>
                                <ul>
                                    {checkBox.map(item => (
                                        <li className='mb-3' key={item.id}>
                                            <span className='font-semibold text-indigo-500'>{item.name}</span>
                                            <ul className="mx-3">
                                                {item.options.map(option => (
                                                    <li key={option.id}>
                                                        <input
                                                            type="checkbox"
                                                            name={option.name}
                                                            value={option.value}
                                                            checked={filter[option.name] === option.value}
                                                            onChange={e => handleFilter(e, option.name, option.value)}
                                                            className="custom-checkbox"
                                                        />
                                                        <span className='mx-1 font-medium text-gray-700'>{option.description}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </form>

                            {/* Product grid - mobile and pc */}
                            <div className='lg:col-span-3 h-full'>
                                <ul>
                                    {(sortedProducts.length > 0 ? sortedProducts : products).map((item) => (
                                        <div key={item.id}>
                                            <ProductCard product={item} />
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}