import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import HomeProductCard from "../components/products/HomeProductCard"
import HomeBanner from "../components/banners/HomeBanner"
import BannerOffer from "../components/banners/BannerOffer"
import ProductCategory from "../components/products/ProductCategory"
import { Link } from "react-router-dom"

const products = [
  {
    id: 1,
    href: '#',
    imageSrc: 'https://storage.googleapis.com/pai-images/e35acd6678144fe3832f34e1ea86484e.jpeg',
    imageAlt: "e-commerce photo",
  },
  {
    id: 2,
    href: '#',
    imageSrc: 'https://storage.googleapis.com/pai-images/6605f53c83e449a09c589b039692a91b.jpeg',
    imageAlt: "e-commerce photo",
  },
  {
    id: 3,
    href: '#',
    imageSrc: 'https://storage.googleapis.com/pai-images/5a544728396f454d85e6f8e141f585e1.jpeg',
    imageAlt: "e-commerce photo",
  },
  {
    id: 4,
    href: '#',
    imageSrc: 'https://storage.googleapis.com/pai-images/a38d37408dfc4bc19309fc0493ddf937.jpeg',
    imageAlt: "e-commerce photo",
  },
  {
    id: 5,
    href: '#',
    imageSrc: 'https://storage.googleapis.com/pai-images/d63694c2d21145b0bbdc3dd5d1b5755e.jpeg',
    imageAlt: "e-commerce photo",
  },
  {
    id: 6,
    href: '#',
    imageSrc: 'https://storage.googleapis.com/pai-images/2604330b48914e60bf7c13061d60d6af.jpeg',
    imageAlt: "e-commerce photo",
  },
  {
    id: 7,
    href: '#',
    imageSrc: 'https://storage.googleapis.com/pai-images/8aa24183aec64d3f940a699e5e6022d3.jpeg',
    imageAlt: "e-commerce photo",
  },
  {
    id: 8,
    href: '#',
    imageSrc: 'https://storage.googleapis.com/pai-images/4972e9b2dafc41fcae26f2a2135399b6.jpeg',
    imageAlt: "e-commerce photo",
  },
  // More products...
]

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

  // More products...
]

const myBanner = {
  id: 1,
  href: '',
  imageSrc: 'https://http2.mlstatic.com/D_NQ_795146-MLA74234784944_022024-OO.jpg',
  imageAlt: "e-commerce photo",
}

const myBanner2 = {
  id: 2,
  href: '#',
  imageSrc: 'https://http2.mlstatic.com/D_NQ_686292-MLA73220560926_122023-OO.webp',
  imageAlt: "e-commerce photo",
}

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

  // El UserContext nos provee de la info de usuario
  const { usuario } = useContext( UserContext );
  const { userStore, userAction } = usuario;

 
  return (
    <>
      <HomeBanner {...myBanner} />

      <div className="flex justify-center">
        <Link to='/products' className="flex">
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
        </Link> 

      </div>


      {/* <ProductCategory callouts={callouts} /> */}

      <HomeProductCard products={products} />
      <HomeBanner {...myBanner2} />

      {/* <BannerOffer/> */}

      <HomeProductCard products={products2} />

      {/* <TailwindButton/> */}


    </>
  )
}
