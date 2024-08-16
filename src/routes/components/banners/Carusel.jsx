import React from 'react';

const Carousel = () => {
  const carouselItems = [
    'https://f.fcdn.app/imgs/31dc46/www.zonatecno.com.uy/zoteuy/4975/original/catalogo/103188_103188_1/2000-2000/notebook-asus-vivobook-16-x1605za-mb013w-i7-1255u-512gb-16gb-notebook-asus-vivobook-16-x1605za-mb013w-i7-1255u-512gb-16gb.jpg',
    'https://f.fcdn.app/imgs/7ca476/universobinario.com/ubinuy/7752/original/catalogo/NOT2510-001_1/2000-2000/notebook-asus-core-i5-4-5ghz-8gb-512gb-ssd-16-wuxga-rtx-2050-4gb-001.jpg',
    'https://f.fcdn.app/imgs/1e8a0c/universobinario.com/ubinuy/15c6/original/catalogo/E1504GANJ008W-001_1/2000-2000/notebook-asus-vivobook-go-15-e1504ga-nj008w-mil-std-810h-15-6-led-anti-reflejo-60hz-intel-core-001.jpg',
  ];

  return (
    <div id="indicators-carousel" className="relative w-full" data-carousel="static">
      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className={`hidden duration-700 ease-in-out ${index === 0 ? 'active' : ''}`}
            data-carousel-item={index === 0 ? 'active' : ''}
          >
            <img
              src={item}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${index === 0 ? 'active' : ''}`}
            aria-current={index === 0}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
          ></button>
        ))}
      </div>
      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
