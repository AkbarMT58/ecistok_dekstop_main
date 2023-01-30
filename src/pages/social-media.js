import Image from 'next/image';
import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import TelegramIcon from '@mui/icons-material/Telegram';
import LanguageIcon from '@mui/icons-material/Language';
import MailIcon from '@mui/icons-material/Mail';
import Heads from 'components/Heads';
import { getTemplate } from 'constants/api/template';
import Head from 'next/head';

const SocialMedia = ({ template }) => {
  return (
    <>
      <Heads title={'Social Media'} />
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        />
      </Head>

      <div className='BgMedsos fixed overflow-y-scroll w-full h-full'>
        <div className='w-full min-h-screen backdrop-brightness-50 pt-10 '>
          <div className='container mx-auto'>
            <div className='flex gap-6 items-center mb-2'>
              <div className='flex items-center bg-orange-500  justify-center  h-[70px] w-[70px] rounded-full px-1'>
                <Image
                  width={70}
                  height={30}
                  layout='fixed'
                  objectFit='contain'
                  src='/logo_oci_new_1.svg'
                  alt='jasa import barang dari china'
                />
              </div>
              <div className='text-white font-poppins'>
                <div className='text-lg font-light'>ocistok</div>
                <div className='text-xs font-light'>
                  Cari Barang Dari Supplier China <br />
                  Tangan Pertama Langsung di 1 <br />
                  Website
                </div>
              </div>
            </div>
            <div className='flex mb-5 text-white gap-3'>
              <a href='mailto:info@ocistok.com'>
                <MailIcon />
              </a>
              <a href='https://www.instagram.com/ocistok/?hl=id'>
                <InstagramIcon />
              </a>
              <a href='https://vt.tiktok.com/ZSJ1ePQ9g/'>
                <MusicNoteIcon />
              </a>
              <a href='https://www.youtube.com/c/OCISTOK'>
                <YouTubeIcon />
              </a>
              <a href='https://www.facebook.com/PTOCI/'>
                <FacebookIcon />
              </a>
              <a href='https://api.whatsapp.com/send?text=https%3A%2F%2Focistok.com%2F%0A%0AHi%20OCISTOK.com%0ABingung%20mau%20Usaha%20apa%20%3F%20Tanya%20customer%20service%20aja&phone=628125001088'>
                <WhatsAppIcon />
              </a>
            </div>

            {/* Rounded Button */}
            <div className='flex flex-col gap-4 justify-center items-center w-full'>
              <div className='relative border-2 border-white bg-[rgba(0,0,0,0.6)] rounded-3xl py-3 w-full flex items-center justify-center font-bold text-white hover:text-orange-500'>
                <div className='absolute left-5'>
                  <img src="https://ocistok.co.id/control-panel/foto/new-member.svg" width={24} height={24} alt="new member register" />
                </div>
                <a
                  className='text-lg'
                  href='https://ocistok.com/register'
                >
                  Daftar GRATIS Sekarang!
                </a>
              </div>
              <div className='relative border-2 border-white bg-[rgba(0,0,0,0.6)] rounded-3xl py-3 w-full flex items-center justify-center font-bold text-white hover:text-orange-500'>
                <div className='absolute left-5'>
                  <LanguageIcon />
                </div>
                <a className='text-lg' href='https://ocistok.com'>
                  Official Website
                </a>
              </div>
              <div className='relative border-2 border-white bg-[rgba(0,0,0,0.6)] rounded-3xl py-3 w-full flex items-center justify-center font-bold text-white hover:text-orange-500'>
                <div className='absolute left-5'>
                  <WhatsAppIcon />
                </div>
                <a
                  className='text-lg'
                  href='https://api.whatsapp.com/send?text=https%3A%2F%2Focistok.com%2F%0A%0AHi%20OCISTOK.com%0ABingung%20mau%20Usaha%20apa%20%3F%20Tanya%20customer%20service%20aja&phone=6281210001808'
                >
                  Official Whatsapp
                </a>
              </div>
              <div className='relative border-2 border-white bg-[rgba(0,0,0,0.6)] text-bold rounded-3xl py-3 w-full flex items-center justify-center font-extrabold text-white hover:text-orange-500'>
                <div className='absolute left-5'>
                  <YouTubeIcon />
                </div>
                <a
                  className='text-lg'
                  href='https://www.youtube.com/channel/UCDHwQp2QjJ0O1GmsvdExO3Q'
                >
                  Youtube
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialMedia;

export async function getStaticProps() {
  // const template = await getTemplate('/');

  return {
    props: {
      // template,
    },
  };
}
