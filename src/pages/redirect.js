import { getTracingFromEmail } from 'constants/api/member';
import Image from 'next/image';
import Link from 'next/link';
import router from 'next/router';
import React, { useEffect, useState } from 'react';

const redirect = ({ email, link }) => {
  const [counting, setCounting] = useState(1);
  const [barProgress, setbarProgress] = useState('w-0');

  useEffect(() => {
    const getTrackingUser = async () => {
      const response = getTracingFromEmail(email);
      if (response?.status === 200) {
        console.log('Success');
      } else {
        console.log('Canceled');
      }
    };

    getTrackingUser();
  }, []);

  useEffect(() => {
    if (counting <= 5) {
      setTimeout(() => {
        setCounting((prev) => prev + 1);
        if (counting === 1) {
          setbarProgress('w-[20%]');
          return;
        }
        if (counting === 2) {
          setbarProgress('w-[40%]');
          return;
        }
        if (counting === 3) {
          setbarProgress('w-[60%]');
          return;
        }
        if (counting === 4) {
          setbarProgress('w-[80%]');
          return;
        } else {
          setbarProgress('w-[100%]');
        }
      }, 1000);
    } else {
      router.push(link);
      return;
    }
  }, [counting]);

  return (
    <div className='bg-white'>
      <div className='container mx-auto h-screen bg-white pt-10'>
        <div className='flex'>
          <div className='w-80'>
            <Image
              src='/logo_oci_new_2.svg'
              alt='ocistok'
              height={50}
              width={200}
            />
          </div>
        </div>
        <div className='flex w-full justify-center items-center mt-10'>
          <div className='w-[300px] shadow-2xl drop-shadow-lg border-orange-500 overflow-auto'>
            <div className='flex flex-col items-center justify-center p-5'>
              <div className='relative w-full h-24'>
                <Image
                  src='https://ocistok.co.id/control-panel/foto/lAHPGTrVlojhZ1nNAyDNAyA_800_800.gif'
                  layout='fill'
                  objectFit='contain'
                  alt='jasa import barang dari china'
                />
              </div>
              <div className='text-gray-800 font-semibold'>
                Mohon Tunggu Sebentar
              </div>
              <div className='text-gray-800 font-normal text-center mt-5'>
                Kamu akan diarahkan kehalaman lain website, ini akan memakan
                waktu sekitar 5 detik
              </div>
            </div>
            <div
              className={`${barProgress} h-10 bg-orange-500 duration-700 transition-all ease-in-out relative`}
            >
              <Link href={link}>
                <a>
                  <div className='text-white text-xs font-light whitespace-nowrap absolute right-7 top-2'>
                    Click Disini Apabila Gagal Redirect
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default redirect;

export async function getServerSideProps({ query }) {
  const { email, link } = query;

  if (!email || !link) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { email, link },
  };
}
