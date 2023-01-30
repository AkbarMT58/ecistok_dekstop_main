import {
  LocalShippingIcon,
  KeyboardArrowRightIcon,
  CheckIcon,
} from 'components/Global/Icons';
import { useState, useEffect, forwardRef } from 'react';
import Spinner from 'components/Global/Spinner';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Dialog, IconButton, Slide } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Typography from '@mui/material/Typography';
import InputForm from 'components/Global/InputForm';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 450,
  maxHeight: 600,
  bgcolor: 'background.paper',
  border: '2px solid lightgray',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const Courier = ({ data, handleSelectCourier, payload, loading }) => {
  const [open, setOpen] = useState(false);
  const onDismiss = () => {
    setOpen(false);
  };

  const [openCustom, setOpenCustom] = useState(false);
  const [custom, setCustom] = useState({
    kurir: '',
    service: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCustom({ ...custom, [name]: value });
  };

  const handleClickCourier = (id) => {
    if (id === 'custom') {
      setOpenCustom(true);
    } else {
      handleSelectCourier(id);
    }
  };

  const setCustomCourier = () => {
    if (custom.kurir.trim().length === 0) {
      toast.error('Silahkan Lengkapi Form Custom Kurir');
    } else if (custom.service.trim().length === 0) {
      toast.error('Silahkan Lengkapi Form Custom Kurir');
    } else {
      handleSelectCourier('custom', custom.kurir, custom.service);
      setOpenCustom(false);
    }
  };

  return (
    <>
      {!loading ? (
        <div
          onClick={() => setOpen(true)}
          className='flex p-2 justify-between border border-gray-300 rounded-md cursor-pointer'
        >
          <div className='flex space-x-3'>
            <LocalShippingIcon fontSize='medium' className='text-orange-500' />
            <p className='font-semibold text-gray-500 capitalize'>
              {payload.kurir.trim().length > 0
                ? payload.kurir + ' - ' + payload.service
                : 'Pilih Pengiriman Lokal'}
            </p>
          </div>
          <KeyboardArrowRightIcon className='text-right' />
        </div>
      ) : (
        <div className=' flex p-2 justify-between border border-gray-300 rounded-md'>
          <div className='flex space-x-3'>
            <LocalShippingIcon fontSize='medium' className='text-orange-500' />
            <p className='font-semibold text-gray-500'>
              {payload.kurir.trim().length > 0
                ? payload.kurir + ' - ' + payload.service
                : 'Pilih Pengiriman Lokal'}
            </p>
          </div>
          <Spinner diameter={5} />
        </div>
      )}

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={onDismiss}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className='overflow-y-scroll modal-scroll'>
            <div className='flex justify-end -mt-5'>
              <IconButton onClick={onDismiss} style={{ textAlign: 'right' }}>
                <CloseIcon />
              </IconButton>
            </div>
            <Typography id='transition-modal-title' variant='h6' component='h2'>
              Pilih Pengiriman Lokal
            </Typography>

            {data?.length > 0 ? (
              data?.map((courier, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => {
                      handleClickCourier(courier.id);
                      onDismiss();
                    }}
                    className='w-full border-b border-gray-300 py-2 px-3 duration-200 cursor-pointer hover:bg-orange-200 hover:scale-110'
                  >
                    <div className='flex justify-between items-center'>
                      <div>
                        <div className='flex items-center space-x-2'>
                          <p className='font-semibold text-md line-clamp-1 capitalize'>
                            {courier.code} - {courier.service}
                          </p>
                          <p className='text-sm font-semibold text-marron-500'>
                            Rp {courier.price.toLocaleString('ID-id')}
                          </p>
                        </div>
                        <p className='text-sm'>
                          Harga diatas merupakan harga estimasi
                        </p>
                      </div>
                      {courier.is_selected && (
                        <CheckIcon className='text-orange-500' />
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className='flex flex-col items-center justify-center h-32'>
                <p className='font-bold text-marron-500'>Oops ..</p>
                <p className='text-center text-marron-500'>
                  Metode Pengiriman tidak ditemukan, <br />
                  silahkan lengkapi alamat pengiriman
                </p>
              </div>
            )}
          </Box>
        </Fade>
      </Modal>
      <Dialog
        open={openCustom}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby='alert-dialog-slide-description'
        onClose={() => setOpenCustom(false)}
      >
        <div className='container mx-auto flex flex-col space-y-4 h-80 justify-center text-gray-700'>
          <p className='font-semibold text-center text-lg'>Custom Pengiriman</p>
          <InputForm
            label='Jenis Kurir'
            placeholder='JNE / J&T / Sicepat'
            id='kurir'
            type='text'
            value={custom.kurir}
            onChange={handleChange}
          />
          <InputForm
            label='Service'
            placeholder='Reguler / Sameday'
            id='service'
            type='text'
            value={custom.service}
            onChange={handleChange}
          />
          <button
            onClick={setCustomCourier}
            className='bg-orange-500 text-white rounded-md py-1'
          >
            Submit
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default Courier;
