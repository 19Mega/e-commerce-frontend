
import { HomeIcon } from '@heroicons/react/24/outline'

import { Fragment, useEffect, useRef, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../context/UserContext';

import Swal from 'sweetalert2'


export default function UserProfile() {

  const { usuario } = useContext(UserContext);
  const { userStore, userAction } = usuario;

  const [userAddresses, setUserAddresses] = useState([])
  const [userData, setUserData] = useState([])

  function handleDelete(id) {
    Swal.fire({
      title: 'Cuidado!',
      text: '¿Estás seguro de que deseas eliminar esta dirección?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteAddressResult = await userAction.deleteAddress(id);
        userAction.getAddress();
        if (deleteAddressResult.success) {
          Swal.fire('Eliminado', 'La dirección ha sido eliminada', 'success');
        }
      }
    })
  }

  useEffect(() => {
    setUserAddresses(userStore.address)
    setUserData(userStore.user)
  }, [userStore])

  useEffect(() => { userAction.getAddress() }, [])


  return (
    <div>

      {/* Personal information */}
      <div className="bg-white-100">

        <div className="mx-auto max-w-2xl px-4 pt-12 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8 lg:pt-12 xl:pt-12">

          <div className='flex justify-between'>
            <h2 className="text-lg font-normal tracking-tight text-gray-900">Información personal</h2>
            {/* <button className='bg-emerald-500 text-white text-xs font-medium px-3 rounded-sm hover:bg-indigo-900 '>
              Modificar
            </button> */}
          </div>

          <hr className="mb-3 my-2 border-4 border-emerald-600" />

          <div className='p-3 mt-4 border-2 border-gray-200 rounded-sm'>
            <div className="flex flex-row w-full gap-2 mt-2 sm:mt-0 sm:flex-col sm:items-start">
              <span className="truncate font-medium">Nombre: </span>
              <span className="flex-shrink-0 text-gray-500">{userData.name}</span>
            </div>

            <div className="flex flex-row w-full gap-2 mt-2 sm:mt-0 sm:flex-col sm:items-start">
              <span className="truncate font-medium">Email: </span>
              <span className="flex-shrink-0 text-gray-500">{userData.email}</span>
            </div>

            <div className="flex flex-row w-full gap-2 mt-2 sm:mt-0 sm:flex-col sm:items-start">
              <span className="truncate font-medium">Contraseña: </span>
              <span className="flex-shrink-0 text-gray-500">*********</span>
            </div>
          </div>

        </div>
      </div>

      {/* Address */}
      <div className="bg-white-100">
        <div className="mx-auto max-w-2xl px-4 pt-14 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:pt-3">

          <div className='flex justify-between'>
            <h2 className="text-lg font-normal tracking-tight text-gray-900">Direcciones de envío</h2>
            <Link to='/address' className='bg-emerald-500 text-white text-xs font-medium px-3 rounded-sm hover:bg-indigo-700 flex items-center justify-center'>
              Agregar dirección
            </Link>
          </div>

          <hr className="mb-3 my-2 border-4 border-emerald-600" />
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">

            {userAddresses.map((userAddress) => (

              <div key={userAddress.id} className="group relative p-3 border-2 border-gray-200 rounded-sm ">
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <HomeIcon className="h-5 w-5 flex-shrink-0 text-emerald-600" aria-hidden="true" />
                    <p className="ms-2 truncate font-medium">Dirección {userAddress.id}</p>
                  </div>

                  <div className="sm:mt-0">

                    <Link
                      to={`/address/${userAddress.id}`}
                      className="text-xs text-gray-400 hover:text-indigo-400 cursor-pointer"
                    >
                      Modificar
                    </Link>

                    <span className='mx-1'></span>
                    <Link className="text-xs text-gray-400 hover:text-red-400 cursor-pointer" onClick={() => handleDelete(userAddress.id)}>
                      Eliminar
                    </Link>
                  </div>
                </div>

                
                <div className='mb-3 mt-1 border-1'></div>

                <div className="flex flex-row w-full gap-2 mt-2 sm:mt-0 sm:flex-col sm:items-start ">
                  <span className="truncate font-medium">Nombre: </span>
                  <span className="flex-shrink-0 text-gray-400">{userAddress.name_surname}</span>
                </div>

                <div className="flex flex-row w-full gap-2 mt-2 sm:mt-0 sm:flex-col sm:items-start ">
                  <span className="truncate font-medium">Teléfono: </span>
                  <span className="flex-shrink-0 text-gray-400">{userAddress.phone}</span>
                </div>

                <div className="flex flex-row w-full gap-2 mt-2 sm:mt-0 sm:flex-col sm:items-start ">
                  <span className="truncate font-medium">Departamento: </span>
                  <span className="flex-shrink-0 text-gray-400">{userAddress.department}</span>
                </div>

                <div className="flex flex-row w-full gap-2 mt-2 sm:mt-0 sm:flex-col sm:items-start">
                  <span className="truncate font-medium">Ciudad: </span>
                  <span className="flex-shrink-0 text-gray-400">{userAddress.city}</span>
                </div>

                <div className="flex flex-row w-full gap-2 mt-2 sm:mt-0 sm:flex-col sm:items-start">
                  <span className="truncate font-medium">Dirección: </span>
                  <span className="flex-shrink-0 text-gray-400">{userAddress.street} {userAddress.street_number} {userAddress.no_number ? '(Sin número)' : ''}</span>
                </div>

                <div className="flex-warp w-full gap-2 mt-2 sm:mt-0 sm:flex-col sm:items-start">
                  <span className="truncate font-medium">Referencias: </span>
                  <span className="ms-1 flex-shrink-0 text-gray-400">{userAddress.references}</span>
                </div>


              </div>
            ))}

          </div>
        </div>
      </div>


    </div>
  )
}
