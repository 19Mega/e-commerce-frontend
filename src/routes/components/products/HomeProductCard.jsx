import React from 'react';

export default function HomeProductCard({ products }) {
  return (
    <div className="bg-grey-600">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-6">
        <div className="grid
                        grid-cols-2
                        gap-y-2
                        gap-x-2

                        sm:grid-cols-2
                        sm:gap-x-6
                        sm:gap-y-6

                        md:grid-cols-2
                        md:gap-x-6
                        md:gap-y-6

                        lg:grid-cols-4
                        lg:gap-y-4
                        lg:gap-x-4

                   ">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="w-full h-60 overflow-hidden shadow-md rounded-sm p-0.5 border-2 transform transition-transform duration-100 group-hover:scale-105">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};
