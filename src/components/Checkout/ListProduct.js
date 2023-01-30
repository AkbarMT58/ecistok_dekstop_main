import { FlightIcon } from 'components/Global/Icons';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';

const ListProduct = ({ item, variant }) => {
  return (
    <div className='flex mt-3 space-x-1'>
      <div className='w-3/12'>
        <img
          src={variant.gambar.length > 0 ? variant.gambar : item.gambar}
          className='w-full h-24 object-contain'
        />
      </div>
      <div className='w-9/12 text-xs'>
        <p className='line-clamp-2 font-semibold text-gray-700'>
          {item.produk}
        </p>
        <p className='text-gray-500 line-clamp-1'>
          variant : <b>{variant.variant}</b>
        </p>
        <p className='text-orange-500'>
          {variant.kuantiti} Barang
          <span className='text-gray-500'>
            {' '}
            X Rp {variant.harga.toLocaleString('ID-id')}
          </span>
        </p>
        {item.is_airplane ? (
          <span className='font-semibold my-1 flex items-center space-x-2 gap-2'>
            <FlightIcon className='text-orange-500' />
            Pengiriman Udara
          </span>
        ) : (
          <span className='font-semibold my-1 flex items-center space-x-2 gap-2'>
            <DirectionsBoatIcon className='text-orange-500' />
            Pengiriman Laut
          </span>
        )}
        <p className='text-lg text-gray-700 font-bold'>
          Rp {(variant.harga * variant.kuantiti).toLocaleString('ID-id')}
        </p>
      </div>
    </div>
  );
};

export default ListProduct;
