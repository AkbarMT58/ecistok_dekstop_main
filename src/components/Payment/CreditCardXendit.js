import React, { useState, useEffect, useRef } from 'react';
import { DescriptionIcon } from 'components/Global/Icons';
import { toast } from 'react-toastify';
import { getOtpCreditCardXendit } from 'constants/api/member';
import NotificationResponse from './NotificationResponse';
import copyText from 'helpers/copyText';
import { Dialog, Slide } from '@mui/material';
import { Random } from 'random-js';
import Spinner from 'components/Global/Spinner';
import { useRouter } from 'next/router';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const CreditCardXendit = ({ data, timer }) => {
  useEffect(() => {
    // if (!document.getElementById("xendit-script")) {
    //   const script = document.createElement("script");

    //   script.type = "text/javascript";
    //   script.id = "xendit-script";
    //   script.src = "https://js.xendit.co/v1/xendit.min.js";
    //   document.head.appendChild(script);
    // }

    // if (document.getElementById("xendit-script")) {
    //   const script = document.createElement("script");

    //   script.type = "text/javascript";
    //   script.append(
    //     "Xendit.setPublishableKey('xnd_public_development_M0XmIRzG3sE6iVjLs6Zqd4aWV5AZNNk4iERWuog0CuLgbCYZZ2sdHI1utivHTeAz');"
    //   );
    //   document.head.appendChild(script);
    // }

    handleXenditInitiation();
  }, []);

  const [redirect, setRedirect] = useState('');
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [isSuccess, setIsSuccess] = useState({ status: '', response: {} });
  const yearRef = useRef();
  const monthRef = useRef();
  const nameRef = useRef();
  const numberRef = useRef();
  const cvvRef = useRef();
  const btnBayarRef = useRef();
  const router = useRouter();

  const [cardData, setCardData] = useState({
    name: '',
    card_number: '',
    card_exp_month: '',
    card_exp_year: '',
    card_cvv: '',
  });

  function handleXenditInitiation() {
    Xendit.setPublishableKey(process.env.XENDIT_KEY);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'card_exp_month') {
      if (value.length === 2) {
        yearRef.current.focus();
      }
    } else if (name === 'card_exp_year') {
      if (value.length >= 2) {
        cvvRef.current.focus();
      }
    } else if (name === 'card_cvv') {
      if (value.length >= 3) {
        btnBayarRef.current.focus();
      }
    }
    setCardData({ ...cardData, [name]: value });
  };

  const handleSubmit = () => {
    if (cardData.name.trim().length === 0) {
      toast.error('Mohon lengkapi nama card credit', {
        position: 'top-center',
      });
      nameRef.current.focus();
    } else if (!Xendit.card.validateCardNumber(cardData.card_number)) {
      toast.error('Format Nomor Credit Card Tidak Sesuai', {
        position: 'top-center',
      });
      numberRef.current.focus();
    } else if (cardData.card_cvv.trim().length === 0) {
      toast.error('Format Date Expired Card Credit Tidak Sesuai', {
        position: 'top-center',
      });
      monthRef.current.focus();
    } else if (cardData.card_cvv.trim().length === 0) {
      toast.error('Mohon lengkapi card cvv credit', {
        position: 'top-center',
      });
      cvvRef.current.focus();
    } else {
      setIsLoading(true);
      Xendit.card.createToken(
        {
          amount: data.data.total_price,
          card_number: cardData.card_number,
          card_exp_month: cardData.card_exp_month,
          card_exp_year: `20${cardData.card_exp_year}`,
          card_cvn: cardData.card_cvv,
          is_multiple_use: false,
        },
        xenditResponseHandler
      );
    }
  };

  const _getOtpCreditCard = async (payload) => {
    const res = await getOtpCreditCardXendit(JSON.stringify(payload));
    if (parseInt(res.status) === 200) {
      setOpen(false);
      setIsLoading(false);
      setOpenNotif(true);
      setIsSuccess({ status: 'success', response: res });
      if (res.message === 'Sukses') {
        toast.success('Pembayaran Sedang Di Proses', {
          position: 'top-center',
        });
      } else {
        toast.success(res.message, {
          position: 'top-center',
        });
      }
    } else {
      setOpen(false);
      setIsLoading(false);
      setOpenNotif(true);
      setIsSuccess({ status: 'fail', response: res });
      toast.error(res.message, {
        position: 'top-center',
      });
    }
  };

  function xenditResponseHandler(err, creditCardToken) {
    if (err) {
      toast.error(err.message, {
        position: 'top-center',
      });
      setIsLoading(false);
      return;
    }
    if (creditCardToken.status === 'VERIFIED') {
      const token_id = creditCardToken.id;
      const random = new Random();
      const value = random.integer(10000, 1000000);
      const payload = {
        payment_type: data?.PaymentType,
        token_id: token_id,
        random: value,
        id_so: data?.data?.id_group === 0 ? data?.data?.id_so : 0,
        id_group: data?.data?.id_group !== 0 ? data?.data?.id_group : 0,
      };
      _getOtpCreditCard(payload);
    } else if (creditCardToken.status === 'IN_REVIEW') {
      const redirectUrl = creditCardToken.payer_authentication_url;
      setRedirect(redirectUrl);
      setOpen(true);
    } else if (creditCardToken.status === 'FAILED') {
      toast.error('OTENTIKASI KARTU TIDAK SESUAI', {
        position: 'top-center',
      });
    }
    setIsLoading(false);
  }

  return (
    <div className='bg-white mt-2 py-3'>
      <div className='container mx-auto'>
        <div className='flex justify-between items-center text-gray-700'>
          <p className='font-semibold'>
            {data?.PaymentType && 'Credit Card Xendit'}
          </p>
          <img src={data?.data?.gambar} className='h-10 w-20 object-contain' />
        </div>
        <hr className='my-3' />
        <p className='text-sm text-gray-700 mt-3'>Total Pembayaran</p>
        <div className='flex justify-between items-center text-gray-700'>
          <p className='font-semibold'>
            Rp {data?.data?.total_price?.toLocaleString('ID-id') ?? 0}
          </p>
          <div
            onClick={() => copyText(data?.data?.total_price)}
            className='text-sm flex space-x-2 items-center text-orange-500'
          >
            <span>Salin</span>
            <DescriptionIcon />
          </div>
        </div>
        <hr className='my-3' />
        <div className='flex flex-col text-gray-700'>
          <label className='text-sm'>Name on Card</label>
          <input
            className='text-sm mt-1 py-1 px-2 border border-gray-300 rounded-md focus:outline-none'
            type='text'
            value={cardData?.name}
            onChange={handleChange}
            name='name'
            placeholder='Name'
            ref={nameRef}
          />
        </div>
        <div className='flex flex-col text-gray-700 mt-2 space-y-1'>
          <label className='text-sm'>Card Information</label>
          <div className='flex items-center space-x-3'>
            <input
              className='w-4/6 text-sm py-1 px-2 border border-gray-300 focus:outline-none rounded-md'
              type='text'
              name='card_number'
              value={cardData?.card_number}
              ref={numberRef}
              onChange={handleChange}
              placeholder='1234 5678 1234 5678'
            />

            <div className='w-2/6 flex border border-gray-300 rounded-md text-gray-400'>
              <input
                className='w-1/2 text-center text-sm py-1 px-2 focus:outline-none'
                type='number'
                name='card_exp_month'
                value={cardData?.card_exp_month}
                ref={monthRef}
                onChange={handleChange}
                placeholder='MM'
              />
              <p> / </p>
              <input
                className='w-1/2 text-center text-sm py-1 px-2 focus:outline-none'
                type='number'
                name='card_exp_year'
                value={cardData?.card_exp_year}
                onChange={handleChange}
                ref={yearRef}
                placeholder='YY'
              />
            </div>

            <input
              className='w-1/6 text-sm py-1 px-2 border border-gray-300 focus:outline-none rounded-md'
              type='text'
              name='card_cvv'
              placeholder='CVV'
              value={cardData?.card_cvv}
              onChange={handleChange}
              ref={cvvRef}
            />
          </div>
        </div>
        <div className='w-full h-10 flex justify-center flex-col space-y-3 mt-10 items-center'>
          {}
          {isLoading ? (
            <Spinner label='Please Wait' />
          ) : (
            timer > 0 && (
              <button
                ref={btnBayarRef}
                onClick={handleSubmit}
                className='py-1 px-12 bg-orange-500 text-white rounded-lg'
              >
                Bayar Sekarang
              </button>
            )
          )}
        </div>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          // onClose={() => setOpen(false)}
          aria-describedby='alert-dialog-slide-description'
        >
          <div className='flex justify-center items-center min-h-[400px] w-[450px]'>
            <iframe
              scrolling='no'
              className='overflow-x-hidden w-full h-[400px]'
              src={redirect}
            ></iframe>
          </div>
        </Dialog>

        <Dialog
          open={openNotif}
          TransitionComponent={Transition}
          keepMounted
          aria-describedby='alert-dialog-slide-description'
        >
          <div className='min-h-[250px] p-8'>
            <NotificationResponse data={isSuccess} />
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default CreditCardXendit;
