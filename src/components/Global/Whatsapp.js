import WhatsApp from '@mui/icons-material/WhatsApp';
import React from 'react';
import { useRouter } from 'next/router';

export default function Whatsapp() {
  const router = useRouter();

  return (
    <>
      {router.pathname !== '/invoices/[id]' && (
        <>
          <a
            href='https://api.whatsapp.com/send?text=Hi%20OCISTOK.com%20%0ASaya%20mau%20tanya-tanya%20terkait%20Ocistok%20sebagai%20pusat%20grosir%20impor&phone=6281210001808'
            className='hidden cursor-pointer fixed bottom-10 right-10 bg-white  hover:text-orange-500 rounded-md p-5 shadow-md w-96'
          >
            <span className='flex items-center space-x-4'>
              <span className='font-semibold'>
                Mau rekomendasi produk cuan untuk usaha? Chat Sales Sekarang
                (GRATIS!)
              </span>
              <span>
                <WhatsApp fontSize='large' className='text-green-600' />
              </span>
            </span>
          </a>
          <a
            href='https://api.whatsapp.com/send?text=Hi%20OCISTOK.com%20%0ASaya%20mau%20tanya-tanya%20terkait%20Ocistok%20sebagai%20pusat%20grosir%20impor&phone=6281210001808'
            className='cursor-pointer fixed bottom-6 right-10 bg-green-600  rounded-3xl p-2 px-4 shadow-md'
            target='_blank'
          >
            <span className='flex items-center space-x-1 text-white'>
              <WhatsApp fontSize='large' />
              <span>Whatsapp</span>
            </span>
          </a>
        </>
      )}
    </>
  );
}
