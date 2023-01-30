import { useState, useEffect } from 'react';
import ImageCarousel from 'components/Global/ImageCarousel';
import { Skeleton } from '@mui/material';

export default function Hero({ template }) {
  const [img, setImg] = useState([]);

  const options = {
    infiniteLoop: true,
    useKeyboardArrows: true,
    showIndicators: false,
    showThumbs: false,
    autoPlay: true,
    showStatus: false,
  };

  useEffect(() => {
    const banner = template[0]?.banner;
    const listImage = [];
    for (let i = 0; i < banner?.length; i++) {
      listImage.push({
        original: process.env.URL_CMS + banner[i]?.image?.formats?.large?.url,
        thumbnail: process.env.URL_CMS + banner[i]?.image?.formats?.large?.url,
      });
    }

    setImg(listImage);
  }, []);

  // return img.length === 0 ? (
  //   <div className='w-full my-24'>
  //     <Skeleton height={600} />
  //   </div>
  // ) : (
  //   <section className='flex mt-4'>
  //     <ImageCarousel {...options} image={img} banner={true} />
  //   </section>
  // );

  return (
    <>
      <section className='flex mt-4'>
        <ImageCarousel {...options} image={img} banner={true} />
      </section>
    </>
  );
}
