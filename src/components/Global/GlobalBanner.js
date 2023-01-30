const BannerTerintegrasi = ({ isRoundedNo }) => {
  return (
    <div
      className={`bg-orange-400 flex flex-col items-center justify-center py-10  mt-4 ${
        isRoundedNo ? '' : 'rounded-xl'
      }`}
    >
      {/* <div className='text-white text-2xl'>
        Terintegrasi Langsung Dengan Marketplace Terbesar Di China 1688, Taobao
        & Alibaba
      </div> */}

      {/* <div className='text-white text-2xl flex justify-center items-center'>
        Terintegrasi Langsung Dengan Marketplace Terbesar Di China{' '}
        <img
          className='w-20 bg-white mx-2 h-20 object-contain'
          src='https://ocistok.co.id/control-panel/foto/1688.svg'
        />
        <img
          className='w-20 bg-white mx-2 h-20 object-contain'
          src='https://ocistok.co.id/control-panel/foto/Alibaba.svg'
        />
        <img
          className='w-20 bg-white mx-2 h-20 object-contain'
          src='https://ocistok.co.id/control-panel/foto/Taobao_Logo.svg'
        />
      </div> */}

      <div className='text-white text-2xl text-center'>
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
  );
};

export { BannerTerintegrasi };
