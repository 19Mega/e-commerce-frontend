import { useEffect, useState, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

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

export default function SearchBar() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const debouncedQuery = useDebounce(query, 500);
    const resultsRef = useRef(null);

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
                setResults(data);
            } else {
                setResults([]);
            }
        } catch (error) {
            setResults([]);
        }
    };

    const handleProductDetail = (id) => {
        console.log(id);
        navigate(`productdetail/${id}`);
        window.location.reload();
    };

    const handleClickOutside = (event) => {
        if (resultsRef.current && !resultsRef.current.contains(event.target)) {
            setResults([]);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        search();
    }, [debouncedQuery]);

    return (
        <>
            <div className="z-50 w-96 relative shadow-sm" ref={resultsRef}>
                <div className="flex items-center border-2">
                    <input
                        type="text"
                        className="p-1 px-2 text-indigo-700 text-md font-medium flex-grow"
                        placeholder="Search products"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="p-1">
                        <MagnifyingGlassIcon className="h-6 w-6 text-indigo-700 stroke-2" aria-hidden="true" />
                    </div>
                </div>
                {results.length > 0 && (
                    <ul className="absolute top-full left-0 w-full bg-gray-200 z-10 p-1">
                        {results.slice(0, 5).map((product) => (
                            <li key={product.id} className="flex items-center p-2 mb-1 bg-gray-50 hover:bg-indigo-700 hover:text-white cursor-pointer" onClick={() => handleProductDetail(product.id)}>
                                <img src={product.image_1} alt={product.short_description} className="w-12 h-12 mr-2" />
                                <span>{product.short_description}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
