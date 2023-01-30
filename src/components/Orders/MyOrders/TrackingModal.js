import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import Typography from '@mui/material/Typography';
import Tracking from './Tracking';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Skeleton } from '@mui/material';
import Spinner from 'components/Global/Spinner';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  maxHeight: 600,
  bgcolor: 'background.paper',
  border: '2px solid lightgray',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

export default function TrackingModal({
  getTrackingOrder,
  tracking,
  orderData,
  date,
  loading,
  data,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div
        onClick={() => {
          getTrackingOrder(orderData);
          handleOpen();
        }}
        className='inline-block text-sm bg-orange-500 text-white cursor-pointer px-3 py-1 rounded-md hover:bg-orange-600'
      >
        {orderData.statusPesanan
          ? orderData.statusPesanan
          : `Produk ${orderData}`}
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
              Status Pemesanan
            </Typography>
            <div className='border-t border-gray-200' />
            <div className='py-2 text-sm space-y-2'>
              <p>No. Pesanan : {orderData}</p>
              <p>Tanggal Pesanan : {date}</p>
              <div className='flex items-center justify-start'>
                <p>Status : </p>
                {loading ? (
                  <p className='ml-2'>
                    <Skeleton width={100} />
                  </p>
                ) : (
                  <p className='font-semibold capitalize ml-1'>
                    {tracking.filter((track) => track.proses === true)
                      .length === 0
                      ? 'Unpaid'
                      : tracking.filter((track) => track.proses === true)[
                          tracking.filter((track) => track.proses === true)
                            .length - 1
                        ]?.status}
                  </p>
                )}
              </div>
            </div>
            <div className='bg-gray-200 h-2' />
            {loading ? (
              <div className='mt-5'>
                <Spinner />
              </div>
            ) : (
              <Tracking data={tracking} orderData={orderData} />
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
