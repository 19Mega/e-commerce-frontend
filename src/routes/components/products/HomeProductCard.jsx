import { useNavigate } from "react-router-dom";

export default function HomeProductCard({ products }) {
  const navigate = useNavigate();
  
  const handleProductDetail = (id) => {
    navigate(`/productdetail/${id}`);
  };


  return (
    <div className="bg-grey-600">
      <div className="mx-auto max-w-2xl lg:max-w-7xl px-4">
        <div className="grid
                        grid-cols-2
                        gap-y-2
                        gap-x-2
                        sm:grid-cols-2
                        sm:gap-x-6
                        sm:gap-y-6
                        md:grid-cols-2
                        md:gap-x-4
                        md:gap-y-4
                        lg:grid-cols-4
                        lg:gap-y-4
                        lg:gap-x-4
                   ">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative cursor-pointer "
              onClick={() => handleProductDetail(product.id)}
            >
              <div className="w-full h-40 sm:h-60 lg:h-60 overflow-hidden shadow-md rounded-sm">

              <img className='h-screen max-h-36 md:max-h-48 w-full object-scale-down group-hover:hidden' src={product.image_1} alt={product.imageAlt} />
                
                <img
                  src={product.image_2}
                  alt={product.imageAlt}
                  className="h-screen max-h-36 md:max-h-48 w-full object-scale-down hidden group-hover:block"
                />
              </div>

              <div className="flex items-center justify-center bg-gray-700">
                <span className="font-light tracking-[0.15em] text-white ">{product.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
