/* eslint-disable @next/next/no-img-element */
import {
  postVerifiedAccount,
  validateUsingWhatsapp,
  verifyOTPCode,
} from 'constants/api/member';
import React, { useState, useEffect, useRef } from 'react';
import users from 'helpers/users';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { toast } from 'react-toastify';
import Spinner from 'components/Global/Spinner';
import router from 'next/router';
import Countdown from 'components/Global/Countdown';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Heads from 'components/Heads';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const ValidateAccount = () => {
  const [state, setState] = useState({
    phone: '',
    email: '',
    loading: false,
    timer: 0,
    isDisable: false,
    open: false,
    openWhatsApp: false,
    openIsOTP: false,
    isInputOtp: false,
  });
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: '',
  });
  const input1 = useRef();
  const input2 = useRef();
  const input3 = useRef();
  const input4 = useRef();
  const input5 = useRef();
  const input6 = useRef();
  const submitBTN = useRef();

  const handleClick = async (e) => {
    e.preventDefault();
    setState({ ...state, loading: true });

    const response = await postVerifiedAccount();
    if (response.status === 200) {
      const dateNow = new Date(response.time * 1000);
      const expiryDate = new Date(
        new Date(response.time * 1000).setMinutes(
          new Date(response.time * 1000).getMinutes() + 5
        )
      );
      let difference = expiryDate - dateNow;
      let diff_days = Math.floor((difference / (1000 * 60)) * 60);

      setState({
        ...state,
        loading: false,
        isDisable: true,
        open: true,
        timer: diff_days,
      });
    } else if (response.status === 400) {
      toast.error(response.message);
      const dateNow = new Date();
      const expiryDate = new Date(
        new Date(response.time * 1000).setMinutes(
          new Date(response.time * 1000).getMinutes() + 5
        )
      );
      let difference = expiryDate - dateNow;
      let diff_days = Math.floor((difference / (1000 * 60)) * 60);

      setState({
        ...state,
        loading: false,
        isDisable: true,
        timer: diff_days,
      });
    } else {
      toast.error('Gagal memverifikasi akun');
      setState({ ...state, loading: false });
    }
  };

  const handleClickWhatsapp = async () => {
    const data = await validateUsingWhatsapp();
    if (data?.status === 200) {
      toast.success('Kode OTP Telah Dikirimkan');
      setState({
        ...state,
        openIsOTP: true,
        openWhatsApp: false,
      });
    } else {
      toast.error(`${data.message}`);
    }
  };

  const enableButton = () => {
    setState({ ...state, isDisable: false });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    if (name === 'input1') {
      if (value.length === 1) {
        input2.current.focus();
      }
    }

    if (name === 'input2') {
      if (value.length === 1) {
        input3.current.focus();
      }

      if (value.length === 0) {
        input1.current.focus();
      }
    }

    if (name === 'input3') {
      if (value.length === 1) {
        input4.current.focus();
      }

      if (value.length === 0) {
        input2.current.focus();
      }
    }

    if (name === 'input4') {
      if (value.length === 1) {
        input5.current.focus();
      }

      if (value.length === 0) {
        input3.current.focus();
      }
    }

    if (name === 'input5') {
      if (value.length === 1) {
        input6.current.focus();
      }

      if (value.length === 0) {
        input4.current.focus();
      }
    }

    if (name === 'input6') {
      if (value.length === 0) {
        input5?.current?.focus();
      }
    }

    setPayload({ ...payload, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { input1, input2, input3, input4, input5, input6 } = payload;
    setLoading(true);

    const otpInput = {
      otp: input1 + input2 + input3 + input4 + input5 + input6,
    };

    if (otpInput?.otp?.length === 6) {
      const body = JSON.stringify(otpInput);
      const data = await verifyOTPCode(body);
      if (data?.status === 200) {
        setState({
          ...state,
          isInputOtp: true,
        });
      } else {
        toast.error(` ${data.message}`);
      }
    } else {
      toast.warning(`Kode OTP Tidak Lengkap`);
    }

    setLoading(false);
  };

  const handleCloseAllModal = () => {
    setState({
      ...state,
      open: false,
      openWhatsApp: false,
      openIsOTP: false,
      isInputOtp: false,
    });
  };

  useEffect(() => {
    const user = users();
    setState({ ...state, email: user.email, phone: user.phone });

    if (user.email === null) {
      router.push('/login');
      toast.success('Anda Perlu Login Terlebih Dahulu');
    } else if (user.is_verified === true) {
      router.push('/dashboard');
      toast.success('Akun Anda Sudah di Verifikasi');
    } else {
      setState({ ...state, email: user.email, phone: user.phone });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Heads title={'Validasi Account'} />
      <div className='container-app mx-auto px-3 h-screen flex items-center flex-col space-y-5 justify-center'>
        <img src='/logo_oci_new_2.svg' alt='' className='w-72' />
        <div className='flex space-y-5 flex-col justify-center items-center text-center bg-white  w-[500px] p-10 rounded-xl'>
          <img src='/validatemail.png' alt='' height={200} width={300} />
          <p className='text-xl font-semibold'>
            Verifikasikan Alamat Email Anda
          </p>
          <p className='text-lg text-gray-700'>
            Untuk kemudahan dan kenyamanan saat bertransaksi, mohon melakukan
            verifikasi email kamu melalui link berikut ini.
          </p>
          {state.loading ? (
            <Spinner />
          ) : (
            <>
              <button
                disabled={state.isDisable}
                onClick={handleClick}
                className={`${
                  state.isDisable ? 'bg-gray-500' : 'bg-orange-500'
                } text-white px-4 py-2 rounded-md`}
              >
                Kirim Email Verifikasi
              </button>
              <button
                disabled={state.isDisable}
                onClick={() => {
                  setState({
                    ...state,
                    openWhatsApp: true,
                  });
                }}
                className={`${
                  state.isDisable ? 'hidden' : 'bg-green-500'
                } text-white px-4 py-2 rounded-md`}
              >
                <WhatsAppIcon /> Kirim Verifikasi Melalui Whatsapp
              </button>
            </>
          )}
          {state.timer > 0 && (
            <div className='flex space-x-2'>
              <p className='text-sm text-gray-400 font-semibold'>
                Kirim ulang Email Verifikasi dalam{' '}
              </p>
              <Countdown
                INITIAL_COUNT={state.timer}
                callback={enableButton}
                digits={2}
                className='text-sm font-semibold text-gray-500'
              />
            </div>
          )}
        </div>

        {/* Email Dialog */}
        <Dialog
          open={state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseAllModal}
        >
          <DialogTitle>{'Verfikasi email kamu'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
              Kami telah mengirimkan link verifikasi ke email{' '}
              <span className='text-orange-500'>{state.email}</span> untuk
              memverifikasi akun anda.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div className='flex items-center space-x-3 p-2'>
              <button
                onClick={() => router.push('/login')}
                className='p-2 px-3 bg-orange-500 rounded-md text-white'
              >
                Oke
              </button>
            </div>
          </DialogActions>
        </Dialog>

        {/* WhatsApp Dialog */}
        <Dialog
          open={state.openWhatsApp}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseAllModal}
        >
          <DialogTitle>{'Verfikasi Menggunakan WhatsApp kamu'}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
              Kami Akan mengirimkan Kode OTP ke Nomor{' '}
              <span className='text-orange-500'>+{state.phone}</span> untuk
              memverifikasi akun anda. Apakah Nomor Terdaftar Benar ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div className='flex items-center space-x-3 p-2'>
              <button
                onClick={handleClickWhatsapp}
                className='p-2 w-20 bg-orange-500 hover:bg-orange-400 rounded-md text-white'
              >
                Ya
              </button>
              <button
                onClick={() => router.push('/myprofile')}
                className='p-2 px-3 bg-orange-500 hover:bg-orange-400 rounded-md text-white'
              >
                Ganti Nomor
              </button>
            </div>
          </DialogActions>
        </Dialog>

        {/* Input OTP */}
        <Dialog
          open={state.openIsOTP}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseAllModal}
        >
          <div className='w-full h-full p-16 overflow-hidden'>
            {state?.isInputOtp === true ? (
              <div
                className={`${
                  state?.isInputOtp === true
                    ? 'translate-y-0'
                    : 'translate-y-60'
                } delay-500 duration-500 ease-in-out flex flex-col items-center justify-center gap-5`}
              >
                <div
                  className={`text-green-500 text-2xl gap-5 flex justify-center items-center`}
                >
                  <CheckCircleIcon fontSize='large' />
                  <p className={`font-medium`}>Verifikasi OTP Berhasil</p>
                </div>
                <button
                  onClick={() => router.push('/')}
                  className='bg-orange-500 px-2 py-3 text-white rounded-md'
                >
                  Cari Produk Sekarang
                </button>
              </div>
            ) : (
              <>
                <div className='w-full'>
                  <div className='text-lg font-bold text-orange-500 text-center '>
                    Mohon Masukan Kode OTP Untuk Verifikasi Akun Anda
                  </div>
                  <p className='text-base text-center text-gray-400'>
                    Kode OTP Telah Dikirim Ke Nomor {state?.phone}
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className='flex justify-center items-center gap-4'>
                    <input
                      type='text'
                      className='w-10 border-b-4 focus:border-orange-300 outline-none text-3xl uppercase font-bold text-gray-400 text-center'
                      pattern='\d*'
                      maxLength='1'
                      name='input1'
                      ref={input1}
                      value={payload.input1}
                      onChange={handleChange}
                    />
                    <input
                      type='text'
                      className='w-10 border-b-4 focus:border-orange-300 outline-none text-3xl uppercase font-bold text-gray-400 text-center'
                      name='input2'
                      maxLength='1'
                      ref={input2}
                      value={payload?.input2}
                      onChange={handleChange}
                    />
                    <input
                      type='text'
                      className='w-10 border-b-4 focus:border-orange-300 outline-none text-3xl uppercase font-bold text-gray-400 text-center'
                      name='input3'
                      maxLength='1'
                      ref={input3}
                      value={payload?.input3}
                      onChange={handleChange}
                    />
                    <input
                      type='text'
                      className='w-10 border-b-4 focus:border-orange-300 outline-none text-3xl uppercase font-bold text-gray-400 text-center'
                      name='input4'
                      maxLength='1'
                      ref={input4}
                      value={payload?.input4}
                      onChange={handleChange}
                    />
                    <input
                      type='text'
                      className='w-10 border-b-4 focus:border-orange-300 outline-none text-3xl uppercase font-bold text-gray-400 text-center'
                      name='input5'
                      maxLength='1'
                      ref={input5}
                      value={payload?.input5}
                      onChange={handleChange}
                    />
                    <input
                      type='text'
                      className='w-10 border-b-4 focus:border-orange-300 outline-none text-3xl uppercase font-bold text-gray-400 text-center'
                      name='input6'
                      maxLength='1'
                      ref={input6}
                      value={payload?.input6}
                      onChange={handleChange}
                    />
                  </div>

                  <div className='flex items-center justify-center mt-6'>
                    {loading ? (
                      <Spinner />
                    ) : (
                      <button
                        ref={submitBTN}
                        type='submit'
                        className='text-xl shadow bg-gradient-to-r from-orange-400 to-red-500 hover:bg-orange-500 text-white py-2 px-6 rounded-lg focus:outline-none hover:scale-105'
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </form>
              </>
            )}
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default ValidateAccount;
