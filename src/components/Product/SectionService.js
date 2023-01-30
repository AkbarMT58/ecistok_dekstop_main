import React from 'react';
import Image from 'next/image';

const SectionService = () => {
  return (
    <section className='shadow bg-white rounded-md mt-6 px-6 py-8'>
      <div className='flex items-center'>
        <div className='w-full'>
          <div className='flex items-center space-x-6'>
            <div className='bg-orange-500 p-4 rounded-full shadow-md'>
              <Image
                src='/icons/shopping-basket-solid.svg'
                height={30}
                width={35}
              />
            </div>
            <p className='text-gray-500 font-bold text-md'>
              Perlindungan Konsumen
            </p>
          </div>
        </div>
        <div className='w-full space-y-2'>
          <div className='w-full ml-4 flex items-center space-x-1'>
            <Image
              src='/icons/check-circle-solid.svg'
              height={15}
              width={15}
              alt='jasa import barang dari china'
            />
            <p className='text-sm text-gray-700'>Refund Guarantee*</p>
          </div>
          <div className='w-full ml-4 flex items-center space-x-1'>
            <Image
              src='/icons/shield-alt-solid.svg'
              height={15}
              width={15}
              alt='jasa import barang dari china'
            />
            <p className='text-sm text-gray-700'>Safe and secured payment*</p>
          </div>
        </div>
        <div className='w-full'>
          <div className='flex items-center space-x-6'>
            <div className='bg-orange-500 p-4 rounded-full shadow-md'>
              <Image
                src='/icons/truck-solid.svg'
                height={30}
                width={35}
                alt='jasa import barang dari china'
              />
            </div>
            <p className='text-gray-500 font-bold text-md'>
              Gratis Ongkos Kirim Se-JABODETABEK
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(SectionService);
