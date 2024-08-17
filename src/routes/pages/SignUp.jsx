import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Swal from 'sweetalert2'

export const SignUp = () => {

  const navigate = useNavigate();

  const { usuario } = useContext(UserContext);
  const { userAction } = usuario;

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      repeatpassword: '',
    },

    validationSchema: Yup.object({
      name: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
      email: Yup.string().email('Invalid email address.').required('Required').matches(/.*\.com$/, 'Email must end in .com'),
      password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
      repeatpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
    }),

    onSubmit: async (values) => {
      const signUpResult = await userAction.signup(values.name, values.email, values.password);
      if (signUpResult.success) {
        Swal.fire({
          title: 'Ready! now you can log in with your account',
          icon: 'success',
          timer: 2000,
        })
        navigate('/login');

      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Your email is already in use!',
          icon: 'error',
          confirmButtonText: 'Try again'
        })
      }
    },
  });


  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="my-4 md:py-2 text-center text-3xl md:text-4xl font-normal bg-gradient-to-r from-emerald-400 to-indigo-500 text-white">Registration</h1>

        <div className='pt-10 pb-10 px-4 sm:px-6 lg:px-44 shadow-sm border-2 flex justify-center items-center'>
          <form onSubmit={formik.handleSubmit} className="w-full max-w-md">
            <div className="">
              <label htmlFor="name" className="block text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full border-2 border-indigo-600 p-2"
                id="name"
                placeholder=""
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className='text-red-600 text-sm'>{formik.errors.name}</div>
              ) : null}
            </div>

            <div className="mt-4">
              <label htmlFor="email" className="block text-sm">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full border-2 border-indigo-600 p-2"
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
                className="w-full border-2 border-indigo-600 p-2"
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

            <div className="mt-4">
              <label htmlFor="repeatpassword" className="block text-sm">
                Repeat Password
              </label>
              <input
                type="password"
                name="repeatpassword"
                className="w-full border-2 border-indigo-600 p-2"
                id="repeatpassword"
                placeholder=""
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.repeatpassword}
              />
              {formik.touched.repeatpassword && formik.errors.repeatpassword ? (
                <div className='text-red-600 text-sm'>{formik.errors.repeatpassword}</div>
              ) : null}
            </div>

            <button
              className="mt-12 w-full py-2 md:p-1 text-white bg-emerald-500 hover:bg-indigo-700 focus:outline-none font-medium"
              type="submit"
            >
              Singup
            </button>

            <Link to="/login" className="text-sm align-bottom mt-4 block text-center">
            Already have an account? <span className='font-semibold hover:text-indigo-700'>Log in here</span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};
