import Headnav from 'components/Home/Headnav';
import Header from 'components/Layout/Header';
import Navbar from 'components/Home/Navbar';
import Footer from 'components/Layout/Footer';
import Heads from 'components/Heads';
import { getTemplate } from 'constants/api/template';
import ContainerGeneral from 'components/Layout/ContainerGeneral';
import { useRouter } from 'next/router';
import Link from 'next/link';

const thankyou = ({ template }) => {
  const router = useRouter();
  return (
    <>
      <Heads title={'Thankyou'} />
      <Headnav />
      <ContainerGeneral>
        <Header />
        <Navbar />
        <div className='bg-white mt-10 p-20 rounded-md shadow-md'>
          <div className='space-y-10 max-w-2xl mx-auto flex flex-col items-center justify-items-center border border-gray-300 p-10 rounded-lg'>
            <img src='/Group.png' alt='' />
            <p className='max-w-lg text-center'>
              Terima kasih telah berbelanja di{' '}
              <span className='text-orange-500 font-semibold'>OCISTOK.COM</span>{' '}
              Silahkan cek status pembayaran anda secara berkala
            </p>
            <div className='flex items-center justify-between w-full'>
              <Link
                href={{
                  pathname: '/dashboard',
                  query: { path: 'myorders' },
                }}
              >
                <button className='text-center p-2 border border-orange-500 rounded-md text-orange-500'>
                  Cek Status Pembayaran
                </button>
              </Link>
              <button
                onClick={() => {
                  router.push('/');
                }}
                className='text-center p-2 bg-orange-500 text-white border border-orange-500 rounded-md'
              >
                Lanjut Berbelanja
              </button>
            </div>
          </div>
        </div>
      </ContainerGeneral>
      <Footer />
    </>
  );
};

export default thankyou;

export async function getStaticProps() {
  // const template = await getTemplate('/thankyou');

  return {
    props: {
      // template,
    },
  };
}
