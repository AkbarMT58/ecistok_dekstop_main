import { useState } from 'react';
import {
  KeyboardArrowRightIcon,
  MonetizationOnIcon,
  CheckIcon,
} from 'components/Global/Icons';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  maxHeight: 600,
  bgcolor: 'background.paper',
  border: '2px solid lightgray',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};
const PaymentMethod = ({ data, handleSelectPayment, payload }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div
        onClick={handleOpen}
        className='mt-3 flex p-2 justify-between border border-gray-300 rounded-md cursor-pointer'
      >
        <div className='flex space-x-3'>
          <MonetizationOnIcon fontSize='medium' className='text-orange-500' />
          <p className='font-semibold text-gray-500'>
            {payload.payment_type.trim().length > 0
              ? payload.payment_type
              : 'Pilih Metode Pembayaran'}
          </p>
        </div>
        <KeyboardArrowRightIcon className='text-right' />
      </div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className='overflow-y-scroll modal-scroll'>
            <div className='flex justify-end -mt-5'>
              <IconButton onClick={handleClose} style={{ textAlign: 'right' }}>
                <CloseIcon />
              </IconButton>
            </div>
            <Typography id='transition-modal-title' variant='h6' component='h2'>
              Pilih Metode Pembayaran
            </Typography>
            <div className='mt-5'>
              {data
                ?.filter(
                  (p) =>
                    p.Payment_type !== 'gopay' && p.Payment_type !== 'shopeepay'
                )
                .map((e) => {
                  if (e.is_active) {
                    return (
                      <div
                        key={e.id}
                        onClick={() => {
                          handleSelectPayment(e.id);
                          handleClose();
                        }}
                        className='w-full border-b border-gray-300 py-2 px-3 duration-300 cursor-pointer hover:bg-orange-200 hover:scale-110'
                      >
                        <div className='flex justify-between items-center'>
                          <div className='flex space-x-5'>
                            <img
                              src={e.gambar}
                              className='h-7 w-20 object-contain'
                            />
                            <p className='text-md capitalize'>
                              {e.Payment_type}
                            </p>
                          </div>
                          {e.is_selected && (
                            <CheckIcon className='text-orange-500' />
                          )}
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};
export default PaymentMethod;
