import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}


export default function Test() {

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const debouncedQuery = useDebounce(query, 100);


  const search = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/search?q=${debouncedQuery}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const data = await response.json();
        if (response.ok) {
          setResults(data)
        }
        else {
          setResults([])
        }

      } catch (error) {
        setResults([])
      }
   
  }

  useEffect(() => {
 
    search()
  

  }, [debouncedQuery])


  return (
    <>
<div className="w-80">
      <div className="flex items-center border-2">
        <input
          type="text"
          className="p-1 px-2 text-indigo-700 text-md font-medium flex-grow"
          placeholder="Buscar productos, marcas y más..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="border-l-2 p-1.5">
        <MagnifyingGlassIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
        </div>
      </div>
      {results.length > 0 && (
        <ul className="">
          {results.map((product) => (
            <li key={product.id} className="bg-gray-100 border-1 mb-0.5 flex items-center p-2">
              <img src={product.image_1} alt={product.short_description} className="bg-gray-300 w-12 h-12 mr-2" />
              <span>{product.short_description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>



    </>
  );
}
