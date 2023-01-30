import React from "react";

import { getDataInvoices_Report } from 'constants/api/report';
import AlamatKantor from 'data/alamat.json';
import dateFormat from 'dateformat';


const PDFFile = ({data}) => {
  return (
    <>
      <div id="report">
        <section style={{ width:"595px",height: "842px",padding: "5px",background:"white"}} >
        {data?.invoices?.data?.map((invoice, index) => (

        <div key={index}
            id='invoices'
            style={{ fontFamily: 'Poppins' }}
            className={`
            mx-auto bg-white px-[10px] py-[30px]`}
          >
          <div className='font-normal' style={{marginLeft:'380px',fontSize:"10px"}}>
            INVOICE
          </div>
          <div className='text-[#FE9213] font-bold' style={{marginLeft:'335px',fontSize:"10px"}}>
            {invoice?.id_invoice} 
          </div>
          <div className='flex justify-between'>
            <div className='w-1/2'>
              <div style={{marginLeft:"10px"}}>
              <img
                className='mb-2'
                src='/OCISTOK.jpg'
                alt=''
                width='100'
                height='40'
              />
              </div>
              <div className='space-x-1' style={{marginLeft:"10px"}}>
                <div className='flex flex-row'>
                  <div className='w-16'  style={{fontSize:'10px'}}>Alamat</div>
                  <div className='text-xs'>:</div>
                  <div className='pl-1 w-[300px] font-small capitalize line-clamp-7' style={{fontSize:'10px'}} >
                    {AlamatKantor[0]?.alamat}
                  </div>
                </div>
                <div className='flex flex-row'>
                  <div className='text-xs w-16' style={{fontSize:'10px'}}>Email</div>
                  <div className='text-xs' style={{marginLeft:'-15px'}}>:</div>
                  <div className='text-xs pl-1 w-[250px] text-justify font-medium capitalize' style={{fontSize:'10px'}}>
                    info@ocistok.com
                  </div>
                </div>
                <div className='flex flex-row'>
                  <div className='text-xs w-16' style={{fontSize:'10px'}}>Telp</div>
                  <div className='text-xs' style={{marginLeft:'-15px'}}>:</div>
                  <div className='text-xs pl-1 w-[250px] text-justify font-medium capitalize' style={{fontSize:'10px'}}>
                    021-50867088
                  </div>
                </div>
              </div>
            </div>
            <div className='w-1/2' >
              <div className='max-w-[200px] p-5 mx-auto' style={{marginLeft:'-20px'}}>
                <img
                  className='w-full object-contain'
                  src='/logo_ocistok_fin.jpg'
                  alt='Invoices_logo_ocistok'
                  style={{width:'100px',height:'80x'}}
                />
              </div>
            </div>
          </div>
          <div className='my-6'>
            <p className='text-base' style={{fontSize:'10px',marginLeft:'10px'}}>PENERIMA</p>
            
            <hr className='border-black' style={{margin:'10px', width:'400px'}} />
            <div className='flex justify-between mt-1'>
              <div className='w-1/2 space-y-1' style={{marginLeft:"10px"}}>
                <div className='font-bold text-orange' style={{fontSize:"10px"}}>
                  {invoice?.alamat?.nama_depan +
                    ' ' +
                    invoice?.alamat?.nama_belakang}
                </div>
                <div className='font-normal' style={{fontSize:"10px"}}>
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
                <div className='font-normal' style={{fontSize:"10px"}}>
                  {invoice?.alamat?.telepon.replace(/.{3}(?!$)/g, '$&-')}
                </div>
              </div>
              <div className='w-1/2' style={{margin:'10px'}}>
                <div className='font-bold' style={{fontSize:'10px',marginLeft:'-10px',marginTop:'-10px'}}>
                  Tanggal Invoice:
                  <span className='font-normal'> 

                 
                  
                  <div style={{marginTop:"5px",marginLeft:"0px"}}>{ dateFormat(invoice?.tanggal, "dd-mm-yyyy hh:mm:ss") }</div>
                  
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-7'>
          <hr className="border-black" style={{margin:'10px', width:'400px'}} />
            <div className='flex gap-5 my-3 mr-14'>
              <div className='font-semibold w-[10%]' style={{marginLeft:'10px',fontSize:'9px'}}>ID</div>
              <div className='font-semibold ' style={{marginLeft:'-10px',fontSize:'9px'}}>
                INFO PRODUK
              </div>
              <div className='font-semibold w-[15%] text-center' style={{fontSize:'9px'}}>
                JUMLAH
              </div>
              <div className='font-semibold w-[20%]' style={{fontSize:'9px'}}>HARGA SATUAN</div>
              <div className='font-semibold w-[20%] text-center' style={{fontSize:'9px', marginLeft:'-60px'}}>
                TOTAL
              </div>
            </div>
            <hr className='border-black' style={{margin:'10px', width:'400px'}} />

            {invoice?.produk?.map((listProduk, index) => (
              <div key={index}  className='flex gap-5 py-1 mr-14 border-b' style={{ pageBreakBefore:'avoid' }} >
                <div className='font-semibold w-[10%]' style={{marginLeft:"8px",fontSize:"9px"}}>{index + 1}</div>
                <div className='flex flex-col w-[20%] capitalize'>
                  <div className='text-bs font-normal' style={{fontSize:"8px",marginLeft:"-20px"}}>
                    {listProduk?.produk}
                  </div>
                  <div className='font-normal text-gray-500' style={{fontSize:"10px"}}>
                    {listProduk?.Variant}
                  </div>
                </div>
                <div className='font-normal w-[15%] text-center' style={{fontSize:"10px",marginLeft:"-50px"}}>
                  {listProduk?.qty}
                </div>
                <div className='font-normal w-[20%]'>
                  <div className='text-sm flex' style={{marginLeft:'100px',fontSize:'10px'}}>
                    <div style={{marginLeft:"-20px"}} >Rp</div>
                        <div style={{marginLeft:"20px"}}>
                          {listProduk?.harga.toLocaleString('ID-id')}
                          
                          </div>
                  </div>
                </div>
                <div className='text-xs font-normal w-[20%]'>
                  <div className='flex' style={{marginLeft:'-125px',fontSize:'10px'}}>
                    <div style={{marginLeft:"-20px"}}>Rp </div>
                    <div style={{marginLeft:"20px"}}>
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
                <div className='font-normal w-full text-right' style={{fontSize:'9px', marginLeft:'-200px'}}>
                  Harga Produk (
                    {invoice?.total_rincian?.total_quantity} 
                    
                    Barang)
                </div>
                <div className='text-xs font-normal w-[22%]'>
                  <div className='flex' style={{marginLeft:'-10px',fontSize:'9px'}}>
                    <div >Rp </div>
                    <div style={{marginLeft:"38px"}}>
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
                  <div className='font-normal w-full text-right'  style={{fontSize:'9px', marginLeft:'-200px'}}>
                    Biaya Layanan 
                    
                    ({invoice?.level_diskon}%)
                  </div>
                  <div className='text-xs font-normal w-[22%]'>
                    <div className='flex' style={{marginLeft:'-10px',fontSize:'9px'}}>
                      <div>Rp</div>
                      <div style={{marginLeft:"38px"}}>
                        {invoice?.total_rincian?.biaya_layanan.toLocaleString(
                          'ID-id'
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex gap-5 my-3 mr-14'>
                  <div className='font-normal w-full text-right'  style={{fontSize:'9px', marginLeft:'-200px'}}>
                    Pajak (11%)
                  </div>
                  <div className='text-xs font-normal w-[22%]'>
                    <div className='flex' style={{marginLeft:'-10px' ,fontSize:'9px'}}>
                      <div>Rp</div>
                      <div style={{marginLeft:"38px"}}>
                        {invoice?.total_rincian?.ppn.toLocaleString('ID-id')}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex gap-5 my-3 mr-14'>
                  <div className='font-normal w-full text-right'  style={{fontSize:'9px', marginLeft:'-200px'}}>
                    Biaya Logistik China ke Indonesia
                  </div>
                  <div className='text-xs font-normal w-[22%]'>
                    <div className='flex' style={{marginLeft:'-10px' ,fontSize:'9px'}}>
                      <div>Rp</div>
                      <div style={{marginLeft:"38px"}}>
                        {invoice?.total_rincian?.ongkir_international?.toLocaleString(
                          'ID-id'
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex gap-5 my-3 mr-14'>
                  <div className='font-normal w-full text-right'  style={{fontSize:'9px', marginLeft:'-200px'}}>
                    Biaya logistik Indonesia
                  </div>
                  <div className='text-xs font-normal w-[22%]'>
                    <div className='flex' style={{marginLeft:'-10px' ,fontSize:'9px'}}>
                      <div>Rp</div>
                      <div style={{marginLeft:"38px"}}>
                        {invoice?.total_rincian?.ongkir_domestic?.toLocaleString(
                          'ID-id'
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex gap-5 my-3 mr-14'>
                  <div className='font-normal w-full text-right'  style={{fontSize:'9px', marginLeft:'-200px'}}>
                    Potongan Voucher
                  </div>
                  <div className='text-xs font-normal w-[22%]'>
                    <div className='flex' style={{marginLeft:'-10px' ,fontSize:'9px'}}>
                      <div>Rp</div>
                      <div style={{marginLeft:"38px"}}>
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
            <hr className=' border-t-[2px] max-w-[300px] ml-auto border-black' style={{marginLeft:'110px'}} />

            <div className='flex gap-5 my-3 mr-14'>
              <div className='text-xs font-bold w-full text-right' style={{marginLeft:"-200px",fontSize:'10px'}} >TOTAL</div>
              <div className='text-xs font-bold w-[22%]'>
                <div className='flex' style={{marginLeft:'-10px' ,fontSize:'10px'}}>
                  <div>Rp</div>
                  <div style={{marginLeft:"38px"}}>
                    {invoice?.total_rincian?.total_price.toLocaleString(
                      'ID-id'
                    )}
                  </div>
                </div>
              </div>
            </div>
            <hr className='border-black' style={{margin:'10px', width:'400px'}} />

            <div className='flex flex-col mt-3 space-y-1'>
              <div style={{fontSize:'10px'}}>Kurir :</div>
              <div className='w-full flex justify-between'>
                {/* <div>{invoice?.}</div> */}
                <div className='capitalize' style={{fontSize:"10px"}}>
                  {invoice?.alamat?.kurir} - {invoice?.alamat?.service}
                </div>
                <div className='text-sm mr-14'  style={{fontSize:'10px',marginRight:'150px'}}>
                  <p className='uppercase'>
                    PT. OCOMMERCE CAPITAL INDONESIA <br />
                    KCP SUNRISE GARDEN
                  </p>
                </div>
              </div>
            </div>
            <div className='mt-10 text-orange-500 font-bold text-sm' style={{fontSize:'9px'}}>
              *syarat dan ketentuan berlaku
            </div>
            <hr className='border-black' style={{marginTop:'10px',width:'300px'}}  />
            <div className='font-semibold' style={{fontSize:"9px"}}>
              Barang akan dikirim dari Gudang Jakarta, <br />
              setelah pembayaran lunas.
            </div>
          </div>
        </div>
        ))}

        </section>
      </div>
      </>
  );
 
};

export default PDFFile;
