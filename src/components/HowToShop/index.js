import { BannerTerintegrasi } from 'components/Global/GlobalBanner';
import React, { useState } from 'react';

const index = () => {
  const [tutorialData] = useState([
    {
      id: 1,
      desc: 'Setelah login member, <br> Customer dapat <span class="text-gray-500">mencari <br> produk</span> yang diinginkan <br> melalui fitur <span class="text-orange-500">“Search”</span> di <br> kolom atas',
      img: 'CaraBelanja-1.png',
    },
    {
      id: 2,
      desc: 'Lalu tampil hasil pencarian yang telah <br> kita search sebelumnya ',
      img: 'CaraBelanja-2.png',
    },
    {
      id: 3,
      desc: 'Setelah memilih produk, <br>lihat detail produk dan <br> varian pada link tersebut.',
      img: 'CaraBelanja-3.png',
    },
    {
      id: 4,
      desc: 'Pilih varian produk serta kuantiti <span class="text-gray-500"> yang diinginkan, lalu klik Hitungkan Harga”</span>',
      img: 'CaraBelanja-4.png',
    },
    {
      id: 5,
      desc: '<span class="text-gray-500"><span class="text-orange-500">Pengajuan Inquiry Berhasil</span> Produk akan masuk dalam system.</span>',
      img: 'CaraBelanja-5.png',
    },
    {
      id: 6,
      desc: '<span class="text-black">Tim Ocistok akan segera menghitungkan harga ALL IN <span class="text-gray-500">dari produk tersebut dengan estimasi waktu</span> 2x24 jam.</span>',
      img: 'CaraBelanja-6.png',
    },
    {
      id: 7,
      desc: 'Customer akan mendapatkan notifikasi via email jika harga produk selesai dihitungkan ALL-IN.',
      img: 'CaraBelanja-8.png',
    },
    {
      id: 8,
      desc: '<span class="text-black">Masuk ke Keranjang > Pengajuan saya dan pilih <span class="text-orange-500">“Tunggu Pembayaran”</span> untuk melihat daftar produk yang telah di hitungkan ALL-IN </span >',
      img: 'CaraBelanja-9.png',
    },
    {
      id: 9,
      desc: 'Isi jumlah produk setiap varian <span class="text-gray-500">yang ingin anda checkout.</span>',
      img: 'CaraBelanja-10.png',
    },
    {
      id: 10,
      desc: 'Pilih metode pengiriman CHN-IDN via laut atau udara <span class="text-gray-500">sesuai yang diinginkan.</span>',
      img: 'CaraBelanja-11.png',
    },
    {
      id: 11,
      desc: 'Lengkapi alamat pengiriman dan pilih ekspedisi lokal yang <span class="text-gray-500">akan digunakan untuk mengirim ke alamat anda.</span>',
      img: 'CaraBelanja-12.png',
    },
    {
      id: 12,
      desc: 'Memilih metode pembayaran yang tersedia, Setelah itu tekan “Bayar”',
      img: 'CaraBelanja-12.png',
    },
    {
      id: 13,
      desc: 'Customer menyelesaikan pembayaran <span class="text-gray-500">pada merchant yang telah dipilih sebelumnya.</span>',
      img: 'CaraBelanja-13.png',
    },
    {
      id: 14,
      desc: '<Span class="text-gray-500">Setelah menyelesaikan pembayaran,</Span> customer dapat melihat update status pesanan <span class="text-gray-500">pada kolom </span><span class="text-orange-500">”Pesanan Saya”.</span>',
      img: 'CaraBelanja-14.png',
    },
  ]);

  return (
    <div className='py-10 bg-white mt-10'>
      <div className='flex items-center justify-center mb-10'>
        <iframe
          className='shadow-2xl'
          width='640'
          height='360'
          src='https://www.youtube.com/embed/uw9W6nILg-I'
          title='Cara Order Barang Di Ocistok'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      </div>
      <div className='grid grid-cols-2 gap-y-12 justify-items-center'>
        {tutorialData.map((i) => {
          return (
            <div
              key={i.id}
              className='relative border border-black bg-white rounded-xl h-[700px] w-[500px] shadow-2xl'
            >
              <div className='flex flex-col items-center'>
                <div className='absolute -top-9'>
                  <div className='flex items-center justify-center bg-orange-500 w-16 h-16 rounded-full font-bold text-xl'>
                    {i.id}
                  </div>
                </div>
              </div>
              <div className='grid '>
                <div className='w-7/12 h-52 flex items-center m-auto mt-5'>
                  <div
                    className='font-bold text-center leading-6 text-[25px]'
                    dangerouslySetInnerHTML={{ __html: i.desc }}
                  />
                </div>
                <img className='px-5 max-h-[450px] h-auto w-full' src={i.img} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default index;
