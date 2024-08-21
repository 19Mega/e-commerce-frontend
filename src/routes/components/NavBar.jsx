import { Fragment, useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { CartContext } from '../context/CartContext'

import { useNavigate, Link } from 'react-router-dom'

import { Dialog, Popover, Tab, Transition, Menu } from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { DateTime } from 'luxon'
import SearchBar from './SearchBar'

const navigation = {

  categories: [
    {
      id: 'Categorias',
      name: 'Categorias',
      featured: [

      ],
      sections: [
        {
          id: '',
          name: '',
          items: [
            { name: 'a1', href: '#' },
            { name: 'b2', href: '#' },
            { name: 'b3', href: '#' },
            { name: 'b4', href: '#' },
            { name: 'b5', href: '#' },
            { name: 'b6', href: '#' },
          ],
        },

      ],
    },
  ],
  pages: [
    // { name: 'Company', href: '#' },
    // { name: 'Stores', href: '#' },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

  const { cart, clearCart, getTotalQuantity } = useContext(CartContext)

  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const { usuario } = useContext(UserContext)
  const { userStore, userAction } = usuario

  const handleLogout = async () => {

    if (localStorage.getItem('userName')) {
      clearCart()
    }

    userAction.logout()
    navigate('/login')
  }


  useEffect(() => {
    try {
      if (localStorage.getItem('regTime')) {
        const registerTime = new Date(localStorage.getItem('regTime'))
        const actualTime = new Date(DateTime.now().toISO())

        // console.log('registerTime: ', registerTime)
        // console.log('actualTime: ', actualTime)

        const timeDifference = ((actualTime - registerTime) / 1000 / 60 / 60)

        if (timeDifference > 24) {
          userAction.logout()
        }

      }
    } catch (error) {
      console.error(error)
    }
  }, [])



  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    {/* <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List> */}
                  </div>
                  <Tab.Panels as={Fragment}>
                    {/* {navigation.categories.map((category) => (
                      <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group relative text-sm">
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                              </div>
                              <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))} */}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>


                {/* Mobile menu */}
                {/* <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <Link to="/login" className="-m-2 block p-2 font-medium text-gray-900">
                      IngresarR
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link to="/signup" className="-m-2 block p-2 font-medium text-gray-900">
                      Crear usuario
                    </Link>
                  </div>
                </div> */}


                <div className="bg-gray-100 space-y-6 py-2">
                  {!localStorage.getItem('userName') && (
                    <>
                      <div className="flow-root">
                        <Link to="/login" className="ml-2 block p-2 font-medium text-gray-900 hover:bg-indigo-700 hover:text-white">
                          Login
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link to="/signup" className="ml-2 block p-2 font-medium text-gray-900 hover:bg-indigo-700 hover:text-white">
                          Signup
                        </Link>
                      </div>
                    </>
                  )}

                </div>


              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                {/* <a href="#">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a> */}
                <Link to='/' className='transition transform hover:scale-105'>
                  <span className='p-1 px-2 gradient-text shadow-sm border-2 text-sm md:text-lg font-medium'>eTec-NaN-Logic</span>
                </Link>


              </div>

              {/* SEARCH BAR  */}
              <div className="hidden lg:block flex-1">
                <div className="flex justify-center">
                  <SearchBar />
                </div>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {/* {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                            <span className="absolute inset-0 z-10" aria-hidden="true" />
                                            {item.name}
                                          </a>
                                          <p aria-hidden="true" className="mt-1">
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex">
                                                <a href={item.href} className="hover:text-gray-800">
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))} */}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                {!localStorage.getItem('userName') && (
                  <>
                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                      <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
                        Login
                      </Link>
                      <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                      <Link to="/signup" className="text-sm font-medium text-gray-700 hover:text-indigo-600">
                        Signup
                      </Link>
                    </div>
                  </>
                )}

                {/* Search */}
                {/* <div className="flex lg:ml-6">
                    <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                    </a>
                  </div> */}

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6 lg:mr-2">
                  <Link to="/shoppingcart" className="group flex p-2">
                    <ShoppingCartIcon
                      className="h-7 w-7 text-emerald-500 group-hover:text-indigo-500"
                      aria-hidden="true"
                    />

                    {
                      localStorage.getItem('userCart') ? (
                        <span className="ml-1 text-md font-medium text-indigo-700 group-hover:text-indigo-700">
                          {getTotalQuantity()}
                        </span>
                      ) : <span className="ml-1 text-md font-medium text-indigo-700 group-hover:text-indigo-700">0</span>
                    }
                    {/* <span className="ml-1 text-md font-medium text-gray-500 group-hover:text-gray-600">0</span> */}
                  </Link>
                </div>

              </div>

              {/* Profile dropdown */}
              {localStorage.getItem('userName') && (
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-500">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {/* <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    /> */}
                      <span className='h-8 w-8 rounded-full gradient-text shadow-sm border-2 text-lg font-medium'>{localStorage.getItem('userName')[0]}</span>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-sm bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Profile
                          </Link>
                        )}
                      </Menu.Item>
                      {/* <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/address"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Direcciones
                          </Link>
                        )}
                      </Menu.Item> */}
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/favorite"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Favorites
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/shoppingcart"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Shopping Cart
                          </Link>
                        )}
                      </Menu.Item>

                      {userStore.admin.isAdmin &&
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/admin"
                              className={classNames(active ? 'bg-red-100' : '', 'block px-4 py-2 text-sm font-semibold text-red-600')}
                            >
                              Manage Products
                            </Link>
                          )}
                        </Menu.Item>
                      }
                      {userStore.admin.isAdmin &&
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/admin-advertising"
                              className={classNames(active ? 'bg-red-100' : '', 'block px-4 py-2 text-sm font-semibold text-red-600')}
                            >
                              Manage Advertising
                            </Link>
                          )}
                        </Menu.Item>
                      }

                      <Menu.Item>
                        {({ active }) => (
                          <span
                            to="/"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                            )}
                            onClick={() => handleLogout()}
                          >
                            Sign out
                          </span>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              )}
            </div>

          </div>


          <div className="block lg:hidden mt-2">
            <div className="flex justify-center">
              <SearchBar />
            </div>
          </div>



        </nav>
      </header>
    </div>
  )
}