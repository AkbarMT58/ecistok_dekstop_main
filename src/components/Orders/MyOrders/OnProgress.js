import formatFullDate from 'helpers/formatFullDate';
import Spinner from 'components/Global/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import ListProduct from './ListProduct';
import TrackingModal from './TrackingModal';
import RefundModal from './RefundModal';
import Link from 'next/link';
import { waConfirmation } from 'helpers/linkWa';
import Cookies from 'js-cookie';
import router from 'next/router';

export default function OnProgress({
  getMoreOrder,
  hasMore,
  loading,
  data,
  setParam,
  count,
  setCount,
  getTrackingOrder,
  tracking,
  setValueChange,
  valueChange,
  loadingTrack,
}) {
  const handleChange = (e) => {
    const { value } = e.target;
    setParam({ page: 1, type: value });
    setCount(count + 1);
    setValueChange(value);
  };

  const handleDownloadInvoices = async (id) => {
    const URL_DOWNLOAD = `https://gateway.ocistok.co.id/oci/download/invoices`;
    const tokenCookies = Cookies.get('token');
    let formData = new FormData();
    formData.append('url', `https://ocistok.com/invoices/${id}`);

    // eslint-disable-next-line no-unused-vars
    const POST = await fetch(URL_DOWNLOAD, {
      method: 'POST',
      responseType: 'blob',
      body: formData,
      headers: {
        Authorization: `Bearer ${tokenCookies}`,
      },
    })
      .then((response) => {
        return response.blob();
      })
      .then((data) => {
        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(data);
        a.download = 'ocistok_invoices';
        a.click();
      });
  };
  
  const lanjutBayar = (item) => {
    const totalQty = item.Produk.reduce((total, cur) => cur.kuantiti + total, 0)
    
    // Tiktok Pixel
    ttq.track("CompletePayment", {
      content_id: item?.id_so,
      quantity: totalQty,
      value: item?.total_harga,
      currency: "IDR",
    })

    router.push(`/payment/${item?.is_group_order === true ? 'group-' + item?.id_group : item?.id_so}`)
  }
  return (
    <div className='bg-gray-200 flex flex-col space-y-2'>
      <div className='w-full flex items-center bg-white p-2'>
        <div className='w-3/12'>
          <p className='text-sm text-gray-700'>Filter</p>
        </div>
        <div className='w-9/12'>
          <select
            onChange={handleChange}
            value={valueChange}
            className='p-1 text-sm bg-white border border-gray-300 outline-none focus:border-orange-500 focus:ring focus:ring-orange-300 rounded-md transition-all duration-300'
          >
            <option value='all'>Semua Pesanan</option>
            <option value='already-PO'>Order Baru</option>
            <option value='PO-paid'>Diproses Supplier</option>
            <option value='OTW-Whchina'>Menuju Gudang China</option>
            <option value='Repacking-Whchina'>Packing Ulang</option>
            <option value='Arrived-in-Whchina'>Tiba Digudang China</option>
            <option value='Send-To-Idn'>Dikirim ke Indonesia</option>
            <option value='OTW-Idn'>Menuju Gudang Indonesia</option>
            <option value='Arrived-Idn'>Sampai di Indonesia</option>
            <option value='Custom-Clearence'>Proses di beacukai</option>
            <option value='Arrived-Whindo'>Tiba Digudang Indonesia</option>
            <option value='Send-to-Customer'>Dikirim Ke Pembeli</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className='py-10 bg-white'>
          <Spinner label='Load data' />
        </div>
      ) : data.length > 0 ? (
        <InfiniteScroll
          className='space-y-2'
          dataLength={data.length}
          next={getMoreOrder}
          hasMore={hasMore}
          loader={
            <div className='text-center'>
              <Spinner label='load data' />
            </div>
          }
          endMessage={
            <h4 className='text-center italic p-2 text-gray-500'>
              Nothing more to show
            </h4>
          }
        >
          {data.map((item) => {
            return (
              <div key={item.id_so} className='w-full bg-white p-1'>
                <div className='flex text-xs py-1 text-gray-600 font-semibold'>
                  <div className='w-3/12'>
                    <p>
                      {item?.is_group_order === true
                        ? 'No. PESANAN GROUP'
                        : 'No. PESANAN ORDER'}
                    </p>
                  </div>
                  <div className='w-3/12'>
                    <p>
                      {item?.is_group_order === true
                        ? item?.id_group
                        : item?.id_so}
                    </p>
                  </div>
                  <div className='w-6/12 text-right'>
                    <p>{formatFullDate(item.tanggal.replace(/\s/, 'T'))}</p>
                  </div>
                </div>
                <hr />
                <ListProduct item={item} />
                <div className='flex items-center justify-between'>
                  <div className='flex text-sm space-x-1 mt-2'>
                    <p>Status Pembayaran : </p>
                    <p className='text-gray-600 capitalize font-semibold'>
                      {item.status}
                    </p>
                  </div>
                  <div className='flex text-sm space-x-1'>
                    <p>Total Pesanan : </p>
                    <p className='text-marron-500 font-semibold'>
                      Rp.{' '}
                      {(item.total_harga + item?.biaya_layanan).toLocaleString(
                        'ID-id'
                      )}{' '}
                    </p>
                  </div>
                </div>
                <hr />

                <p className='text-xs text-gray-600 font-semibold py-1'>
                  Lacak PESANAN No. GROUP :{' '}
                  {item?.is_group_order === true ? item?.id_group : item?.id_so}
                </p>
                {item?.tracking !== null ? (
                  <div className='flex mt-2 mb-3 gap-3'>
                    {item?.tracking?.map((id_so, index) => (
                      <TrackingModal
                        key={index}
                        getTrackingOrder={getTrackingOrder}
                        tracking={tracking}
                        orderData={id_so}
                        data={item}
                        date={formatFullDate(item.tanggal)}
                        loading={loadingTrack}
                      />
                    ))}
                  </div>
                ) : (
                  <TrackingModal
                    getTrackingOrder={getTrackingOrder}
                    tracking={tracking}
                    orderData={item.id_so}
                    date={formatFullDate(item.tanggal)}
                    loading={loadingTrack}
                  />
                )}

                <RefundModal
                  getTrackingOrder={getTrackingOrder}
                  tracking={tracking}
                  orderData={item}
                  date={formatFullDate(item.tanggal)}
                  loading={loadingTrack}
                />
                {item.status === 'pending' ||
                  (item.status === 'unpaid' && item.payment_type === 'manual' && (
                    <div className='text-right my-2'>
                      <Link href={waConfirmation}>
                        <a className='rounded-md bg-green-500 p-2 text-white text-xs'>
                          Hubungi Sales
                        </a>
                      </Link>
                    </div>
                  ))}
                {item.status === 'pending' && item.payment_type !== 'manual' && (
                  <div className='text-right my-2'>
                    <Link
                      href={`/checkout/${
                        item?.is_group_order === true
                          ? 'group-' + item?.id_group
                          : item?.id_so
                      }`}
                    >
                      <a className='rounded-md bg-green-500 p-2 text-white text-xs'>
                        Checkout
                      </a>
                    </Link>
                  </div>
                )}
                {item.status === 'unpaid' && item.payment_type !== 'manual' && (
                  <div className='text-right my-2'>
                    <span className='rounded-md bg-green-500 p-2 text-white text-xs' onClick={() => lanjutBayar(item)}>
                      Lanjut Bayar
                    </span>
                    {/* <Link
                      href={`/payment/${
                        item?.is_group_order === true
                          ? 'group-' + item?.id_group
                          : item?.id_so
                      }`}
                    >
                      <a className='rounded-md bg-green-500 p-2 text-white text-xs'>
                        Lanjut Bayar
                      </a>
                    </Link> */}
                  </div>
                )}
                {item?.invoice !== false && (
                  <div className='text-right my-2'>
                    <button
                      onClick={() => handleDownloadInvoices(item?.id_so)}
                      className='rounded-md bg-green-500 p-2 text-white text-xs inline-block'
                    >
                      Download Invoices
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </InfiniteScroll>
      ) : (
        <div className='pt-10 bg-white text-center'>
          <p>Pesanan tidak ditemukan</p>
        </div>
      )}
    </div>
  );
}
