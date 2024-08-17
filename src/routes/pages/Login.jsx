import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Swal from 'sweetalert2';

export const Login = () => {
  const navigate = useNavigate();

  const { usuario } = useContext(UserContext);
  const { userAction } = usuario;

  const { setCart } = useContext(CartContext);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('email invalido').required('Required').matches(/.*\.com$/, 'Debe terminar en .com'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      const loginResult = await userAction.login(values.email, values.password);
      if (loginResult.success) {
        setCart(JSON.parse(localStorage.getItem('userCart'))); // to update cart after login
        Swal.fire({
          title: 'Welcome!',
          icon: 'success',
          timer: 2000,
        });
        navigate('/home');
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Invalid password or email!',
          icon: 'error',
          confirmButtonText: 'Try again'
        });
        setError(loginResult.error);
      }
    },
  });

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="my-4 md:py-2 text-center text-3xl md:text-4xl font-normal bg-gradient-to-r from-emerald-400 to-indigo-500 text-white">Login</h1>

        <div className='pt-10 pb-10 px-4 sm:px-6 lg:px-44 shadow-sm border-2 flex justify-center items-center'>
          <form onSubmit={formik.handleSubmit} className="w-full max-w-md">
            <div className="">
              <label htmlFor="email" className="block text-sm">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full border-2 border-indigo-500 p-2"
                id="email"
                placeholder=""
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className='text-red-600 text-sm'>{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="mt-4">
              <label htmlFor="password" className="block text-sm">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full border-2 border-indigo-500 p-2"
                id="password"
                placeholder=""
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className='text-red-600 text-sm'>{formik.errors.password}</div>
              ) : null}
            </div>

            <button
              className="mt-12 w-full py-2 md:p-1 text-white bg-emerald-500 hover:bg-indigo-700 focus:outline-none font-medium"
              type="submit"
            >
              Login
            </button>

            <Link to="/signup" className="text-sm align-bottom mt-4 block text-center">
              Don't have an account? <span className='font-semibold hover:text-indigo-700'>Sign Up here</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
