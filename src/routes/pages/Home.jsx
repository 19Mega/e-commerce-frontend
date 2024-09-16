import HomeProductCard from "../components/products/HomeProductCard";
import HomeProductButtons from "../components/products/HomeProductButtons";
import HomeBanner from "../components/banners/HomeBanner";

const products = [
  {
    id: 1,
    href: "#",
    image_1: "https://m.media-amazon.com/images/I/71RksEbo2YL._AC_SL1500_.jpg",
    image_2: "https://m.media-amazon.com/images/I/719059EmYfL._AC_SL1500_.jpg",
    imageAlt: "e-commerce photo",
    label: "Most Popular",
  },
  {
    id: 11,
    href: "#",
    image_1: "https://m.media-amazon.com/images/I/714snXPDLIL._AC_SL1500_.jpg",
    image_2: "https://m.media-amazon.com/images/I/716nuhJS6fL._AC_SL1500_.jpg",
    imageAlt: "e-commerce photo",
    label: "The Newest",
  },
  {
    id: 3,
    href: "#",
    image_1: "https://m.media-amazon.com/images/I/71K7ndgeZAL._AC_SL1500_.jpg",
    image_2: "https://m.media-amazon.com/images/I/71lt85fNXZL._AC_SL1500_.jpg",
    imageAlt: "e-commerce photo",
    label: "Most Requested",
  },
  {
    id: 31,
    href: "#",
    image_1: "https://m.media-amazon.com/images/I/61334wPK4SL._AC_SL1500_.jpg",
    image_2: "https://m.media-amazon.com/images/I/613RFXcD4HL._AC_SL1500_.jpg",
    imageAlt: "e-commerce photo",
    label: "Best Offer",
  },
  {
    id: 21,
    href: "#",
    image_1: "https://m.media-amazon.com/images/I/7156DLyUsYL._AC_SL1500_.jpg",
    image_2: "https://m.media-amazon.com/images/I/71ovX5jBEeL._AC_SL1500_.jpg",
    imageAlt: "e-commerce photo",
    label: "Top Rated",
  },
  {
    id: 23,
    href: "#",
    image_1: "https://m.media-amazon.com/images/I/819AN0kVmJL._AC_SL1500_.jpg",
    image_2: "https://m.media-amazon.com/images/I/81NRJMNdI-L._AC_SL1500_.jpg",
    imageAlt: "e-commerce photo",
    label: "Why not?",
  },
  {
    id: 15,
    href: "#",
    image_1: "https://m.media-amazon.com/images/I/81gxoVXvMxL._AC_SL1500_.jpg",
    image_2: "https://m.media-amazon.com/images/I/71SpsHdqyfL._AC_SL1500_.jpg",
    imageAlt: "e-commerce photo",
    label: "Limited Edition",
  },
  {
    id: 6,
    href: "#",
    image_1: "https://m.media-amazon.com/images/I/61Ms5a8KocL._AC_SL1500_.jpg",
    image_2: "https://m.media-amazon.com/images/I/71Jr3DJso8L._AC_SL1500_.jpg",
    imageAlt: "e-commerce photo",
    label: "Best Seller",
  },
];

export const Home = () => {
  return (
    <>
      <div className="flex items-center justify-center py-2 my-2 bg-gray-700">
        <h1 className="gradient-text md:text-5xl md:p-2">eTec-NaN-Logic</h1>
      </div>
      <div className="flex items-center justify-center bg-gray-300">
        <h2 className="font-bold tracking-[0.15em]">
          Your Best Choice For Gaming
        </h2>
      </div>

      <HomeBanner />
      <HomeProductButtons />

      <dir className="my-12">
        <HomeProductCard products={products} />
      </dir>

      <HomeBanner />
    </>
  );
};
