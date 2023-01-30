import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Image from 'next/image';
import { useState, useEffect } from 'react';
export default function CardVariant({
  indexProduct,
  selectCart,
  variant,
  indexVariant,
  updateQuantity,
  product,
  isLoading,
}) {
  const [qty, setQty] = useState(0);
  const [disabledMinus, setDisabledMinus] = useState(false);
  const handleInput = (
    e,
    kelipatan,
    minimum,
    qty_kelipatan,
    idvar,
    idprod,
    id_list_link
  ) => {
    if (Number(qty) < Number(minimum)) {
      swal('Oops !', `Minimal pembelian ${minimum} pcs`);
      e.target.value = variant.kuantiti;
      return false;
    }

    if (kelipatan) {
      if ((Number(qty) / Number(qty_kelipatan)) % 1 !== 0) {
        swal('Oops !', `Pembelian harus kelipatan ${qty_kelipatan} pcs`);
        e.target.value = variant.kuantiti;
        return false;
      }
      updateQuantity(qty, idvar, idprod, id_list_link);
      return false;
    }
    updateQuantity(qty, idvar, idprod, id_list_link);
  };
  const validateDisabled = () => {
    if (variant?.kuantiti === 1) {
      setDisabledMinus(true);
    } else if (variant?.kelipatan) {
      if (variant?.kuantiti - variant.kuantiti_kelipatan < 1) {
        setDisabledMinus(true);
      } else {
        setDisabledMinus(false);
      }
    } else {
      setDisabledMinus(false);
    }
  };
  useEffect(() => {
    setQty(variant.kuantiti);
    validateDisabled();
  }, [variant.kuantiti]);
  return (
    <div className='w-full flex bg-gray-200 p-1 items-center'>
      <div className='w-1/12'>
        <input
          type='checkbox'
          className='check-variant '
          style={{ width: '16px', height: '16px' }}
          onChange={(e) =>
            selectCart('single', indexProduct, e.target.checked, indexVariant)
          }
          checked={variant.isSelected}
        />
      </div>
      <div className='w-11/12'>
        <div className='grid grid-cols-4 pb-2'>
          <div className='flex space-x-1 items-center justify-center'>
            {variant.gambar.length > 0 && (
              <img
                src={variant.gambar}
                height={30}
                width={30}
                className='object-contain'
              />
            )}
            <div className='flex flex-col gap-2'>
              <p className='capitalize'>{variant?.variant}</p>
              <p>
                Berat Satuan : {variant?.berat_string}
                KG
              </p>
            </div>
          </div>
          <div
            className={`flex items-center justify-center ${
              variant.kuantiti_ori > 0 && 'mb-4'
            }`}
          >
            <div className='flex flex-col justify-center items-center relative'>
              <div>
                <button disabled={disabledMinus || isLoading}>
                  <IndeterminateCheckBoxIcon
                    className={`${
                      disabledMinus || isLoading
                        ? 'text-gray-400'
                        : 'text-orange-500'
                    }`}
                    onClick={() =>
                      updateQuantity(
                        variant?.kelipatan
                          ? parseInt(variant?.kuantiti) -
                              parseInt(variant?.kuantiti_kelipatan)
                          : parseInt(variant?.kuantiti) - 1,
                        variant?.id,
                        product?.id,
                        product?.id_list_link
                      )
                    }
                  />
                </button>
                <input
                  type='number'
                  className='w-8 focus:outline-none text-center border border-gray-300'
                  value={qty ?? 0}
                  min={1}
                  onChange={(e) => setQty(e.target.value)}
                  onBlur={(e) =>
                    handleInput(
                      e,
                      variant?.kelipatan,
                      1,
                      variant?.kuantiti_kelipatan,
                      variant?.id,
                      product?.id,
                      product?.id_list_link
                    )
                  }
                />
                <button disabled={isLoading}>
                  <AddBoxIcon
                    className={isLoading ? 'text-gray-400' : 'text-orange-500'}
                    onClick={() =>
                      updateQuantity(
                        variant?.kelipatan
                          ? parseInt(variant?.kuantiti) +
                              parseInt(variant?.kuantiti_kelipatan)
                          : parseInt(variant?.kuantiti) + 1,
                        variant?.id,
                        product?.id,
                        product?.id_list_link
                      )
                    }
                  />
                </button>
              </div>
            </div>
          </div>
          <div className='justify-center flex items-center'>
            <p className='text-marron-500'>
              Rp. {variant?.harga.toLocaleString('id-ID')}
            </p>
          </div>
          <div className='justify-center flex items-center'>
            <p className='text-marron-500'>
              Rp. {variant?.harga_pesawat.toLocaleString('id-ID')}
            </p>
          </div>
        </div>
        <div className='grid grid-cols-4 border-t border-gray-300 pt-2'>
          <p className='text-center font-semibold'>Total</p>
          <p className='font-semibold text-center' />
          <p className='text-center text-marron-500'>
            Rp.{' '}
            {(parseInt(variant?.kuantiti) * variant?.harga).toLocaleString(
              'id-ID'
            )}
          </p>
          <p className='text-center text-marron-500'>
            Rp.{' '}
            {(
              parseInt(variant?.kuantiti) * variant?.harga_pesawat
            ).toLocaleString('id-ID')}
          </p>
        </div>
      </div>
    </div>
  );
}
