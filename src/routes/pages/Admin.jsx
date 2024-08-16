import { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { ProductContext } from '../context/ProductContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const EmptyProductCard = (item) => {
  const price = Number(item.price) || 0;
  const discountDecimal = 1 + item.discount / 100;
  const discountPrice = (price * discountDecimal).toFixed(2);

  return (
    <>
      <div className='mb-2'>
        <div className='w-full shadow-sm border-2'>
          <div className='grid grid-cols-3 gap-2 p-2'>
            <div className='col-span-1 md:max-h-48 w-full overflow-hidden rounded-sm bg-gray-50 lg:aspect-none group-hover:opacity-75 lg:80 image-container'>
              <img className='h-screen max-h-36 md:max-h-48 w-full object-scale-down' src={item.image_1} alt='Imagen del producto' />
            </div>
            <div className='col-span-2 w-full h-full bg-white-200 relative flex flex-col justify-between rounded-sm'>
              <div>
                <div className='flex justify-between'>
                </div>
                <span className='pl-2 mr-3 pr-2 md:mr-4 md:pr-2 text-sm md:text-xl block hover:text-indigo-600 cursor-pointer'>{item.short_description}</span>
              </div>
              <div className='mt-2 flex'>
                <span className='pl-2 pb-1 text-gray-500 text-md md:pr-1 md:text-md md:font-medium block'>U$D</span>
                <span className='pl-1 pb-1 text-gray-900 text-xl md:text-2xl block'>{price.toFixed(2)}</span>
                <span className='pl-2 pb-1 text-gray-300 text-xl md:text-2xl block'>/</span>
                <span className='pl-2 pb-1 text-gray-300 text-xl md:text-2xl block line-through'>{discountPrice}</span>
                <span className='pl-2 pb-1 text-red-500 text-xs font-semibold md:text-lg block '>{item.discount}% OFF</span>
              </div>
              <div className='flex justify-end items-end'>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const productFields = [
  { name: 'short_description', label: 'Descripción corta' },
  { name: 'long_description', label: 'Descripción larga' },
  { name: 'category', label: 'Categoría' },
  { name: 'subcategory', label: 'Subcategoría' },
  { name: 'price', label: 'Precio en $', type: 'number' },
  { name: 'discount', label: 'Descuento', type: 'number' },
  { name: 'stock', label: 'Stock', type: 'number' },
  { name: 'characteristic_1_title', label: 'Característica 1' },
  { name: 'characteristic_1_description', label: 'Descripción caract. 1' },
  { name: 'characteristic_2_title', label: 'Característica 2' },
  { name: 'characteristic_2_description', label: 'Descripción caract. 2' },
  { name: 'characteristic_3_title', label: 'Característica 3' },
  { name: 'characteristic_3_description', label: 'Descripción caract. 3' },
  { name: 'characteristic_4_title', label: 'Característica 4' },
  { name: 'characteristic_4_description', label: 'Descripción caract. 4' },
  { name: 'image_1', label: 'URL imagen 1' },
  { name: 'image_2', label: 'URL imagen 2' },
  { name: 'image_3', label: 'URL imagen 3' },
  { name: 'image_4', label: 'URL imagen 4' }
];

export const Admin = () => {

  const { usuario } = useContext(UserContext);
  const { userStore, userAction } = usuario;

  const { product } = useContext(ProductContext);
  const { productStore, productAction } = product
  
  const [productId, setProductId] = useState('');

  const navigate = useNavigate();


  const formikProduct = useFormik({
    initialValues: {
      short_description: '',
      long_description: '',
      category: '',
      subcategory: '',
      price: '',
      discount: '',
      stock: '',
      characteristic_1_title: '',
      characteristic_2_title: '',
      characteristic_3_title: '',
      characteristic_4_title: '',
      characteristic_1_description: '',
      characteristic_2_description: '',
      characteristic_3_description: '',
      characteristic_4_description: '',
      image_1: '',
      image_2: '',
      image_3: '',
      image_4: ''
    },
    validationSchema: Yup.object({
      short_description: Yup.string().max(120, 'Máximo 120 caracteres').required('Requerido'),
      long_description: Yup.string().max(120, 'Máximo 120 caracteres').required('Requerido'),
      category: Yup.string().required('Requerido'),
      subcategory: Yup.string().required('Requerido'),
      price: Yup.number().min(0, 'El precio no puede ser negativo').required('Requerido'),
      discount: Yup.number().optional(),
      stock: Yup.number().required('Requerido'),
      characteristic_1_title: Yup.string().required('Requerido'),
      characteristic_2_title: Yup.string(),
      characteristic_3_title: Yup.string(),
      characteristic_4_title: Yup.string(),
      characteristic_1_description: Yup.string().required('Requerido'),
      characteristic_2_description: Yup.string(),
      characteristic_3_description: Yup.string(),
      characteristic_4_description: Yup.string(),
      image_1: Yup.string().url('URL invalida').required('Requerido'),
      image_2: Yup.string().url('URL invalida'),
      image_3: Yup.string().url('URL invalida'),
      image_4: Yup.string().url('URL invalida')
    }),
    onSubmit: async (values) => {
      try {
        const response = await productAction.postProduct(values)
        if (response.ok) {
          Swal.fire({
            text: 'Producto creado!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          formikProduct.setValues(formikProduct.initialValues);
        } else {
          Swal.fire({
            text: result.msg || 'Error creando producto.',
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo.'
          });
        }
      } catch (error) {
        Swal.fire({
          text: 'Error en la red, intente mas tarde.',
          icon: 'error',
          confirmButtonText: 'Try again'
        });
      }
    },
  });
  
  const fetchProductById = async () => {
    try {
    const response = await productAction.getProductDetail(productId)
    formikProduct.setValues(response);
    if (response.msg) {
      Swal.fire({
        text: 'No se encontro el producto.',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
      formikProduct.setValues(formikProduct.initialValues);
    }
  } catch (error) {
    console.error('Error fetching product:', error);
        Swal.fire({
          text: 'Error en la red, intente más tarde.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
  }

  const updateProductById = async() =>{
    try {
      const response = await productAction.updateProduct(formikProduct.values,productId)
      if (response.status == 200) {
        Swal.fire({
          text: 'Actualizado correctamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      }
    } catch (error) {
      Swal.fire({
        text: 'Error en la red, no se pudo actualizar.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }

  const deleteProductById = async () => {
    try {
      const result = await Swal.fire({
        html: `¿Estás seguro de que deseas eliminar este producto?<br>${formikProduct.values.short_description}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });
      if (result.isConfirmed) {
        const response = await productAction.deleteProduct(productId);
        if (response.status === 200) {
          Swal.fire({
            text: 'Producto eliminado correctamente.',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          formikProduct.setValues(formikProduct.initialValues);
        }
      }
    } catch (error) {
      Swal.fire({
        text: 'Error en la red, no se pudo eliminar.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  };
  
  const admin = async () => {
    const isAdmin = await userAction.verifyAdminToken();
    if (!isAdmin.user_admin) {
      navigate('/home');
    }
  };

  useEffect(() => {
    admin();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 className="my-4 md:py-2 text-center text-3xl md:text-4xl font-thin bg-gradient-to-r from-emerald-400 to-indigo-500 text-white sepia">Administración</h1>
      <div className='mb-2 h-0.5 flex-grow bg-gradient-to-r from-emerald-400 to-indigo-500 sepia'></div>

      <h2 className="text-xl mb-3 text-center text-indigo-500 sepia">Vista previa del producto</h2>
      {EmptyProductCard(formikProduct.values)}
      <div className='mt-4 mb-4 h-0.5 flex-grow bg-gradient-to-r from-emerald-400 to-indigo-500 sepia'></div>

    
      <div className="flex flex-col sm:flex-row items-center space-y-0 sm:space-x-4">
       
      

        <div className="flex flex-col sm:flex-row w-full space-y-1 sm:space-y-0 sm:space-x-4">
        <input
            type="text"
            className="bg-gray-100 border-1 p-2 w-full"
            placeholder='ID del producto'
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />

          <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-normal py-2 px-4 w-full" onClick={fetchProductById}>
            Buscar producto
          </button>

          <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-normal py-2 px-4 w-full" onClick={updateProductById}>
            Actualizar producto
          </button>

          <button className="bg-red-500 hover:bg-red-700 text-white font-normal py-2 px-4 w-full" onClick={deleteProductById}>
            Eliminar producto
          </button>

        </div>
      </div>





      <div className='mt-4 mb-2 h-0.5 flex-grow bg-gradient-to-r from-emerald-400 to-indigo-500 sepia'></div>
      <h2 className="text-xl mb-3 text-center text-indigo-500 sepia">Agregar Producto</h2>



      <form onSubmit={formikProduct.handleSubmit}>
        <div className="space-y-4">
          {productFields.map(({ name, label, type = 'text' }) => (
            <div key={name} className="sm:flex sm:items-center bg-gray-200">
              <label className="block sm:w-1/5 text-gray-700 text-left sm:text-right sm:pr-3">{label}</label>
              <div className="sm:w-4/5 sm:mt-0">
                <input
                  type={type}
                  name={name}
                  onChange={formikProduct.handleChange}
                  onBlur={formikProduct.handleBlur}
                  value={formikProduct.values[name]}
                  className={`w-full p-2 border rounded-sm ${formikProduct.touched[name] || formikProduct.errors[name] ? 'border-red-500 placeholder-red-500' : 'border-gray-300'}`}
                />
                {formikProduct.touched[name] && formikProduct.errors[name] ? (
                  <div className="text-red-500 text-xs ml-2 absolute">
                    {formikProduct.errors[name]}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 mb-12 justify-center">
          <button type="submit" className="bg-indigo-500 shadow-lg shadow-indigo-500/50 hover:bg-indigo-700 text-white font-thin py-2 w-full sepia">
            Agregar Producto
          </button>
        </div>
      </form>
      <div className='my-3 h-0.5 flex-grow bg-gradient-to-r from-emerald-400 to-indigo-500 sepia'></div>
    </div>
  );
};
