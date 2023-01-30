import Heads from 'components/Heads';
import { getTemplate } from 'constants/api/template';
import Link from 'next/link';

export default function FourOhFour({ type, template }) {
  return (
    <>
      <Heads {...template} />
      <div className='flex flex-col min-h-screen items-center justify-center'>
        <img src='/404.svg' />
        <p className='font-semibold'>
          {type === 'product'
            ? 'Produk tidak ditemukan'
            : 'Halaman Tidak Ditemukan'}
        </p>
        <Link href='/'>
          <a className='mt-5 px-4 py-1 bg-orange-500 text-white rounded-md w-44 text-center'>
            Kembali Ke Beranda
          </a>
        </Link>

        {type === 'product' && (
          <>
            <Link href='https://api.whatsapp.com/send?text=https%3A%2F%2Focistok.com%2F%20%0A%0AHi%20OCISTOK.com%20%0ASaya%20mau%20tanya-tanya%20terkait%20Ocistok%20sebagai%20pusat%20grosir%20impor&phone=6281210001808'>
              <a
                target='_blank'
                className='mt-5 px-4 py-1 bg-orange-500 text-white rounded-md w-44 text-center'
              >
                Hubungi Sales
              </a>
            </Link>
            <Link href='/request-product'>
              <a className='mt-5 px-4 py-1 bg-orange-500 text-white rounded-md w-44 text-center'>
                Request Produk
              </a>
            </Link>
          </>
        )}
      </div>
    </>
  );
}
export async function getServerSideProps({ params }) {
  const { type } = params;
  // const template = await getTemplate("/product");
  return {
    props: {
      type,
      // template,
    },
  };
}
