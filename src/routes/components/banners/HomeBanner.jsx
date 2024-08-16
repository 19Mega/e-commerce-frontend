import React from 'react'

export default function HomeBanner({ bannerImage }) {
  return (
    <div className="h-20 mt-2 md:h-40 md:w-full md:mt-0 lg:w-full xl:w-full flex flex-col justify-center items-center bg-gradient-to-r from-emerald-500 to-indigo-500 text-white">
      {bannerImage && <img src={bannerImage.imageSrc} alt="" />}
      <p className='text-3xl font-thin md:font-thin md:text-6xl'>Banner Publicitario</p>
    </div>
  )
}
