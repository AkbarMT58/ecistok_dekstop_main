export default function RefundPolicy() {
  return (
    <>
      <div className='flex flex-col mt-10 bg-white rounded xl p-8'>
        <div className='w-full'>
          <h1 className='text-3xl font-bold text-gray-700 text-center'>
            Kebijakan Refund
          </h1>
        </div>
        <div className='w-full mt-10'>
          <h2 className='text-lg font-bold text-gray-500'>
            SYARAT & KETENTUAN MENGAJUKAN KOMPLAIN
          </h2>
          <ol
            className='mt-3 flex flex-col space-y-3 text-justify ml-4 text-gray-600'
            style={{ listStyleType: 'decimal' }}
          >
            <li>
              Kondisi packing dari barang yang dipesan Pembeli akan diperiksa dan dikirim oleh pihak Cina ke Indonesia dengan keadaan baik.
            </li>
            <li>
              Pembeli WAJIB untuk membuat video unboxing dari paket yang diterima sebagai bukti apabila ingin mengajukan komplain ke pihak OCISTOK. Video unboxing mencakup proses membuka paket yang dimulai dari saat paket masih terbungkus, proses menghitung jumlah barang, serta proses pengecekan kondisi barang. Video yang dikirim tidak boleh berupa gabungan dari potongan beberapa video, melainkan 1 video selama proses unboxing tanpa ada jeda.
            </li>
            <li>
              Untuk komplain dengan alasan barang rusak, Pembeli WAJIB melampirkan foto kondisi barang tersebut.
            </li>
            <li>
              OCISTOK tidak bertanggung jawab apabila terdapat barang yang rusak/pecah karena pengiriman ekspedisi. Namun, OCISTOK dapat membantu proses klaim ke ekspedisi.
            </li>
            <li>
              Pengembalian hanya dapat dilakukan dalam bentuk uang. Hal ini tidak berlaku dalam bentuk penggantian barang ke Pembeli.
            </li>
            <li>
              Komplain paling lama diterima 2 x 24 jam setelah pesanan diterima oleh Pembeli.
            </li>
            <li>
              Proses pengembalian dana (refund) maksimal dilakukan selama 7 hari kerja terhitung sejak refund diajukan. Waktu estimasi bisa lebih lama untuk beberapa kasus tertentu.
            </li>
            <li>
              Pengembalian dana akan dilakukan paling lama dalam waktu 2 hari kerja terhitung sejak pengajuan disetujui.
            </li>
            <li>
              Pengembalian dana dapat dilakukan apabila total kerusakan barang mencapai 1% dari total pesanan Pembeli pada satu nomor pembelian. 
            </li>
            <li>
              Biaya admin, pajak, dan/atau biaya tambahan lain yang telah dibayarkan oleh Pembeli tidak termasuk dalam nominal pengembalian dana.
            </li>
            <li>
              OCISTOK tidak dapat menerima pengajuan pengembalian dana dengan alasan barang tidak sesuai dan/atau barang tidak berfungsi. Karena kualitas produk merupakan tanggung jawab dari supplier, bukan tanggung jawab OCISTOK sebagai jasa perantara antara supplier dan Pembeli. OCISTOK hanya dapat membantu melakukan klaim ke pihak supplier.
            </li>
          </ol>
          <h2 className='text-lg font-bold text-gray-500 mt-4'>
            FORCE MAJEURE
          </h2>
          <ol
            className='mt-3 flex flex-col space-y-3 text-justify ml-4 text-gray-600'
            style={{ listStyleType: 'decimal' }}
          >
            <li>OCISTOK tidak bertanggung jawab kepada Pembeli apabila terdapat pelanggaran, hambatan atau keterlambatan yang disebabkan oleh keadaan tertentu yang berada di luar kendali kami, termasuk namun tidak terbatas pada:
              <ul
                className='ml-6 flex flex-col space-y-3'
                style={{ listStyleType: 'disc' }}
              >
                <li>Pemogokan, lock-out atau tindakan industrial lainnya.</li>
                <li>Keributan sipil, kerusuhan, invasi, serangan/ancaman serangan teroris, perang (baik dinyatakan atau tidak) serta ancaman atau persiapan untuk perang.</li>
                <li>Kebakaran, ledakan, badai, banjir, gempa bumi, longsor, wabah atau bencana alam lainnya.</li>
                <li>Pembatasan atau  tidak dapat digunakannya kereta api, pesawat pengirim, alat transportasi bermotor atau alat transportasi lainnya baik publik maupun swasta.</li>
                <li>Keterbatasan atau tidak dapat digunakannya jaringan telekomunikasi publik maupun swasta</li>
                <li>Adanya tindakan, keputusan, undang-undang, peraturan atau pembatasan dari pemerintah, aksi mogok transportasi lain yang berkaitan.</li>
                <li>Situasi lockdown karena pandemi yang diberlakukan di Cina</li>
              </ul>
            </li>
            <li>Apabila Force Majeure berlangsung selama lebih dari satu minggu, Pembeli atau OCISTOK dapat membatalkan pesanan melalui pemberitahuan tertulis dan melakukan pengembalian uang yang sudah Pembeli bayar namun belum dilakukan pemesanan oleh pihak OCISTOK.</li>
          </ol>
          <h2 className='text-lg font-bold text-gray-500 mt-4'>
            KOMPLAIN TIDAK DAPAT DITERIMA JIKA:
          </h2>
          <ol
            className='mt-3 flex flex-col space-y-3 text-justify ml-4 text-gray-600'
            style={{ listStyleType: 'decimal' }}
          >
            <li>Tidak terdapat lampiran bukti video unboxing dari Pembeli.</li>
            <li>Tidak terdapat lampiran bukti foto dari barang yang dikomplain.</li>
            <li>Komplain diajukan setelah 2 x 24 jam pesanan diterima oleh Pembeli.</li>
            <li>Terdapat kerusakan pada paket selama proses pengiriman yang disebabkan oleh ekspedisi.</li>
            <li>Video unboxing yang diberikan oleh Pembeli memiliki lebih dari satu bagian dan/atau terdapat jeda/potongan pada video yang diberikan.</li>
            <li>Video unboxing tidak memperlihatkan nomor pesanan dan juga resi pengiriman.</li>
          </ol>
          <h2 className='text-lg font-bold text-gray-500 mt-4'>
            KOMPLAIN DAPAT DITERIMA JIKA:
          </h2>
          <ol
            className='mt-3 flex flex-col space-y-3 text-justify ml-4 text-gray-600'
            style={{ listStyleType: 'decimal' }}
          >
            <li>Pembeli melampirkan video unboxing yang memenuhi syarat yang telah ditentukan.</li>
            <li>Pembeli melampirkan bukti foto dari barang yang dikomplain.</li>
            <li>Komplain diajukan sebelum 2 x 24 jam pesanan diterima oleh Pembeli.</li>
            <li>Terdapat kerusakan, kesalahan, dan/atau kekurangan pada produk yang dipesan oleh Pembeli pada saat pesanan tiba di gudang OCISTOK Jakarta.</li>
            <li>Pesanan belum tiba setelah 100 hari yang terhitung dari hari pertama Pembeli melakukan pembayaran di OCISTOK.</li>
            <li>Video unboxing memperlihatkan nomor pesanan dan juga resi pengiriman.</li>
          </ol>
          <h2 className='text-lg font-bold text-gray-500 mt-4'>
            CARA MENGAJUKAN KOMPLAIN
          </h2>
          <ol
            className='mt-3 flex flex-col space-y-3 text-justify ml-4 text-gray-600'
            style={{ listStyleType: 'decimal' }}
          >
            <li>Membuat video unboxing produk.</li>
            <li>Menghubungi Customer Service OCISTOK untuk mengajukan komplain dengan menyebutkan nomor pesanan serta lampiran video unboxing.</li>
            <li>Komplain tersebut akan dianalisa oleh pihak OCISTOK dalam jangka waktu 7 hari kerja.</li>
          </ol>
        </div>
        <div className='w-full mt-10'>
          <h1 className='text-xl text-gray-500 font-bold'>TERIMA KASIH</h1>
          <p className='text-md text-gray-500 mt-3'>
            Informasi lebih lanjut dapat hubungi kami: <br />
            OCISTOK.COM
            <br /> PUSAT GROSIR ONLINE
          </p>
          <p className='text-md text-gray-500 mt-3'>
            email: info@ocistok.com
            <br />
            whatsapp: +62 812 1000 1808
          </p>
        </div>
      </div>
    </>
  );
}
