import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import formatDate from 'utils/formatDate';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useState } from 'react';

export default function SectionBlog({ data }) {
  const [blog, setBlog] = useState();

  useEffect(() => {
    if (!blog) {
      setBlog(data);
    }
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
  };

  return (
    <section className='mt-10 shadow-sm bg-white py-3 px-6 rounded-lg space-x-6'>
      <div className='flex mb-6 justify-between'>
        <div className='flex space-x-2 items-center'>
          <Image
            src='/icons/newspaper-regular.svg'
            height={30}
            width={35}
            objectFit='contain'
            alt='jasa import barang dari china'
          />
          <p className='text-xl font-bold text-gray-700'>Artikel</p>
        </div>
        <Link href='/blog'>
          <a className='text-md text-white bg-orange-500 py-1 px-3 rounded-md'>
            Lihat Semua
          </a>
        </Link>
      </div>

      {blog?.status == 200 ? (
        <Slider {...settings}>
          {blog.data.map((post) => (
            <div className='w-full' key={post._id}>
              <Link href={`/blog/${post.slug}`}>
                <a>
                  <div className='w-full rounded-xl p-4 hover:shadow-xl transform hover:scale-105 transition duration-500'>
                    <Image
                      className='rounded-xl'
                      src={post.image}
                      height={215}
                      width={280}
                      objectFit='cover'
                      alt='jasa import barang dari china'
                    />
                    <div className='bg-white'>
                      <h2 className='mt-2 font-bold text-md text-gray-700'>
                        {post.title}
                      </h2>
                      <div
                        className='text-xs text-gray-500 mt-2'
                        dangerouslySetInnerHTML={{
                          __html:
                            post.text.length > 150
                              ? post.text.substring(150, length - 3) + '...'
                              : post.text,
                        }}
                      ></div>
                      <div className='flex mt-2 justify-between'>
                        <p className='text-xs font-bold text-gray-500'>
                          {post.user}
                        </p>
                        <p className='text-xs text-gray-500'>
                          {formatDate(post.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </Slider>
      ) : (
        <div className='w-full text-center'>
          <h2 className='text-gray-700 font-bold text-xl'>
            Data tidak di temukan
          </h2>
        </div>
      )}
    </section>
  );
}
