import { useState } from 'react';
import NavItem from 'components/NavItem';
import Category from './Category';

export default function Navbar() {
  const [show, setShow] = useState(false);

  return (
    <>
      {show && (
        <div className='fixed top-0 left-0 w-full h-screen z-10 bg-[rgba(0,0,0,0.5)]' />
      )}
      <section className='transition-all w-full relative z-20'>
        <div className='mt-10 shadow-sm flex flex-rows bg-white py-3 px-6 rounded-lg space-x-6'>
          <div className='relative'>
            <a
              href='#'
              className='text-md text-orange-500 hover:scale-50'
              onMouseOver={() => {
                setShow(true);
                document.body.style.overflowY = 'hidden';
              }}
            >
              Kategori
            </a>
          </div>

          <NavItem url='/request-product' text='Permintaan Produk' />
          <NavItem url='/how-to-shop' text='Cara Belanja' />
          <NavItem url='/about-us' text='Tentang kami' />
          <NavItem url='/terms' text='Syarat & Ketentuan' />
          <div
            style={{ marginLeft: 'auto' }}
            className='text-md text-orange-500 ml-auto'
          >
            Kurs RP-RMB = Rp 2.350
          </div>
        </div>

        {show && <Category onShow={setShow} />}
      </section>
    </>
  );
}
