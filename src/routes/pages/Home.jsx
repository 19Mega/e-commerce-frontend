import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import HomeProductCard from "../components/products/HomeProductCard"
import HomeProductButtons from "../components/products/HomeProductButtons"
import HomeBanner from "../components/banners/HomeBanner"
import { Link } from "react-router-dom"

const products = [
  {
    id: 1,
    href: '#',
    image_1: 'https://storage.googleapis.com/pai-images/e35acd6678144fe3832f34e1ea86484e.jpeg',
    image_2: 'https://storage.googleapis.com/pai-images/6605f53c83e449a09c589b039692a91b.jpeg',
    imageAlt: "e-commerce photo",
    label: "Most Popular"
  },
  {
    id: 2,
    href: '#',
    image_1: 'https://storage.googleapis.com/pai-images/6605f53c83e449a09c589b039692a91b.jpeg',
    image_2: 'https://storage.googleapis.com/pai-images/e35acd6678144fe3832f34e1ea86484e.jpeg',
    imageAlt: "e-commerce photo",
    label: "The Newest"
  },
  {
    id: 3,
    href: '#',
    image_1: 'https://storage.googleapis.com/pai-images/5a544728396f454d85e6f8e141f585e1.jpeg',
    image_2: 'https://storage.googleapis.com/pai-images/5a544728396f454d85e6f8e141f585e1.jpeg',
    imageAlt: "e-commerce photo",
    label: "Most Requested"
  },
  {
    id: 4,
    href: '#',
    image_1: 'https://storage.googleapis.com/pai-images/a38d37408dfc4bc19309fc0493ddf937.jpeg',
    image_2: 'https://storage.googleapis.com/pai-images/a38d37408dfc4bc19309fc0493ddf937.jpeg',
    imageAlt: "e-commerce photo",
    label: "Best Offer"
  },
  {
    id: 5,
    href: '#',
    image_1: 'https://storage.googleapis.com/pai-images/b074762550804fc1b3fc6015902118c6.jpeg',
    image_2: 'https://storage.googleapis.com/pai-images/b074762550804fc1b3fc6015902118c6.jpeg',
    imageAlt: "e-commerce photo",
    label: "Top Rated"
  },
  {
    id: 6,
    href: '#',
    image_1: 'https://storage.googleapis.com/pai-images/67cfa2bd4ce3483ea2edb816314ed088.jpeg',
    image_2: 'https://storage.googleapis.com/pai-images/67cfa2bd4ce3483ea2edb816314ed088.jpeg',
    imageAlt: "e-commerce photo",
    label: "Editor's Choice"
  },
  {
    id: 7,
    href: '#',
    image_1: 'https://storage.googleapis.com/pai-images/0f9496aacfed4320a964ab5c64fdeb2d.jpeg',
    image_2: 'https://storage.googleapis.com/pai-images/0f9496aacfed4320a964ab5c64fdeb2d.jpeg',
    imageAlt: "e-commerce photo",
    label: "Limited Edition"
  },
  {
    id: 8,
    href: '#',
    image_1: 'https://storage.googleapis.com/pai-images/592b12d56d1846fab8d6b84bc1e7d823.jpeg',
    image_2: 'https://storage.googleapis.com/pai-images/592b12d56d1846fab8d6b84bc1e7d823.jpeg',
    imageAlt: "e-commerce photo",
    label: "Best Seller"
  },
];



const products2 = [
  {
    id: 1,
    href: '#',
    imageSrc: 'https://storage.googleapis.com/pai-images/592b12d56d1846fab8d6b84bc1e7d823.jpeg',
    imageAlt: "e-commerce photo",
  },
  {
    id: 2,
    href: '#',
    imageSrc: 'https://storage.googleapis.com/pai-images/0f9496aacfed4320a964ab5c64fdeb2d.jpeg',
    imageAlt: "e-commerce photo",
  },
  {
    id: 3,
    href: '#',
    imageSrc: 'https://storage.googleapis.com/pai-images/67cfa2bd4ce3483ea2edb816314ed088.jpeg',
    imageAlt: "e-commerce photo",
  },
  {
    id: 4,
    href: '#',
    imageSrc: 'https://storage.googleapis.com/pai-images/b074762550804fc1b3fc6015902118c6.jpeg',
    imageAlt: "e-commerce photo",
  },

]

const callouts = [
  {
    id: 1,
    name: '',
    description: 'CABALLEROS',
    imageSrc: 'https://mensandbeauty.com/wp-content/uploads/2019/07/moda-para-hombre-prendas-calzado-ropa-complementos-accesorios-4.jpg',
    imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '#',
  },
  {
    id: 2,
    name: '',
    description: 'DAMAS',
    imageSrc: 'https://img.freepik.com/foto-gratis/conjunto-ropa-mujer-moda-camisa-jeans-bolso-look-moda-hipster-endecha-plana_169016-3209.jpg?w=2000',
    imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    href: '#',
  },
  {
    id: 3,
    name: '',
    description: 'NIÑOS',
    imageSrc: 'https://www.melodrama.com.ar/modules/ybc_blog/views/img/post/ropa-de-ni%C3%B1o-y-bebe-ordenada-jpg.jpg',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
]


export const Home = () => {

  const { usuario } = useContext(UserContext);
  const { userStore, userAction } = usuario;


  return (
    <>
      <div className="flex items-center justify-center py-2 my-2 bg-gray-700">
        <h1 className="gradient-text md:text-5xl md:p-2">eTec-NaN-Logic</h1>
      </div>
      <div className="flex items-center justify-center bg-gray-300">
        <h2 className="font-bold tracking-[0.15em]">Your Best Choice For Gaming</h2>
      </div>

      <HomeBanner />
      <HomeProductButtons />


      <div className="flex justify-center">
        {/* <Link to='/products' className="flex">
          <span className='mt-4 px-20 py-1 inline-flex align-middle text-indigo-700 shadow-sm border-2 text-lg'>
            Productos
          </span>
        </Link>

        <Link to='/test' className="flex">
          <span className='mt-4 px-4 py-1 ml-5 inline-flex align-middle text-indigo-700 shadow-sm border-2 text-lg'>
            Test
          </span>
        </Link> 

         <Link to='/login' className="flex">
          <span className='mt-4 px-4 py-1 ml-5 inline-flex align-middle text-indigo-700 shadow-sm border-2 text-lg'>
            Login
          </span>
        </Link>  */}
      </div>

      {/* <ProductCategory callouts={callouts} /> */}

      <HomeProductCard products={products} />
      <HomeBanner />

      {/* <BannerOffer/> */}

      {/* <HomeProductCard products={products2} /> */}


    </>
  )
}
