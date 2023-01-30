import Image from 'next/image';

export default function Finished() {
  return (
    <div className='flex flex-col space-y-2'>
      <div className='w-full bg-white p-1'>
        <div className='flex text-xs py-1 text-gray-600'>
          <div className='w-3/12'>
            <p>No. Pesanan :</p>
          </div>
          <div className='w-6/12'>
            <p>2021KLA3574540</p>
          </div>
          <div className='w-3/12 text-right'>
            <p>21-08-2021</p>
          </div>
        </div>
        <hr />
        <div className='flex p-2 space-x-2 items-center'>
          <div className='w-4/12'>
            <div className='relative h-24'>
              <Image
                src='http://img.alicdn.com/bao/uploaded/i3/1666003591/O1CN01mTMFhn1cOiyVJq9hI_!!1666003591.jpg'
                layout='fill'
                objectFit='contain'
                alt='jasa import barang dari china'
              />
            </div>
          </div>
          <div className='w-8/12'>
            <div className='flex flex-col'>
              <p className='text-sm text-gray-800'>Baju Panjang</p>
              <div className='flex justify-between text-xs text-gray-700'>
                <p>Putih, S</p>
                <p>10</p>
              </div>
              <div className='flex justify-between text-xs text-gray-700'>
                <p>Putih, S</p>
                <p>10</p>
              </div>
              <div className='flex justify-between text-xs text-gray-700'>
                <p>Putih, S</p>
                <p>10</p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className='flex p-2 text-sm space-x-1'>
          <div className='w-4/12'>
            <p>30 Produk</p>
          </div>
          <div className='w-4/12 text-right'>
            <p>Total Pesanan : </p>
          </div>
          <div className='w-4/12'>
            <p className='text-marron-500'>Rp. 1.017.175 </p>
          </div>
        </div>
        <hr />
        <div className='flex justify-end px-2 py-1 space-x-1 text-sm'>
          <p className='bg-marron-500 text-white px-3 py-1 rounded-sm'>
            Ajukan Refund
          </p>
        </div>
      </div>
    </div>
  );
}
