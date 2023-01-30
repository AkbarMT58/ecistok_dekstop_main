import Headnav from 'components/Home/Headnav';
import Footer from 'components/Layout/Footer';
import Header from 'components/Layout/Header';
import Navbar from 'components/Home/Navbar';
import Heads from 'components/Heads';
import ContainerGeneral from 'components/Layout/ContainerGeneral';
import { getlistCatalog } from 'constants/api/member';
import Link from 'next/link';
import formatFullDate from 'helpers/formatFullDate';
import { useRouter } from 'next/router';

const catalogList = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <Heads title={'Home'} />
      <Headnav />
      <ContainerGeneral>
        <Header />
        <Navbar />
        <div className='w-full h-auto py-10 bg-white mt-8 rounded-md'>
          <div className='bg-orange-500 w-full py-10 flex flex-col items-center justify-center gap-4'>
            <img
              src='/logo_oci_new_1.svg'
              className='h-16 mx-auto'
              alt='logo_oci_new_1.svg'
            />
            <div className='text-white text-2xl'>List Produk Catalog</div>
          </div>
          <div className='mt-10 w-4/5 mx-auto font-semibold divide-y-2'>
            <div className='flex items-center justify-center gap-5 border-b-2'>
              <div className='w-[10%] text-orange-500 font-semibold uppercase text-center text-md'>
                No
              </div>
              <div className='w-[40%] text-orange-500 font-semibold uppercase text-left text-md'>
                Catalog Name
              </div>
              <div className='w-[30%] text-orange-500 font-semibold uppercase text-center text-md'>
                Tanggal
              </div>
              <div className='w-[20%] text-orange-500 font-semibold uppercase text-center text-md'>
                Detail
              </div>
            </div>

            {data?.data?.map((catalog, index) => (
              <div
                key={index}
                className='flex items-center justify-center gap-5 py-2'
              >
                <div className='w-[10%] text-gray-500 font-medium text-center text-md'>
                  {index + 1}
                </div>
                <div className='w-[40%] text-gray-500 font-medium text-left text-md line-clamp-3'>
                  {catalog?.name}
                </div>
                <div className='w-[30%] text-gray-500 font-medium text-center text-md'>
                  {formatFullDate(catalog?.date)}
                </div>
                <Link href={`/catalog/${catalog?.name}`}>
                  <a className='w-[20%] font-medium text-center text-md bg-orange-500 text-white px-3 py-2 cursor-pointer'>
                    <div className='animate-pulses hover:scale-110 duration-150'>
                      Lihat di sini
                    </div>
                  </a>
                </Link>
              </div>
            ))}
          </div>

          <div className='flex items-center justify-center mt-5'>
            <button
              onClick={(e) => router.push('/')}
              className='bg-orange-500 hover:scale-105 duration-300 rounded-md px-3 py-3 text-white text-base font-medium cursor-pointer'
            >
              Cari Lebih Banyak Di Website Ocistok.com
            </button>
          </div>
        </div>
      </ContainerGeneral>
      <Footer />
    </>
  );
};

export default catalogList;

export async function getServerSideProps({ req }) {
  const response = await getlistCatalog();
  const { token } = req.cookies;

  if (!token) {
    return {
      redirect: {
        destination:
          '/login?redirect=https://ocistok.com/catalog-list&fullUrl=true',
        permanent: false,
      },
    };
  }

  if (!response) {
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: response,
    },
  };
}
