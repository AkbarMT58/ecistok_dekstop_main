import React from 'react';
import { getDataInvoices } from 'constants/api/invoices';
import AlamatKantor from 'data/alamat.json';

const invoices = ({ data }) => {
 return (
    <>
      {data?.invoices?.data?.map((invoice, index) => (
        <div
          key={index}
          id='invoices'
          style={{ fontFamily: 'Poppins' }}
          className={`${index > 0 && 'mt-[29.7cm]'
            }  w-[21cm] min-h-[29.7cm] mx-auto bg-white px-[50px] py-[30px]`}
        >
          <div className='text-black font-normal text-right text-xl'>
            INVOICE
          </div>
          <div className='text-[#FE9213] font-bold text-right text-base'>
            {invoice?.id_invoice}
          </div>
          <div className='flex justify-between'>
            <div className='w-1/2'>
              <img
                className='mb-2'
                src='https://ocistok.co.id/control-panel/foto/invoice_ocistok.png'
                alt=''
                width='200'
                height='40'
              />
              <div className='space-y-1'>
                <div className='flex flex-row'>
                  <div className='text-base w-16'>Alamat</div>
                  <div className='text-base'>:</div>
                  <div className='text-base pl-1 w-[300px] font-medium capitalize line-clamp-5'>
                    {AlamatKantor[0]?.alamat}
                  </div>
                </div>
                <div className='flex flex-row'>
                  <div className='text-base w-16'>Email</div>
                  <div className='text-base'>:</div>
                  <div className='text-base pl-1 w-[250px] text-justify font-medium capitalize'>
                    info@ocistok.com
                  </div>
                </div>
                <div className='flex flex-row'>
                  <div className='text-base w-16'>Telp</div>
                  <div className='text-base'>:</div>
                  <div className='text-base pl-1 w-[250px] text-justify font-medium capitalize'>
                    021-50867088
                  </div>
                </div>
              </div>
            </div>
            <div className='w-1/2 flex justify-center items-center'>
              <div className='max-w-[250px] p-5 mx-auto'>
                <img
                  className='w-full object-contain'
                  src='https://ocistok.co.id/control-panel/foto/invoices_logo.png'
                  alt='Invoices_logo_ocistok'
                />
              </div>
            </div>
          </div>
          <div className='my-7'>
            <p className='pl-px text-base'>PENERIMA</p>
            <hr className='border-t-[2px] border-black' />
            <div className='flex justify-between mt-1'>
              <div className='w-1/2 space-y-1'>
                <div className='font-bold text-orange'>
                  {invoice?.alamat?.nama_depan +
                    ' ' +
                    invoice?.alamat?.nama_belakang}
                </div>
                <div className='font-normal'>
                  {invoice?.alamat?.alamat}
                  <br />
                  {invoice?.alamat?.provinsi +
                    ' - ' +
                    invoice?.alamat?.kecamatan}
                  <br />
                  {invoice?.alamat?.kota}
                  <br />
                  {invoice?.alamat?.kode_pos}
                </div>
                <div className='font-normal'>
                  {invoice?.alamat?.telepon.replace(/.{3}(?!$)/g, '$&-')}
                </div>
              </div>
              <div className='w-1/2 text-right mr-20'>
                <div className='font-bold'>
                  Tanggal Invoice :
                  <span className='font-normal'> {invoice?.tanggal}</span>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-7'>
            <hr className='border-t-[2px] border-black' />
            <div className='flex gap-5 my-3 mr-14'>
              <div className='text-sm font-semibold w-[10%]'>ID</div>
              <div className='text-sm font-semibold w-[35%] text-center'>
                INFO PRODUK
              </div>
              <div className='text-sm font-semibold w-[15%] text-center'>
                JUMLAH
              </div>
              <div className='text-sm font-semibold w-[20%]'>HARGA SATUAN</div>
              <div className='text-sm font-semibold w-[20%] text-center'>
                TOTAL
              </div>
            </div>
            <hr className='border-t-[2px] border-black' />

            {invoice?.produk?.map((listProduk, index) => (
              <div key={index} className='flex gap-5 py-3 mr-14 border-b'>
                <div className='text-sm font-semibold w-[10%]'>{index + 1}</div>
                <div className='flex flex-col w-[35%] capitalize'>
                  <div className='text-sm font-normal'>
                    {listProduk?.produk}
                  </div>
                  <div className='text-xs font-normal text-gray-500'>
                    {listProduk?.Variant}
                  </div>
                </div>
                <div className='text-sm font-normal w-[15%] text-center'>
                  {listProduk?.qty}
                </div>
                <div className='font-normal w-[20%]'>
                  <div className='text-sm flex justify-between'>
                    <div>Rp</div>
                    <div>{listProduk?.harga.toLocaleString('ID-id')}</div>
                  </div>
                </div>
                <div className='text-xs font-normal w-[20%]'>
                  <div className='flex justify-between'>
                    <div>Rp</div>
                    <div>
                      {(listProduk?.harga * listProduk?.qty).toLocaleString(
                        'ID-id'
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {invoice?.type !== 'ADJ' && (
              <div className='flex gap-5 my-3 mr-14'>
                <div className='text-xs font-normal w-full text-right'>
                  Harga Produk ({invoice?.total_rincian?.total_quantity} Barang)
                </div>
                <div className='text-xs font-normal w-[22%]'>
                  <div className='flex justify-between'>
                    <div>Rp</div>
                    <div>
                      {invoice?.total_rincian?.total_harga_dasar.toLocaleString(
                        'ID-id'
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {invoice?.type !== 'ADJ' && (
              <>
                <div className='flex gap-5 my-3 mr-14'>
                  <div className='text-xs font-normal w-full text-right'>
                    Biaya Layanan ({invoice?.level_diskon}%)
                  </div>
                  <div className='text-xs font-normal w-[22%]'>
                    <div className='flex justify-between'>
                      <div>Rp</div>
                      <div>
                        {invoice?.total_rincian?.biaya_layanan.toLocaleString(
                          'ID-id'
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex gap-5 my-3 mr-14'>
                  <div className='text-xs font-normal w-full text-right'>
                    Pajak (11%)
                  </div>
                  <div className='text-xs font-normal w-[22%]'>
                    <div className='flex justify-between'>
                      <div>Rp</div>
                      <div>
                        {invoice?.total_rincian?.ppn.toLocaleString('ID-id')}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex gap-5 my-3 mr-14'>
                  <div className='text-xs font-normal w-full text-right'>
                    Biaya Logistik China ke Indonesia
                  </div>
                  <div className='text-xs font-normal w-[22%]'>
                    <div className='flex justify-between'>
                      <div>Rp</div>
                      <div>
                        {invoice?.total_rincian?.ongkir_international?.toLocaleString(
                          'ID-id'
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex gap-5 my-3 mr-14'>
                  <div className='text-xs font-normal w-full text-right'>
                    Biaya logistik Indonesia
                  </div>
                  <div className='text-xs font-normal w-[22%]'>
                    <div className='flex justify-between'>
                      <div>Rp</div>
                      <div>
                        {invoice?.total_rincian?.ongkir_domestic?.toLocaleString(
                          'ID-id'
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex gap-5 my-3 mr-14'>
                  <div className='text-xs font-normal w-full text-right'>
                    Potongan Voucher
                  </div>
                  <div className='text-xs font-normal w-[22%]'>
                    <div className='flex justify-between'>
                      <div>Rp</div>
                      <div>
                        -{' '}
                        {invoice?.total_rincian?.diskon?.toLocaleString(
                          'ID-id'
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            <hr className=' border-t-[2px] max-w-[300px] ml-auto border-black' />

            <div className='flex gap-5 my-3 mr-14'>
              <div className='text-xs font-bold w-full text-right'>TOTAL</div>
              <div className='text-xs font-bold w-[22%]'>
                <div className='flex justify-between'>
                  <div>Rp</div>
                  <div>
                    {invoice?.total_rincian?.total_price.toLocaleString(
                      'ID-id'
                    )}
                  </div>
                </div>
              </div>
            </div>
            <hr className='border-t-[2px] mt-10 border-black' />

            <div className='flex flex-col mt-3 space-y-1'>
              <div>Kurir :</div>
              <div className='w-full flex justify-between'>
                {/* <div>{invoice?.}</div> */}
                <div className='capitalize'>
                  {invoice?.alamat?.kurir} - {invoice?.alamat?.service}
                </div>
                <div className='text-sm mr-14'>
                  <p className='uppercase'>
                    PT. OCOMMERCE CAPITAL INDONESIA <br />
                    KCP SUNRISE GARDEN
                  </p>
                </div>
              </div>
            </div>
            <div className='mt-10 text-orange-500 font-bold text-sm'>
              *syarat dan ketentuan berlaku
            </div>
            <hr className='border-t-[2px] max-w-[40%] border-black' />
            <div className='font-semibold text-xs'>
              Barang akan dikirim dari Gudang Jakarta, <br />
              setelah pembayaran lunas.
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default invoices;

export async function getServerSideProps({ req, params }) {
  const { id } = params;
  const res = await getDataInvoices(id);

  return {
    props: {
      data: {
        id,
        invoices: res,
      },
    },
  };
}
