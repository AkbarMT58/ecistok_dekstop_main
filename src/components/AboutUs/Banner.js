import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useRouter } from 'next/router';

const Banner = ({ pages }) => {
  const router = useRouter();

  const handleCariProdukAbaoutUs = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleCariProdukLogin = () => {
    router.push('/search?keyword=terlaris&type=1688');
  };

  return (
    <div className='bg-gray-100 relative rounded-md h-auto space-y-10 flex flex-col justify-between p-10 items-start'>
      <div className='w-2/3'>
        <p className='text-orange-500 text-2xl font-semibold'>
          Udah tau mau cari produk import apa untuk usaha?
        </p>
        <p className='text-black text-2xl font-semibold'>
          Cari Produk & Hitung Harga Nett-nya Sekarang!
        </p>
        <button
          // onClick={handleCariProdukAbaoutUs}
          onClick={
            pages === 'login' ? handleCariProdukLogin : handleCariProdukAbaoutUs
          }
          className='text-white font-semibold mt-2 text-2xl shadow-md bg-orange-500 py-4 px-10'
        >
          Cari Produk
        </button>
      </div>
      <div className='w-2/3'>
        <p className='text-orange-500 text-2xl font-semibold'>
          Masih Bingung mau bisnis produk import apa?
        </p>
        <p className='text-black text-2xl font-semibold'>
          Konsultasi “Gratis” Sekarang!
        </p>
        <div className='inline-block mt-2 shadow-md'>
          <a
            href='https://api.whatsapp.com/send?text=Hai%20Ocistok,%20Boleh%20Bantu%20Saya%20Temukan%20Produk%20Import%20Untuk%20Usaha?	%F0%9F%98%8A&phone=6281210001808'
            target='_blank'
            className='flex items-center space-x-2 bg-green-500 font-semibold text-2xl text-white hover:text-orange-500 px-10 py-4 cursor-pointer'
          >
            <WhatsAppIcon />
            <span>Hubungi Kami</span>
          </a>
        </div>
      </div>
      <img
        src='https://cdn.shopify.com/s/files/1/0268/7480/6307/files/Group_129.svg?v=1641529456'
        alt=''
        className='absolute right-0 bottom-0 w-80'
      />
    </div>
  );
};

export default Banner;
