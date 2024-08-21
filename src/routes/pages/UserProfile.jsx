
import { HomeIcon } from '@heroicons/react/24/outline'

import { useEffect, useState, useContext } from 'react';
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
      title: 'Warning!',
      text: 'Are you sure you want to delete this address?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const deleteAddressResult = await userAction.deleteAddress(id);
        userAction.getAddress();
        if (deleteAddressResult.success) {
          Swal.fire('Deleted', 'The address has been deleted', 'success');
        }
      }
    });
  }


  useEffect(() => {
    setUserAddresses(userStore.address)
    setUserData(userStore.user)
  }, [userStore])

  useEffect(() => { userAction.getAddress() }, [])


  return (
    <div>

      <div className="bg-white-100">

        <div className="mx-auto max-w-2xl px-4 pt-12 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8 lg:pt-12 xl:pt-12">

          <div className='flex justify-between'>
            <h2 className="text-lg font-normal tracking-tight text-gray-900">Personal information</h2>
          </div>

          <div className='h-0.5 bg-gradient-to-r from-emerald-400 to-indigo-500 font-semibold text-center my-2 col-span-full'> </div>

          <div className='p-3 mt-4 border-2 border-gray-200 rounded-sm'>
            <div className="flex flex-row w-full gap-2 mt-2 sm:mt-0 sm:flex-col sm:items-start">
              <span className="truncate font-medium">Name: </span>
              <span className="flex-shrink-0 text-gray-500">{userData.name}</span>
            </div>

            <div className="flex flex-row w-full gap-2 mt-2 sm:mt-0 sm:flex-col sm:items-start">
              <span className="truncate font-medium">Email: </span>
              <span className="flex-shrink-0 text-gray-500">{userData.email}</span>
            </div>

            <div className="flex flex-row w-full gap-2 mt-2 sm:mt-0 sm:flex-col sm:items-start">
              <span className="truncate font-medium">Password: </span>
              <span className="flex-shrink-0 text-gray-500">*********</span>
            </div>
          </div>

        </div>
      </div>

      {/* Address */}
      <div className="bg-white-100">
        <div className="mx-auto max-w-2xl px-4 pt-14 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:pt-3">

          <div className='flex justify-between'>
            <h2 className="text-lg font-normal tracking-tight text-gray-900">Shipping Addresses</h2>
            <Link to='/address' className='bg-emerald-500 text-white text-xs font-medium px-3 rounded-sm hover:bg-indigo-700 flex items-center justify-center'>
              Add Address
            </Link>
          </div>

          <div className='h-0.5 bg-gradient-to-r from-emerald-400 to-indigo-500 font-semibold text-center my-2 col-span-full'> </div>
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">

            {userAddresses.map((userAddress) => (

              <div key={userAddress.id} className="group relative p-3 border-2 border-gray-200 rounded-sm ">
                <div className="flex justify-between items-center">
                  <div className="flex">
                    <HomeIcon className="h-5 w-5 flex-shrink-0 text-emerald-600" aria-hidden="true" />
                    <p className="ms-2 truncate font-medium">Address {userAddress.id}</p>
                  </div>

                  <div className="sm:mt-0">

                    <Link
                      to={`/address/${userAddress.id}`}
                      className="text-xs text-gray-400 hover:text-indigo-400 cursor-pointer"
                    >
                      Modifify
                    </Link>

                    <span className='mx-1'></span>
                    <Link className="text-xs text-gray-400 hover:text-red-400 cursor-pointer" onClick={() => handleDelete(userAddress.id)}>
                      Delete
                    </Link>
                  </div>
                </div>


                <div className='mb-3 mt-1 border-1'></div>

                <div className="flex flex-row w-full gap-2 mt-2 sm:mt-0 sm:flex-col sm:items-start ">
                  <span className="truncate font-medium">Name: </span>
                  <span className="flex-shrink-0 text-gray-400">{userAddress.name_surname}</span>
                </div>

                <div className="flex flex-row w-full gap-2 mt-2 sm:mt-0 sm:flex-col sm:items-start ">
                  <span className="truncate font-medium">Phone: </span>
                  <span className="flex-shrink-0 text-gray-400">{userAddress.phone}</span>
                </div>

                <div className="flex flex-row w-full gap-2 mt-2 sm:mt-0 sm:flex-col sm:items-start ">
                  <span className="truncate font-medium">State: </span>
                  <span className="flex-shrink-0 text-gray-400">{userAddress.department}</span>
                </div>

                <div className="flex flex-row w-full gap-2 mt-2 sm:mt-0 sm:flex-col sm:items-start">
                  <span className="truncate font-medium">Locality: </span>
                  <span className="flex-shrink-0 text-gray-400">{userAddress.city}</span>
                </div>

                <div className="flex flex-row w-full gap-2 mt-2 sm:mt-0 sm:flex-col sm:items-start">
                  <span className="truncate font-medium">Address: </span>
                  <span className="flex-shrink-0 text-gray-400">{userAddress.street} {userAddress.street_number} {userAddress.no_number ? '(Sin número)' : ''}</span>
                </div>

                <div className="flex-warp w-full gap-2 mt-2 sm:mt-0 sm:flex-col sm:items-start">
                  <span className="truncate font-medium">References: </span>
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
