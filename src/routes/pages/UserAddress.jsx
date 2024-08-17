import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Swal from 'sweetalert2'

export default function UserAddress() {
  const params = useParams();
  const navigate = useNavigate();

  const { usuario } = useContext(UserContext);
  const { userStore, userAction } = usuario;

  const [modifyAddress, setModifyAddress] = useState()

  const formik = useFormik({
    initialValues: {
      id: undefined,
      name_surname: '',
      phone: '',
      department: '',
      city: '',
      street: '',
      street_number: '',
      no_number: false,
      references: '',
    },
    validationSchema: Yup.object({
      name_surname: Yup.string().required('Required field'),
      phone: Yup.number().required('Required field').typeError('Must be a number'),
      department: Yup.string().notOneOf(['--Select--'], 'Select a valid department').required('Required field'),
      city: Yup.string().required('Required field'),
      street: Yup.string().required('Required field'),
      street_number: Yup.number().required('Required field').typeError('Must be a number'),
      // no_number
      // references
    }),


    onSubmit: async (values) => {

      if (params.id) {
        // modify address
        const modifyAddressResult = await userAction.modifyAddress(values);

        if (modifyAddressResult.success) {
          Swal.fire({
            title: 'Address modified successfully!',
            icon: 'success',
            timer: 2000,
          });
          navigate('/profile');
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'You need to be logged in to modify an address',
            icon: 'error',
            timer: 2000,
          });
          navigate('/login');
          //setError(addAddressResult.error);
        }

      } else {
        // add address
        const addAddressResult = await userAction.addAddress(values);
        if (addAddressResult.success) {
          Swal.fire({
            title: 'Address added successfully!',
            icon: 'success',
            timer: 2000,
          });
          navigate('/profile');
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'You need to be logged in to add an address',
            icon: 'error',
            timer: 3000,
          });
          navigate('/login');
          //setError(addAddressResult.error);
        }
      }

    }


  })

  const menuColor = "#FD5812";

  useEffect(() => {
    if (params.id) {
      setModifyAddress(userStore.address.find(address => String(address.id) === (params.id)))
    }
  }, [params]);

  useEffect(() => {
    if (modifyAddress) {
      formik.setValues({
        id: modifyAddress.id,
        name_surname: modifyAddress.name_surname,
        phone: modifyAddress.phone,
        department: modifyAddress.department,
        city: modifyAddress.city,
        street: modifyAddress.street,
        street_number: modifyAddress.street_number,
        no_number: modifyAddress.no_number,
        references: modifyAddress.references,
      });
    } else {
      formik.setValues({
        id: undefined,
        name_surname: '',
        phone: '',
        department: '',
        city: '',
        street: '',
        street_number: '',
        no_number: false,
        references: '',
      });
    }
  }, [modifyAddress])

  return (
    <div className="bg-grey-600">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-6">
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-12">
            <div className="">
              <h2 className="text-lg font-semibold leading-7 text-gray-900">Shipping Address</h2>
              <p className="mt-1  text-m  leading-normal text-gray-600 lg:mt-2 xl:mt-3">Add the address details and the person who will receive the shipment.</p>

              <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                <div className="sm:col-span-2">
                  <label htmlFor="name_surname" className="block text-sm font-medium leading-3 text-gray-900">
                    First and Last Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="name_surname"
                      name="name_surname"
                      id="name_surname"
                      autoComplete="name"
                      className="block w-full ps-2 rounded-sm border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-100 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-3"
                      onChange={formik.handleChange}
                      value={formik.values.name_surname}
                    />
                    {formik.touched.name_surname && formik.errors.name_surname ? (
                      <div style={{ color: menuColor }}>{formik.errors.name_surname}</div>
                    ) : null}
                  </div>
                </div>

                <div className="hidden sm:col-span-1 sm:block"></div>
                <div className="hidden sm:col-span-1 sm:block"></div>
                <div className="hidden sm:col-span-1 sm:block"></div>
                <div className="hidden sm:col-span-1 sm:block"></div>


                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium leading-3 text-gray-900">
                    Contact Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      placeholder='099 123 456'
                      className="block w-full ps-2 rounded-sm border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-100 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-3"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                      <div style={{ color: menuColor }}>{formik.errors.phone}</div>
                    ) : null}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="department" className="block text-sm font-medium leading-3 text-gray-900">
                    State
                  </label>
                  <div className="mt-2">
                    <select
                      id="department"
                      name="department"
                      autoComplete=""
                      className="block w-full ps-2 rounded-sm border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-100 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-3"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.department}
                    >
                      <option>--Seleccione--</option>
                      <option>Artigas</option>
                      <option>Canelones</option>
                      <option>Cerro Largo</option>
                      <option>Colonia</option>
                      <option>Durazno</option>
                      <option>Flores</option>
                      <option>Florida</option>
                      <option>Lavalleja</option>
                      <option>Maldonado</option>
                      <option>Montevideo</option>
                      <option>Paysandú</option>
                      <option>Río Negro</option>
                      <option>Rivera</option>
                      <option>Rocha</option>
                      <option>Salto</option>
                      <option>San José</option>
                      <option>Soriano</option>
                      <option>Tacuarembó</option>
                      <option>Treinta y Tres</option>
                    </select>
                    {formik.touched.department && formik.errors.department ? (
                      <div style={{ color: menuColor }}>{formik.errors.department}</div>
                    ) : null}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="city" className="block text-sm font-medium leading-3 text-gray-900">
                    Locality
                  </label>
                  <div className="mt-2">
                    <input
                      id="city"
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      className="block w-full ps-2 rounded-sm border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-100 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-3"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.city}
                    />
                    {formik.touched.city && formik.errors.city ? (
                      <div style={{ color: menuColor }}>{formik.errors.city}</div>
                    ) : null}
                  </div>
                </div>

                <div className="sm:col-span-2 xs:col-span-3">
                  <label htmlFor="street-address" className="block text-sm font-medium leading-3 text-gray-900">
                    Street / Avenue
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="street"
                      id="street"
                      autoComplete="street"
                      className="block w-full ps-2 rounded-sm border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-100 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-3"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.street}
                    />
                    {formik.touched.street && formik.errors.street ? (
                      <div style={{ color: menuColor }}>{formik.errors.street}</div>
                    ) : null}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="door-number" className="block text-sm font-medium leading-3 text-gray-900">
                    Door N° / Apt
                  </label>
                  <div className="mt-2 flex items-center">
                    <input
                      type="text"
                      name="street_number"
                      id="street_number"
                      autoComplete="street_number"
                      className="block w-7/12 ps-2 rounded-sm border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-100 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-3"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.street_number}
                    />
                    <input
                      type="checkbox"
                      name="no_number"
                      id="no_number"
                      className="h-4 w-4 text-indigo-600 ml-4 focus:ring-indigo-500 border-gray-300 rounded"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.no_number}
                    />
                    <label htmlFor="no-number" className="ml-2 block text-sm font-medium leading-3 text-gray-900">
                      No Number
                    </label>


                  </div>
                  {formik.touched.street_number && formik.errors.street_number ? (
                    <div style={{ color: menuColor }}>{formik.errors.street_number}</div>
                  ) : null}
                </div>


                <div className="col-span-full">
                  <label htmlFor="references" className="flex text-sm font-medium text-gray-900">
                    Home references
                    <p className=" ml-2 text-sm text-gray-400" >(opcional)</p>
                  </label>

                  <div className="mt-2">
                    <textarea
                      id="references"
                      name="references"
                      rows={3}
                      className="block w-full ps-2 rounded-sm border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-100 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.references}
                    />
                    {formik.touched.references && formik.errors.references ? (
                      <div style={{ color: menuColor }}>{formik.errors.references}</div>
                    ) : null}
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link to='/profile' type="button" className="text-sm font-semibold leading-3 text-gray-900">
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-sm bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
