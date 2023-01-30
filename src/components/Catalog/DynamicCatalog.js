import { Link } from '@mui/material';
import formatFullDate from 'helpers/formatFullDate';
import router from 'next/router';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const DynamicCatalog = ({ data }) => {
  const componentToPrint = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentToPrint.current,
  });

  return (
    <div className='w-full h-auto bg-white mt-8 rounded-md py-10 relative'>
      <button
        onClick={handlePrint}
        className='bg-red-500 text-white py-3 px-4 sticky top-5 right-0 duration-300 rounded-r-3xl hover:font-semibold'
      >
        Print Catalog
      </button>

      <div ref={componentToPrint} className='w-full h-auto bg-white '>
        <div className='bg-orange-500 w-full py-10 flex flex-col items-center justify-center gap-2'>
          <img src='/logo_oci_new_1.svg' className='h-16 mx-auto' alt='' />
          <div className='text-white text-2xl mt-2 uppercase'>
            {data?.Catalog[0]?.category}
          </div>
        </div>
        <div className='mt-10 px-10'>
          {data?.Catalog?.map((produk, index) => (
            <div key={index} className='flex w-full gap-5 my-10'>
              <div className='w-1/2 min-h-[40px]'>
                <div className='w-full px-20 mx-auto text-lg text-center text-gray-500 font-medium'>
                  {produk?.product}
                </div>
                <img
                  className='w-2/3 object-contain mx-auto'
                  src={`${produk?.image}`}
                  alt={`${produk?.image}`}
                />
              </div>
              <div className='w-1/2 min-h-[40px]'>
                <div className='text-lg text-gray-500 font-medium'>
                  {produk?.category}
                </div>
                <hr className='border-b border-orange-500 mb-4' />
                <div className='space-y-3'>
                  <div className='text-lg text-gray-500 font-medium'>
                    Harga Marketplace China : Rp{' '}
                    {produk?.price.toLocaleString('id-ID')}
                  </div>
                  <div className='text-lg text-gray-500 font-medium'>
                    Category : {produk?.category}
                  </div>
                  <div className='text-lg text-gray-500 font-medium'>
                    Toko : {produk?.toko}
                  </div>
                  <div className='text-lg text-gray-500 font-medium'>
                    Link Beli :<br />
                    <Link
                      href={`https://ocistok.com/product/${produk?.toko}/${produk?.link}`}
                    >
                      <a className='hover:text-orange-500 text-base'>
                        https://ocistok.com/product/{produk?.toko}/
                        {produk?.link}
                      </a>
                    </Link>
                  </div>
                  <div className='flex justify-start items-center'>
                    <button
                      onClick={(e) =>
                        router.push(
                          `https://ocistok.com/product/${produk?.toko}/${produk?.link}`
                        )
                      }
                      className='text-center bg-orange-500 rounded-md text-white font-medium px-3 py-2 hover:bg-red-500 duration-700 transition-colors'
                    >
                      HITUNG HPP SEKARANG!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className='w-full h-20 bg-orange-500 text-white p-5 text-xs'>
            * Produk yang tertera di dalam catalog ini belum termasuk dengan
            Service Charge, Ongkos Kirim & PPN (11%)
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicCatalog;
