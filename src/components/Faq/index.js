import { Disclosure } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';

export default function Faq() {
  return (
    <>
      <div className='flex flex-col mt-10 mb-24 bg-white rounded xl p-8'>
        <div className='w-full'>
          <h1 className='text-xl font-bold text-gray-700 text-center'>
            FAQ - Frequently Asked Question
          </h1>
        </div>
        <div className='w-full px-4 pt-8'>
          <div className='w-full max-w-md p-2 mx-auto bg-white rounded-2xl'>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className='flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-orange-700 bg-orange-200 rounded-lg hover:bg-orange-400 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
                    <span>Tentang Kami</span>
                  </Disclosure.Button>
                  <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
                    <p className='text-xs font-bold text-gray-700'>
                      Apa Itu OCISTOK.Com
                    </p>
                    <p className='text-xs text-gray-700'>
                      OCISTOK.com adalah platform belanja import China, dimana
                      Customer bisa langsung mencari dan memilih barang dari
                      Pabrik & Supplier China Tangan Pertama di website
                      OCISTOK.com. Belanja import di OCISTOK.com semudah di
                      Marketplace.
                    </p>
                    <p className='text-xs font-bold text-gray-700 mt-3'>
                      Bagaimana Proses Pemesanan Di Ocistok?
                    </p>
                    <ol
                      className='mt-3 flex flex-col space-y-3 text-justify ml-4 text-xs text-gray-700'
                      style={{ listStyleType: 'decimal' }}
                    >
                      <li>Cari dan pilih barang di Website OCISTOK.com</li>
                      <li>
                        Masukkan varian dan kuantiti barang, lalu klik tombol
                        “Hitungkan Harga”. Tim OCISTOK.com akan menghitungkan
                        harga ALL IN barang tersebut dalam waktu maksimal 2 x 24
                        jam
                      </li>
                      <li>
                        Setelah harga barang dihitungkan, Customer dapat
                        melakukan Checkout barang dan menyelesaikan pembayaran
                      </li>
                      <li>Tunggu barang sampai ke alamat tujuan anda.</li>
                    </ol>
                    <p className='text-xs text-gray-700 mt-3'>
                      Untuk informasi detail mengenai cara order, dapat dilihat
                      di sini :{' '}
                      <a
                        href='https://www.youtube.com/watch?v=uw9W6nILg-I&t=1s'
                        className='text-orange-500'
                      >
                        https://www.youtube.com/watch?v=uw9W6nILg-I&t=1s
                      </a>
                    </p>
                    <p className='text-xs font-bold text-gray-700 mt-3'>
                      Berapakah Minimal Order di OCISTOK.com?
                    </p>
                    <p className='text-xs text-gray-700'>
                      OCISTOK.com adalah platform belanja grosir import untuk
                      usaha, maka dari itu minimal pembelanjaan adalah 1 juta
                      rupiah.
                    </p>
                    <p className='text-xs font-bold text-gray-700 mt-3'>
                      Apakah Ada Biaya Member Untuk Mendaftar di OCISTOK.com?
                    </p>
                    <p className='text-xs text-gray-700'>
                      Tidak ada biaya member alias GRATIS ketika mendaftar di
                      OCISTOK.com
                    </p>
                    <p className='text-xs font-bold text-gray-700 mt-3'>
                      Apakah Ada Biaya Bea Cukai, Pajak, serta Pengurusan
                      Dokumen Import?
                    </p>
                    <p className='text-xs text-gray-700'>
                      di OCISTOK.com semuanya dihitungkan ALL IN sampai alamat
                      tujuan customer termasuk pengurusan dokumen import, bea
                      cukai, dll. Customer dapat langsung mencari barang di
                      website {'-->'} menekan tombol "Hitungkan harga" {'-->'}{' '}
                      setelah harga dihitungkan ALL IN oleh tim OCISTOK.com
                      Customer dapat melakukan check out dan pembayaran.
                    </p>
                    <p className='text-xs font-bold text-gray-700 mt-3'>
                      Dimanakah Kantor Ocistok?
                    </p>
                    <p className='text-xs text-gray-700'>
                      Gedung Wisma IWI Jl. Arjuna Sel. No.75, Lt. 7, RT.2/RW.12,
                      Kb. Jeruk, Kec. Kb. Jeruk, Kota Jakarta Barat, Daerah
                      Khusus Ibukota Jakarta 11530
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure as='div' className='mt-2'>
              {({ open }) => (
                <>
                  <Disclosure.Button className='flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-orange-700 bg-orange-200 rounded-lg hover:bg-orange-400 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
                    <span>Pengiriman</span>
                  </Disclosure.Button>
                  <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
                    <p className='text-xs font-bold text-gray-700 mt-3'>
                      Berapa Lama Barang Sampai Indonesia ?
                    </p>
                    <p className='text-xs text-gray-700'>
                      Estimasi paling cepat adalah 4 - 6 minggu (working hour
                      senin - jumat) barang akan tiba di Jakarta jika tidak ada
                      kendala shipment pending yang dikarenakan hari-hari besar
                      di China ataupun penuhnya proses pengecekan di Bea Cukai.
                    </p>
                    <p className='text-xs font-bold text-gray-700 mt-3'>
                      Apa Saja Barang Yang Boleh Dikirim Oleh Ocistok?
                    </p>
                    <p className='text-xs text-gray-700'>
                      Hampir semua barang bisa diimport, kecuali larangan
                      terbatas dari Pemerintah ataupun produk yang membutuhkan
                      izin khusus seperti: Import tanaman, hewan, cairan kimia,
                      kosmetik, handphone, laptop dan lain sebagainya.
                    </p>
                    <p className='text-xs font-bold text-gray-700 mt-3'>
                      Berapa Lama Durasi Pengiriman Barang?
                    </p>
                    <p className='text-xs text-gray-700'>
                      Estimasi sejak customer melakukan order di website adalah
                      3 - 5 minggu (working hour senin - jumat) berikut dengan
                      proses pemeriksaan barang di Bea Cukai. Lama atau cepatnya
                      proses tergantung volume atau banyaknya barang yg antri di
                      Bea Cukai.
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure as='div' className='mt-2'>
              {({ open }) => (
                <>
                  <Disclosure.Button className='flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-orange-700 bg-orange-200 rounded-lg hover:bg-orange-400 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
                    <span>Ketentuan Refund</span>
                  </Disclosure.Button>
                  <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
                    <p className='text-xs font-bold text-gray-700 mt-3'>
                      Apakah Produk Bisa Diretur / Refund ?
                    </p>
                    <p className='text-xs text-gray-700'>
                      Produk yang sudah dipesan dan dibayar pada umumnya tidak
                      dapat direfund, namun ada beberapa pengecualian seperti
                      kurangnya jumlah barang pesanan ataupun barang rusak akan
                      diperbolehkan untuk dilakukan refund dengan syarat dan
                      ketentuan yang berlaku. Untuk detail proses refund dapat
                      dilihan di sini :{' '}
                      <Link href='/refund-policy' passHref={true}>
                        <a className='text-orange-500'>
                          https://ocistok.com/refund-policy
                        </a>
                      </Link>
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure as='div' className='mt-2'>
              {({ open }) => (
                <>
                  <Disclosure.Button className='flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-orange-700 bg-orange-200 rounded-lg hover:bg-orange-400 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
                    <span>Pembayaran</span>
                  </Disclosure.Button>
                  <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
                    <p className='text-xs font-bold text-gray-700 mt-3'>
                      Apa Saja Metode Pembayaran di OCISTOK.com?
                    </p>
                    <p className='text-xs text-gray-700'>
                      Pembayaran dapat dilakukan melalui website dan platform
                      pembayaran kami yang telah didukung oleh MIDTRANS. Dapat
                      melalui Transfer Bank, Virtual Account, Alfamart &
                      Alfamidi, Gopay, dan masih banyak lagi. Pastikan Untuk
                      Selalu Konfirmasi Ke Official WhatsApp Ocistok di
                      0812-1000-1808 (Centang Hijau) sebelum melakukan
                      transaksi.
                    </p>
                    <p className='text-xs font-bold text-gray-700 mt-3'>
                      Berapakah Minimal Order di OCISTOK.com?
                    </p>
                    <p className='text-xs text-gray-700'>
                      OCISTOK.com adalah platform belanja grosir import untuk
                      usaha, maka dari itu minimal pembelanjaan adalah 1 juta
                      rupiah.
                    </p>
                    <p className='text-xs font-bold text-gray-700 mt-3'>
                      Bagaimana Dengan Perhitungan Ongkos Kirim Dan Pajak Di
                      Ocistok?
                    </p>
                    <p className='text-xs text-gray-700'>
                      di OCISTOK.com semuanya dihitungkan ALL IN sampai alamat
                      tujuan customer termasuk pengurusan dokumen import, bea
                      cukai, dll. Customer dapat langsung mencari barang di
                      website {'-->'} menekan tombol "Hitungkan harga" {'-->'}{' '}
                      setelah harga dihitungkan ALL IN oleh tim OCISTOK.com
                      Customer dapat melakukan check out dan pembayaran.
                    </p>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure as='div' className='mt-2'>
              {({ open }) => (
                <>
                  <Disclosure.Button className='flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-orange-700 bg-orange-200 rounded-lg hover:bg-orange-400 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
                    <span>Lainnya</span>
                  </Disclosure.Button>
                  <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
                    <p className='text-xs font-bold text-gray-700 mt-3'>
                      Apa Saja Kendala Yang Dapat Menghambat Pengiriman Barang
                      Dari China Ke Indonesia?
                    </p>
                    <p className='text-xs text-gray-700'>
                      Memakan waktu pengiriman yang lama (Di dalam bisnis impor,
                      ada beberapa faktor yang mempengaruhi keterlambatan dalam
                      pengiriman barang seperti;
                    </p>
                    <ol
                      className='mt-3 flex flex-col space-y-3 text-justify ml-4 text-xs text-gray-700'
                      style={{ listStyleType: 'lower-alpha' }}
                    >
                      <li>
                        Adanya shipment pending dikarenakan hari libur di China
                      </li>
                      <li>
                        Ketatnya proses clearance di Bea Cukai di Indonesia
                      </li>
                      <li>
                        Gudang warehouse pengiriman barang penuh / overload
                      </li>
                      <li>
                        Tidak tersedianya slot untuk pengiriman (pengiriman
                        barang di China memiliki slot tertentu secara laut
                        maupun udara)
                      </li>
                    </ol>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure as='div' className='mt-2'>
              {({ open }) => (
                <>
                  <Disclosure.Button className='flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-orange-700 bg-orange-200 rounded-lg hover:bg-orange-400 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
                    <span>Fakta Impor</span>
                  </Disclosure.Button>
                  <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
                    <p className='text-xs font-bold text-gray-700 mt-3'>
                      Fakta-Fakta Menarik Terkait Bisnis Barang Impor
                    </p>
                    <p className='text-xs text-gray-700 font-bold mt-2'>
                      Kelebihan Barang Impor
                    </p>
                    <ul
                      className='ml-6 flex flex-col space-y-3'
                      style={{ listStyleType: 'disc' }}
                    >
                      <li>
                        Produk Unik (China merupakan salah satu destinasi impor
                        yang paling banyak digemari oleh masyarakat Indonesia
                        dikarenakan negeri Tiongkok tersebut memproduksi banyak
                        barang unik untuk berbagai kebutuhan masyarakat
                        sehari-hari. Hampir mirip dengan negara Jepang, China
                        juga sering membuat inovasi produk baru dalam
                        produksinya.)
                      </li>
                      <li>
                        Harga Murah (Harga barang dari China relative sangat
                        murah sehingga dapat dijadikan sebagai peluang bisnis
                        untuk dijual kembali)
                      </li>
                      <li>
                        Produk terlengkap (China juga menyediakan berbagai jenis
                        barang maka dari itu hampir semua barang di berbagai
                        negara disupply oleh China)
                      </li>
                    </ul>
                    <p className='text-xs text-gray-700 font-bold mt-2'>
                      Kelemahan Import
                    </p>
                    <p className='text-xs text-gray-700'>
                      Memakan waktu pengiriman yang lama (Di dalam bisnis impor,
                      ada beberapa faktor yang mempengaruhi keterlambatan dalam
                      pengiriman barang seperti:
                    </p>
                    <ul
                      className='ml-6 flex flex-col space-y-3'
                      style={{ listStyleType: 'disc' }}
                    >
                      <li>
                        Adanya shipment pending dikarenakan hari libur di China
                      </li>
                      <li>
                        Ketatnya proses clearance di Bea Cukai di Indonesia
                      </li>
                      <li>
                        Gudang warehouse pengiriman barang penuh / overload
                      </li>
                      <li>
                        Tidak tersedianya slot untuk pengiriman (pengiriman
                        barang di China memiliki slot tertentu secara laut
                        maupun udara)
                      </li>
                    </ul>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
        <div className='w-full bg-white my-5'>
          <h2 className='text-lg text-center text-gray-700'>
            Ada Pertanyaaan?
          </h2>
          <p className='text-sm mt-3 text-center text-gray-700'>
            Jika masih belum menemukan jawaban dari pertanyaan diatas. Silahkan
            Hubungi Kami:
          </p>
          <div className='flex mt-5'>
            <div className='w-6/12 text-center'>
              <Image
                src='/icons/phone-solid.svg'
                width={80}
                height={30}
                alt='jasa import barang dari china'
              />
              <h2 className='text-sm font-bold text-gray-600'>
                Customer Support
              </h2>
              <p className='text-xs text-gray-500'>+62 812 1000 1808</p>
            </div>
            <div className='w-6/12 text-center'>
              <Image
                src='/icons/envelope-regular.svg'
                width={80}
                height={30}
                alt='jasa import barang dari china'
              />
              <h2 className='text-sm font-bold text-gray-600'>Kirim Pesan</h2>
              <p className='text-xs text-gray-500'>info@ocistok.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
