import Spinner from 'components/Global/Spinner';
import CardVariant from './CardVariant';
import { addCart } from 'constants/api/member';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import ModalComment from './ModalComment';
import { DeleteOutlineIcon } from 'components/Global/Icons';
import Link from 'next/link';
export default function WaitPayment({
  cart,
  loading,
  selectCart,
  changeTypeShipping,
  updateQuantity,
  setLoading,
  removeCart,
}) {
  const router = useRouter();
  const handleSubmit = async () => {
    setLoading({ ...loading, submit: true });
    let product = [];
    const filter = cart.product.filter((item) => item.total !== 0);
    filter.map((item) => {
      return item.RequestProduk.filter((variant) => {
        if (variant.isSelected) {
          variant.idProduct = item.id;
          product.push({
            id_request: item.id,
            idVariant: variant.idVariant,
            id_list_link: item?.id_list_link,
          });
        }
      });
    });
    const payload = {
      produk: product,
      Is_airplane: cart.shipping_value === 'udara',
    };

    const response = await addCart(JSON.stringify(payload));
    if (response.status === 200) {
      // Tiktok Pixel
      // ttq.track("InitiateCheckout", {
      //   content_id: data?.id_so,
      //   quantity: data?.total_quantity,
      //   value: data?.total_price,
      //   currency: "IDR",
      // });
      
      router.push(`/checkout/${response.id_so}`);
    } else {
      toast.error(response?.message);
    }
    setLoading({ ...loading, submit: false });
  };
  const handleRemove = (id) => {
    swal({
      title: 'Hapus produk ini ?',
      text: 'Data produk yang dihapus tidak dapat kembali',
      buttons: true,
      dangerMode: true,
    }).then(async (submit) => {
      if (submit) {
        removeCart(id);
      }
    });
  };
  return (
    <div
      className={`w-full  max-h-[1500px] overflow-y-auto variant-scroll transition-all duration-500 ${
        !loading.cart ? 'min-h-40' : 'h-32'
      }`}
    >
      {!loading.cart ? (
        cart.product?.length > 0 ? (
          cart.product?.map((product, idx) => {
            return (
              <div key={idx} className='mt-3 bg-white pt-1 mx-2'>
                <div className='flex justify-between w-full px-4 py-2 font-medium'>
                  <div className='w-full flex'>
                    <div className='w-1/12'>
                      <input
                        type='checkbox'
                        style={{ width: '18px', height: '18px' }}
                        onChange={(e) =>
                          selectCart('all', idx, e.target.checked)
                        }
                      />
                    </div>
                    <div className='w-3/12 flex flex-col items-center space-y-2'>
                      <div className='flex justify-center h-20'>
                        <img
                          src={
                            product?.gambar.trim().length > 0
                              ? product?.gambar
                              : '/default-image.png'
                          }
                          className='rounded-md w-20 h-20 object-cover'
                        />
                      </div>
                      <ModalComment idComment={product?.id} />
                    </div>
                    <div className='w-8/12  max-h-20'>
                      <button
                        onClick={() => {
                          handleRemove(product.id_list_link);
                        }}
                        className='ml-auto mb-2 flex space-x-1 bg-red-200 px-2 py-1 rounded-md'
                      >
                        <DeleteOutlineIcon
                          fontSize='small'
                          className='text-red-500'
                        />
                        <p className='text-sm text-red-600'>Hapus</p>
                      </button>
                      <Link
                        href={`/product/${product.toko}/${product.id_page}`}
                      >
                        <p className='cursor-pointer text-xs text-justify line-clamp-4 uppercase font-semibold hover:text-orange-500'>
                          {product?.produk}
                        </p>
                      </Link>
                      {product.kuantiti_ori > 0 && (
                        <span className='text-xs text-center text-marron-500 max-w-xs font-semibold'>
                          Minimum : {product.kuantiti_ori} pcs
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={`px-4 pt-4 pb-2 flex flex-col space-y-2 2xs:text-xs text-sm text-gray-500 bg-gray-200 rounded-md`}
                >
                  <div className='flex items-center'>
                    <div className='w-1/12' />
                    <div className='grid grid-cols-4 pb-2 w-11/12'>
                      <div className=''>
                        <p className='text-center font-semibold'>Variant</p>
                      </div>
                      <div className=''>
                        <p className='text-center font-semibold'>Kuantiti</p>
                      </div>
                      <div className=''>
                        <p className='text-center font-semibold'>Harga Laut</p>
                      </div>
                      <div className=''>
                        <p className='text-center  font-semibold'>
                          Harga Udara*
                        </p>
                      </div>
                    </div>
                  </div>
                  {product.RequestProduk.length > 0 ? (
                    product.RequestProduk.map((variant, i) => {
                      return (
                        <CardVariant
                          key={i}
                          isLoading={loading.quantity}
                          indexProduct={idx}
                          selectCart={selectCart}
                          product={product}
                          variant={variant}
                          indexVariant={i}
                          updateQuantity={updateQuantity}
                        />
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className='bg-white text-center text-gray-700 mt-5'>
            Data tidak ditemukan
          </p>
        )
      ) : (
        <div className='w-full text-center mt-10'>
          <Spinner />
        </div>
      )}

      {cart.product.length !== 0 && (
        <>
          <div className='w-full flex p-2 bg-white items-center  space-x-5 mt-2 justify justify-between'>
            <div className='flex justify-center flex-col text-sm space-y-1'>
              <p>Pilihan Pengiriman :</p>
              <select
                onChange={changeTypeShipping}
                value={cart.shipping_value}
                className='w-32 bg-white border border-gray-300 focus:border-orange-500 rounded-md p-1 outline-none focus:ring ring-orange-300 transition-all duration-300 capitalize'
              >
                {cart.shipping_method.map((shipping, i) => {
                  return (
                    <option key={i} value={shipping} className='capitalize'>
                      {shipping}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='flex items-center space-x-5'>
              <div className='flex space-x-3 font-semibold text-xl'>
                <p className=' text-gray-700'>Total</p>
                <h5 className=' text-marron-500 font-bold'>
                  Rp. {cart.total_checkout.toLocaleString('id-ID')}
                </h5>
              </div>
              <div>
                {loading.submit ? (
                  <div className='text-center'>
                    <Spinner />
                  </div>
                ) : !cart.is_valid_checkout && cart.total_checkout > 0 ? (
                  <button
                    onClick={() =>
                      swal(
                        'Oops',
                        'Ada produk yang belum mencapai 1 juta rupiah atau Minimum kuantiti produk belum sesuai',
                        'warning'
                      )
                    }
                    className={`px-5 rounded-md py-1 bg-yellow-500  text-white`}
                  >
                    Checkout
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!cart.is_valid_checkout}
                    className={`px-5 py-1 rounded-md ${
                      cart.is_valid_checkout ? 'bg-green-600' : 'bg-gray-500'
                    }  text-white`}
                  >
                    Checkout
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {cart?.shipping_value === 'udara' && (
        <div className='w-3/4 text-xs text-red-500 py-1 px-2'>
          *pengiriman via udara wajib minimal 5 kg, bila kurang dari 5 kg akan
          tetap dikenakan biaya pengiriman 5 kg*
        </div>
      )}
    </div>
  );
}
