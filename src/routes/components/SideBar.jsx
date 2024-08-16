import React , { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SideBar () {

  const [activeMenuItem, setActiveMenuItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveMenuItem(item);
  };

  return (
    <div className="bg-[#373441] fixed top-0 left-0 w-28 h-full">
      <h1 className='text-white text-center font-bold my-5'>LOGO</h1>

      <ul className='text-center text-white'>
        <li
          className={`hover:bg-red-700 ${activeMenuItem === 'home' ? 'bg-red-700' : ''}`}
          onClick={() => handleItemClick('home')}
        >
          <Link to="#">Home</Link>
        </li>

        <li
          className={`hover:bg-red-700 ${activeMenuItem === 'testjuan' ? 'bg-red-700' : ''}`}
          onClick={() => handleItemClick('testjuan')}
        >
          <Link to="#">Test Juan</Link>
        </li>

        <li
          className={`hover:bg-red-700 ${activeMenuItem === 'login' ? 'bg-red-700' : ''}`}
          onClick={() => handleItemClick('login')}
        >
          <Link to="/login">Login</Link>
        </li>

        <li
          className={`hover:bg-red-700 ${activeMenuItem === 'signup' ? 'bg-red-700' : ''}`}
          onClick={() => handleItemClick('signup')}
        >
          <Link to="/signup">Signup</Link>
        </li>

      


      </ul>
    </div>
  );
};