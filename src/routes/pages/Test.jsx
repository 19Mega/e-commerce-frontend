import { useNavigate } from 'react-router-dom';

const checkBox = [
    {
        id: 1,
        name: 'Categories',
        options: [
            { id: '1', name: 'category', value: 'Electronics', description: 'All' },
        ]
    },
    {
        id: 2,
        name: 'Subcategories',
        options: [
            { id: '1', name: 'subcategory', value: 'Graphics Cards', description: 'Graphics Cards' },
            { id: '2', name: 'subcategory', value: 'Processors', description: 'Processors' },
            { id: '3', name: 'subcategory', value: 'Keyboards', description: 'Keyboards' },
        ]
    },
    {
        id: 3,
        name: 'Discounts',
        options: [
            { id: '1', name: 'discount', value: 5, description: 'Up to 5% off' },
            { id: '2', name: 'discount', value: 10, description: 'Up to 10% off' },
            { id: '3', name: 'discount', value: 15, description: 'Up to 15% off' },
            { id: '4', name: 'discount', value: 20, description: 'Up to 20% off' },
        ]
    },
    {
        id: 4,
        name: 'Price Range',
        options: [
            { id: '1', name: 'price', value: [0, 250], description: 'From 0 to 250 USD' },
            { id: '2', name: 'price', value: [251, 500], description: 'From 251 to 500 USD' },
            { id: '3', name: 'price', value: [501, 1000], description: 'From 501 to 1000 USD' },
            { id: '4', name: 'price', value: [1001, 999999], description: 'Over 1000 USD' },
        ]
    }
];

export default function Test() {
    const navigate = useNavigate();

    const goToFilteredProducts = (filterName, filterValue) => {
        navigate('/products', { state: { filter: { [filterName]: filterValue } } });
    };

    return (
        <div>
            <h2>Filter Buttons</h2>
            {checkBox.map((category) => (
                <div key={category.id}>
                    <h3>{category.name}</h3>
                    {category.options.map((option) => (
                        <button 
                            key={option.id} 
                            onClick={() => goToFilteredProducts(option.name, option.value)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1"
                        >
                            {option.description}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}