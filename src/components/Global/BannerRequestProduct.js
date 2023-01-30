import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function BannerRequestProduct() {
  return (
    <section className='relative mt-5 h-[500px] md:h-[500px]'>
      <Link href='/'>
        <a>
          <Image
            src='/Banner_Fitur.png'
            layout='fill'
            objectFit='contain'
            className='rounded-2xl'
            alt='jasa import barang dari china'
          />
        </a>
      </Link>
    </section>
  );
}
