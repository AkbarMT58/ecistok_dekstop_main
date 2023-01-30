import Image from 'next/image';
import Link from 'next/link';
import Banner from './Banner';

const index = () => {
  const handleCariProdukAbaoutUs = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className='mt-10 bg-white rounded-md text-gray-700 space-y-5'>
      <div className='relative pt-16'>
        <img
          src='https://cdn.shopify.com/s/files/1/0268/7480/6307/files/image_14_cc3330bf-62a4-4fea-9b60-0d7a3bf69c23.svg?v=1640930805'
          alt=''
          className='absolute left-0'
        />
        <div className='grid grid-cols-2 max-w-6xl mx-auto'>
          <div className='flex flex-col justify-center text-xl'>
            <p className='text-4xl font-black leading-[3rem]'>
              Jutaan Supplier & Pabrik di China Untuk Usaha ada di 1 Platform
            </p>
            <p className='text-2xl leading-tight mt-2'>
              Pernah Import China Tapi {''}
              <span className='font-bold'>
                KAPOK Harus Ikut SEMINAR, BAYAR Biaya Member Dengan Proses
                Import Yang Ribet?
              </span>
            </p>
            <p className='text-3xl font-bold text-orange-500 mt-4'>
              OCISTOK.COM SOLUSINYA !
            </p>
          </div>
          <div className='flex justify-center pl-16'>
            <img
              src='https://cdn.shopify.com/s/files/1/0268/7480/6307/files/image_1_794e0cfc-93fa-4a30-94ee-fd6506dee641.jpg?v=1640930805'
              alt=''
              className='w-100'
            />
          </div>
        </div>
        <img
          src='https://cdn.shopify.com/s/files/1/0268/7480/6307/files/image_14_cc3330bf-62a4-4fea-9b60-0d7a3bf69c23.svg?v=1640930805'
          alt=''
          className='absolute right-0 bottom-5'
        />
      </div>

      <div className='relative'>
        {/* <img
          src='https://cdn.shopify.com/s/files/1/0268/7480/6307/files/image_14_cc3330bf-62a4-4fea-9b60-0d7a3bf69c23.svg?v=1640930805'
          alt=''
          className='absolute left-0'
        /> */}
        <div className='grid grid-cols-3 max-w-6xl mx-auto mt-12'>
          <div className='flex justify-start pr-0'>
            <Image
              src='https://ocistok.co.id/control-panel/foto/Group 14.svg'
              alt='jasa import barang dari china'
              width={360}
              height={360}
            />
          </div>
          <div className=' flex flex-col justify-center col-span-2 pl-3'>
            <p className='text-3xl font-bold text-orange-500 text-right'>
              Apa itu OCISTOK ?
            </p>
            <p className='mt-7 text-2xl text-right leading-[2.1rem]'>
              <b className='text-orange-500'>OCISTOK.COM</b> adalah platform
              belanja import China, dimana Customer bisa langsung mencari dan
              memilih barang dari
              <b> Pabrik & Supplier China Tangan Pertama di website</b>
              <b className='text-orange-500'> OCISTOK.COM</b>
            </p>
            <div className='mt-8 py-4 text-right animate-bounce'>
              <Link href='/register'>
                <a className='bg-orange-500 text-2xl text-white py-4 px-16 rounded-lg hover:scale-105 duration-300'>
                  AKSES GRATIS SEKARANG!
                </a>
              </Link>
            </div>
          </div>
        </div>
        {/* <img
          src='https://cdn.shopify.com/s/files/1/0268/7480/6307/files/image_14_cc3330bf-62a4-4fea-9b60-0d7a3bf69c23.svg?v=1640930805'
          alt=''
          className='absolute right-0 bottom-5'
        /> */}
      </div>

      <div className='grid grid-cols-3 max-w-6xl mx-auto -mt-3'>
        <div className=' flex flex-col justify-center col-span-2 pr-24'>
          <p className='text-2xl leading-[2.1rem] text-justify'>
            <b>
              “Eitss, Tapi emangnya kenapa sih pebisnis offline ataupun online
              harus banget import barang dari China?
            </b>
            {''} Kenapa ga cari barang disini aja?”
          </p>
        </div>
        <div className='flex justify-end'>
          <Image
            src='https://ocistok.co.id/control-panel/foto/Group 357.svg'
            alt=''
            width={380}
            height={380}
          />
        </div>
      </div>

      <div className='mt-2 relative'>
        <img
          src='https://cdn.shopify.com/s/files/1/0268/7480/6307/files/image_14_cc3330bf-62a4-4fea-9b60-0d7a3bf69c23.svg?v=1640930805'
          alt=''
          className='absolute left-0'
        />
        <div className='text-center font-normal'>
          <p className='text-xl'>Jawabannya cuma 1 !</p>
          <p className='text-3xl py-4'>
            <b>
              karena rata-rata para penjual di offline dan <br />
              online itu udah kena “PERANG HARGA”
            </b>
          </p>
          <div className='mx-auto w-[42rem] text-justify'>
            <p className='mt-4 text-xl'>
              Makanya ga heran, kalau 1 barang di Marketplace, bisa dijual oleh
              puluhan seller atau bahkan lebih. alhasil{' '}
              <b>Produk yang dijual tidak dapat bersaing di pasar</b>
            </p>
            <p className='mt-4 text-xl'>
              Maka dari itu, udah banyak pebisnis yang cari produk dengan cara
              import langsung dari China.
            </p>
          </div>
        </div>
      </div>

      <div className='mt-2 relative'>
        <div className='max-w-6xl bg-orange-500 mx-auto rounded-lg mt-10 pb-10 mb-10 relative'>
          <p className='text-center text-3xl font-bold w-[600px] mx-auto py-6'>
            Alasan kenapa WAJIB banget Import China dari sekarang
          </p>
          <div className='w-2/3 mx-auto space-y-px pl-10'>
            <div className='flex items-center gap-2'>
              <img
                src='https://ocistok.co.id/control-panel/foto/Icon_Check.png'
                alt='Images'
              />
              <span className='text-xl'>
                <b>Berkesempatan Jadi Penjual Tunggal</b> produk unik di
                Indonesia
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <img
                src='https://ocistok.co.id/control-panel/foto/Icon_Check.png'
                alt='Images'
              />
              <span className='text-xl'>
                Mendapatkan{' '}
                <b>Produk Impor Langsung Dari Supplier Tangan Pertama</b> &
                Pabrik
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <img
                src='https://ocistok.co.id/control-panel/foto/Icon_Check.png'
                alt='Images'
              />
              <span className='text-xl'>
                Jutaan produk <b>Anti Perang Harga</b> dari Ribuan Supplier di
                China
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <img
                src='https://ocistok.co.id/control-panel/foto/Icon_Check.png'
                alt='Images'
              />
              <span className='text-xl'>
                Bisa buat <b>Merk Usaha Sendiri Tanpa Ribet</b> urus produksi
              </span>
            </div>
          </div>
        </div>
        <img
          src='https://cdn.shopify.com/s/files/1/0268/7480/6307/files/image_14_cc3330bf-62a4-4fea-9b60-0d7a3bf69c23.svg?v=1640930805'
          alt=''
          className='absolute right-0 bottom-5'
        />
      </div>

      <div className='bg-orange-400 flex flex-col items-center justify-center py-10 text-center'>
        <div className='text-white text-2xl'>
          Terintegrasi Langsung Dengan Marketplace Terbesar Di China
          <div className='flex gap-5 justify-center items-center my-2'>
            <img
              className='w-32 h-10 bg-white rounded-md p-1'
              src='https://ocistok.co.id/control-panel/foto/1688(1).svg'
            />
            <img
              className='w-32 h-10 bg-white rounded-md p-1'
              src='https://ocistok.co.id/control-panel/foto/Alibaba(1).svg'
            />
            <img
              className='w-32 h-10 bg-white rounded-md p-1'
              src='https://ocistok.co.id/control-panel/foto/Taobao_Logo.svg'
            />
          </div>
          <div className='text-white text-3xl'>Dapatkan produk untuk usaha</div>
          <div className='text-white text-3xl'>
            <b>langsung</b> dari Supplier & Pabrik di China!
          </div>
        </div>
      </div>

      <div className='relative space-y-24 bg-gray-100 py-10'>
        <p className='text-3xl font-bold text-center z-50'>
          Mengapa <span className='text-orange-500'>OCISTOK.COM</span> dan BUKAN
          yang lain ?
        </p>
        <div className='grid grid-cols-3 gap-8 max-w-6xl mx-auto z-50'>
          <div className='relative h-56 p-5 bg-white'>
            <div className='w-[75%] space-y-4'>
              <p className='text-xl font-bold'>
                Belanja Semudah di Marketplace
              </p>
              <p>
                Belanja semudah di Marketplace (Tinggal cari & pilih barang di
                Website Ocistok.com
              </p>
            </div>
            <img
              src='https://cdn.shopify.com/s/files/1/0268/7480/6307/files/image_4.svg?v=1640930805'
              alt=''
              className='absolute right-0 bottom-0 w-28'
            />
          </div>
          <div className='relative h-56 p-5 bg-white'>
            <div className='w-[75%] space-y-4'>
              <p className='text-xl font-bold'>
                Akses Gratis ke Supplier & Pabrik di China
              </p>
              <p>
                Untung penjualanmu sedikit? di OCISTOK harganya dijamin termurah
                dan langsung dari supplier China tangan pertama
              </p>
            </div>
            <img
              src='https://ocistok.co.id/control-panel/foto/akses_gratis_sekarang.svg'
              alt=''
              className='absolute right-0 bottom-0 w-28'
            />
          </div>
          <div className='relative h-56 p-5 bg-white'>
            <div className='w-[75%] space-y-4'>
              <p className='text-xl font-bold'>Harga Dihitungkan ALL IN</p>
              <p>
                {/* Kalian bisa impor barang di{' '}
                <span className='font-semibold text-orange-500'>OCISTOK</span>{' '}
                tanpa perlu biaya member ataupun seminar */}
                Harga akan dihitungkan ALL IN sampai alamat tujuan sebelum
                melakukan pembayaran (Harga produk + Ongkir China & Lokal +
                Pajak & Bea Cukai + PPN + Service Fee)
              </p>
            </div>
            <img
              src='https://cdn.shopify.com/s/files/1/0268/7480/6307/files/image_3.svg?v=1640930805'
              alt=''
              className='absolute right-0 bottom-0 w-28'
            />
          </div>
          <div className='relative h-56 p-5 bg-white'>
            <div className='w-[75%] space-y-4'>
              <p className='text-xl font-bold'>Bebas Biaya Member & Seminar</p>
              <p>
                {/* Untung penjualanmu sedikit? di{' '}
                <span className='font-semibold text-orange-500'>OCISTOK</span>{' '}
                harganya dijamin termurah dan langsung dari supplier China
                tangan pertama */}
                Import lebih HEMAT tanpa perlu bayar biaya member & seminar
              </p>
            </div>
            <img
              src='https://cdn.shopify.com/s/files/1/0268/7480/6307/files/Group_127_1.svg?v=1641549202'
              alt=''
              className='absolute right-0 bottom-0 w-28'
            />
          </div>
          <div className='relative h-56 p-5 bg-white'>
            <div className='w-[75%] space-y-4'>
              <p className='text-xl font-bold'>
                FREE ONGKIR JABODETABEK + Jaminan Garansi
              </p>
              <p>
                Sistem Refund Guarantee 100% tanpa takut barang hilang (syarat &
                ketentuan berlaku)
              </p>
            </div>
            <img
              src='https://cdn.shopify.com/s/files/1/0268/7480/6307/files/image_6_e44ed2e9-3751-41c6-be3d-58678212b81a.svg?v=1640930805'
              alt=''
              className='absolute right-0 bottom-0 w-28'
            />
          </div>
          <div className='relative h-56 p-5 bg-white'>
            <div className='w-[75%] space-y-4'>
              <p className='text-xl font-bold'>FREE Personal Consultant</p>
              <p>
                {/* <span className='font-semibold'>FREE Ongkir</span> untuk seluruh
                wilayah di
                <span className='font-semibold'>Jabodetabek</span> */}
                Setiap Customer yang telah melakukan transaksi akan mendapatkan
                personal Consultant
              </p>
            </div>
            <img
              src='https://cdn.shopify.com/s/files/1/0268/7480/6307/files/image_8_afe8aaa1-11ff-4837-a653-e319af614b65.svg?v=1640930805'
              alt=''
              className='absolute right-0 bottom-0 w-28'
            />
          </div>
          <div />
          <div className='relative h-56 p-5 bg-white'>
            <div className='w-[75%] space-y-4'>
              <p className='text-xl font-bold'>BONUS Video e-learning</p>
              <p>
                {/* Mau tanya-tanya atau dibantu dicarikan produk import tren serta
                termurah untuk usaha?{' '}
                <span className='font-semibold'>
                  Konsultasi dengan Sales{' '}
                  <span className='text-orange-500'>OCISTOK</span> GRATIS
                </span> */}
                Setiap Customer yang telah melakukan transaksi di{' '}
                <span className='text-orange-500'>OCISTOK</span> mendapatkan
                FREE video e-learning cara berjualan untuk pemula.
              </p>
            </div>
            <img
              src='https://ocistok.co.id/control-panel/foto/videooci_new.svg'
              alt=''
              className='absolute right-0 bottom-0 w-28'
            />
          </div>
          <div />
        </div>
        {/* <img
          src="https://cdn.shopify.com/s/files/1/0268/7480/6307/files/image_15.svg?v=1640930805"
          alt=""
          className="absolute left-0 top-10 w-[30%] -z-50"
        /> */}
      </div>

      <div className='py-10 max-w-5xl mx-auto space-y-24'>
        <div className='text-center text-3xl font-bold'>
          Masih Ragu Kalau Belanja Impor itu mudah?
        </div>
        <div className='flex gap-2'>
          <div className='w-full flex flex-col items-start justify-center space-y-5'>
            <div className='px-5 py-4 rounded-lg border shadow-xl border-[#C4C4C4] mb-[100px]'>
              <div className='text-black capitalize text-lg'>
                Cuma Sekali Klik! <br />
                <div className='mt-2'>
                  Langsung Terhubung dengan Pabrik & Supplier Terbaik di china
                </div>
              </div>
              <Link href='/register'>
                <a>
                  <div className='bg-orange-500 inline-block mt-10 py-2 px-3 min-w-[250px] text-center text-lg rounded-md text-white hover:scale-110 duration-300 ease-in-out'>
                    Belanja Sekarang
                  </div>
                </a>
              </Link>
            </div>
          </div>

          <div className='w-full text-center'>
            <div className='text-black text-lg font-semibold'>
              Tonton Video untuk penjelasan <br />
              singkat tentang Ocistok!
            </div>
            <div
              style={{ backgroundImage: 'url("/frame/Frame-monitor.png")' }}
              className='mt-2 w-full h-[500px] bg-no-repeat bg-contain relative'
            >
              <div className='px-[30px] pt-[30px] pb-[215px] w-full h-full'>
                <div className='bg-black w-full h-full overflow-y-hidden'>
                  <video
                    className='w-full h-full'
                    src='https://ocistok.co.id/control-panel/video/Iklan Ocistok MOtion 1-1 28062022(1).mp4'
                    loop
                    controls
                    controlsList='nodownload'
                    allowFullScreen
                  ></video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='py-10 bg-gray-100'>
        <div className='max-w-5xl mx-auto space-y-24'>
          <div className='text-center text-3xl font-bold'>
            Bongkar Rahasia Pilih Produk Usaha Anti Perang Harga Disini!
          </div>
          <div className='flex gap-2'>
            <div className='w-full flex flex-col items-start justify-center space-y-5'>
              <div className='px-5 py-4 w-full rounded-lg border shadow-xl border-[#C4C4C4] mb-[100px]'>
                <div className='text-black capitalize text-lg'>
                  Pelajari Tips & Trik Pilih Produk Import Unik Untuk Usaha Yang
                  Belum Banyak di Pasaran Marketplace Indonesia
                </div>
                <button
                  onClick={handleCariProdukAbaoutUs}
                  className='bg-orange-500 inline-block mt-10 py-2 px-3 min-w-[250px] text-center text-lg rounded-md text-white hover:scale-110 duration-300 ease-in-out'
                >
                  Cari Produk Sekarang
                </button>
              </div>
            </div>

            <div className='w-full text-center'>
              <div className='text-black text-lg font-semibold'>
                Tonton Video untuk Penjelasan <br /> selengkapnya
              </div>
              <div
                style={{ backgroundImage: 'url("/frame/Frame-monitor.png")' }}
                className='mt-2 w-full h-[500px] bg-no-repeat bg-contain relative'
              >
                <div className='px-[30px] pt-[30px] pb-[215px] w-full h-full'>
                  <div className='bg-black w-full h-full overflow-y-hidden'>
                    <iframe
                      className='w-full h-full'
                      src='https://www.youtube.com/embed/ofO8D-zdmck'
                      title='Bongkar Rahasia Pilih Produk Anti Perang Harga'
                      frameBorder='0'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-gray-100'>
        <div className='py-10 bg-white my-5'>
          <div className='max-w-6xl mx-auto space-y-16 flex flex-col items-center'>
            <div className='text-center'>
              <div className='text-black font-bold text-3xl'>
                Apa Kata Pengguna Ocistok ?
              </div>
              <div className='text-black font-normal text-2xl mt-5'>
                Ocistok telah dipercaya 10.000+ para pelaku <br /> bisnis dari
                berbagai daerah di seluruh indonesia.
              </div>
            </div>
            <div className='grid grid-cols-3 gap-10'>
              <iframe
                className='w-[290px] lg:w-[320px] h-[215px]'
                src='https://www.youtube.com/embed/3MeTtgHV_Uk'
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
              <iframe
                className='w-[290px] lg:w-[320px] h-[215px]'
                src='https://www.youtube.com/embed/pqAh6ZG_ZX0'
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
              <iframe
                className='w-[290px] lg:w-[320px] h-[215px]'
                src='https://www.youtube.com/embed/muRH4l2-zyY'
                title='YouTube video player'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div className='bg-white my-5'>
          <div className='max-w-6xl mx-auto py-10'>
            <Banner />
          </div>
        </div>

        <div className='py-10 bg-white my-5'>
          <div className='max-w-6xl mx-auto space-y-10 flex flex-col items-center'>
            <p className='text-3xl font-bold max-w-4xl text-center'>
              Kunjungi Kantor{' '}
              <span className='text-orange-500'>OCISTOK.COM</span>
            </p>

            <iframe
              className='rounded-md h-96 w-full border-none'
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.7420194991105!2d106.77859911538738!3d-6.16529286214004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f70b20d0c547%3A0xfe0aa5dbc403a910!2sOCISTOK.com%20(Pusat%20Grosir%20Online%20-%20Impor%20%26%20Lokal)%20-%201688%2C%20Taobao%2C%20Tmall%2C%20Supplier%20Indonesia!5e0!3m2!1sid!2sid!4v1645415775108!5m2!1sid!2sid'
              // width="1000"
              // height="450"
              allowFullScreen=''
              loading='lazy'
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
