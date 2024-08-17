import { useEffect, useState } from 'react';

const Banner = ({ img }) => {
  return (
    <div className="bg-gray-200 flex justify-center items-center lg:h-60 ">
      {img && <img src={img} alt="Banner" className="max-w-full max-h-full" />}
    </div>
  );
};


export const AdminAdvertising = () => {
  const [bannerImage, setBannerImage] = useState('https://http2.mlstatic.com/D_NQ_701207-MLA76958023910_062024-OO.webp')
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null);

  const [position, setPosition] = useState('P1');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/${userId}/banner/add`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_url: imageUrl,
          category: position
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setMessage('Publicidad creada exitosamente');
      setImageUrl('');
      setPosition('P1');
    } catch (error) {
      setMessage(`Error al crear la publicidad: ${error.message}`);
    }
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

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
    <div>

      <div className="my-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="md:py-2 text-center text-3xl md:text-4xl font-thin bg-gradient-to-r from-emerald-400 to-indigo-500 text-white sepia">
          Advertising Administration
        </h1>
        <div className="my-3 h-0.5 flex-grow bg-gradient-to-r from-emerald-400 to-indigo-500 sepia"></div>
      </div>

      <div className="my-2">
        <Banner img={bannerImage} />
      </div>

      <div className='bg-gray-200'>
        <div className="max-w-md mx-auto mt-10 p-6 bg-red-500 rounded-sm shadow-xl sepia">
          <h2 className="text-2xl font-thin mb-6 text-center text-white">Banners on main page</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-thin text-white">Image URL</label>
              <input
                type="text"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-thin text-white">Category</label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full rounded-sm shadow-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-sm shadow-sm text-sm font-thin text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Advertising
            </button>
          </form>
          {message && (
            <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          )}
        </div>


      </div>

      <div className=" mx-auto max-w-2xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 my-4 mx-auto max-w-7xl">
          <div className="border flex justify-center items-center p-12 lg:p-8 text-3xl text-white bg-indigo-700">
            P1
          </div>
          <div className="border flex justify-center items-center p-12 lg:p-8 text-3xl text-white bg-indigo-700">
            P2
          </div>
          <div className="border flex justify-center items-center p-12 lg:p-8 text-3xl text-white bg-indigo-700">
            P3
          </div>
          <div className="border flex justify-center items-center p-12 lg:p-8 text-3xl text-white bg-indigo-700">
            P4
          </div>

          <div className="border flex justify-center items-center p-12 lg:p-8 text-3xl text-white bg-indigo-700">
            P5
          </div>
          <div className="border flex justify-center items-center p-12 lg:p-8 text-3xl text-white bg-indigo-700">
            P6
          </div>
          <div className="border flex justify-center items-center p-12 lg:p-8 text-3xl text-white bg-indigo-700">
            P7
          </div>
          <div className="border flex justify-center items-center p-12 lg:p-8 text-3xl text-white bg-indigo-700">
            P8
          </div>
        </div>
      </div>

      <div>
        <div className="max-w-md mx-auto mt-10 p-6 bg-red-500 rounded-sm shadow-xl sepia">
          <h2 className="text-2xl font-thin mb-6 text-center text-white">Products on main page</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-thin text-white">Image URL</label>
              <input
                type="text"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="position" className="block text-sm font-thin text-white">Position</label>
              <select
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="mt-1 block w-full rounded-sm border-gray-300 shadow-sm"
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={`P${num}`}>P{num}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-sm shadow-sm text-sm font-thin text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Image
            </button>
          </form>
          {message && (
            <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          )}
        </div>
      </div>





    </div>
  );
};
