import Image from 'next/image';

const imgLogo = ['/1688_logo.png', '/taobao_logo.png', '/tmall_logo.png', '/alibaba_logo.PNG'];

export default function BannerHero() {
  return (
    <section className='flex mt-4 space-x-4'>
      {imgLogo.map((img) => {
        return (
          <div key={img} className='w-3/12 relative h-[100px]'>
            <Image
              src={img}
              layout='fill'
              objectFit='contain'
              className='rounded-xl'
              alt='jasa import barang dari china'
            />
          </div>
        );
      })}
    </section>
  );
}
