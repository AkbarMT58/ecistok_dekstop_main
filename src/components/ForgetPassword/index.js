import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Validator from 'fastest-validator';
import Spinner from 'components/Global/Spinner';
import { toast } from 'react-toastify';
import {
  newPassword,
  postForgetPassword,
  postValidatePhone,
  validateUsingWhatsappForgotPassword,
} from 'constants/api/member';
import { useRouter } from 'next/router';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const ForgetPassword = () => {
  const router = useRouter();
  // const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [open, setOpen] = React.useState({
    metode: false,
    verifikasiWhatsapp: false,
    verifikasiEmail: false,
  });
  const [payload, setPayload] = React.useState({
    input1: '',
    input2: '',
    input3: '',
  });
  const [payloadPassword, setPayloadPassword] = React.useState({
    password: '',
    rpassword: '',
  });

  const handleSubmitEmail = async () => {
    setLoading(true);

    const response = await postForgetPassword(JSON.stringify({ email }));
    if (response.status === 200) {
      setLoading(false);
      setOpen({
        ...open,
        metode: false,
        verifikasiEmail: true,
      });
    } else {
      toast.error(response.message);
      setLoading(false);
    }
  };

  const handleSubmitWhatsapp = async () => {
    setLoading(true);
    setOpen({
      ...open,
      metode: false,
      verifikasiWhatsapp: true,
    });

    const response = await validateUsingWhatsappForgotPassword(
      JSON.stringify({ email })
    );
    if (response.status === 200) {
      setLoading(false);
      setOpen({
        ...open,
        metode: false,
        verifikasiWhatsapp: true,
      });
    } else {
      toast.error(response.message);
      setLoading(false);
    }
  };

  const handlephonevalidation = async (e) => {
    e.preventDefault();

    const v = new Validator();
    const schema = {
      $$root: true,
      type: 'email',
      empty: false,
      messages: {
        emailEmpty: 'Email wajib diisi',
        email: 'Email tidak valid',
      },
    };

    const validate = v.validate(email, schema);
    if (validate?.length) {
      toast.error(`${validate[0]?.message}`);
    } else {
      const response = await postValidatePhone(JSON.stringify({ email }));
      if (response.status === 200) {
        setLoading(false);
        setOpen({
          ...open,
          metode: true,
        });
        setPhone(response?.data?.phone);
      } else {
        toast.error(response.message);
        setLoading(false);
      }
    }
    setLoading(true);
  };

  const handleSubmitOTPandPassword = async (e) => {
    const { input1, input2, input3 } = payload;

    e.preventDefault();
    setLoading(true);

    const otpInput = {
      otp: input1 + input2 + input3,
      password: payloadPassword?.password,
    };

    if (otpInput?.otp?.length === 6) {
      const v = new Validator();
      const schema = {
        password: {
          type: 'string',
          empty: false,
          min: 8,
          messages: {
            stringMin: 'Password minimal 8 digit',
            stringEmpty: 'Password wajib diisi',
          },
        },
        rpassword: {
          type: 'equal',
          field: 'password',
          messages: {
            equalField: 'Password tidak sama',
          },
        },
      };
      const validate = v.validate(payloadPassword, schema);
      if (validate?.length) {
        toast.error(`${validate[0]?.message}`);
      } else {
        const body = JSON.stringify(otpInput);
        const data = await newPassword(body);
        if (data?.status === 200) {
          toast.success(` Berhasil Mengganti Password`);
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        } else {
          toast.error(` ${data.message}`);
        }
      }
    } else {
      toast.warning(`Kode OTP Tidak Lengkap`);
    }

    setLoading(false);
  };

  return (
    <div className='container mx-auto py-16'>
      <div className='flex'>
        <div className='w-80'>
          <Link href='/'>
            <a>
              <Image
                src='/logo_oci_new_2.svg'
                alt='ocistok'
                height={50}
                width={200}
              />
            </a>
          </Link>
        </div>
      </div>
      <div className='flex mt-20'>
        <div className='shadow-md w-4/12 mx-auto bg-white border-xl py-6 px-6 rounded-xl'>
          <h1 className='text-xl font-bold text-orange-500 text-center'>
            Reset Password
          </h1>
          <form name='form' onSubmit={handlephonevalidation} className='mt-8'>
            <div className='mb-4'>
              <input
                className='text-sm py-2 px-3 w-full shadow appearance-none text-gray-700 bg-white border rounded-md focus:border-orange-500 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50 border-orange-400'
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Masukan email anda'
              />
            </div>
            <div className='flex items-center justify-center'>
              {loading ? (
                <Spinner />
              ) : (
                <button
                  className='shadow bg-gradient-to-r from-orange-400 to-red-500 hover:bg-purple-400 text-white py-2 px-6 rounded-lg'
                  type='submit'
                >
                  Reset Password
                </button>
              )}
            </div>
            <div className='flex justify-center mt-4'>
              <p className='text-sm text-gray-400'>
                <Link href='/login'>
                  <a className='ml-1 font-bold text-orange-400 hover:text-orange-600'>
                    Kembali masuk
                  </a>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Dialog Pilih Metode */}
      <Dialog
        open={open.metode}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            <p className='text-gray-700 text-center'>
              Pilih Metode Verifikasi Reset Password
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className='flex space-x-3 p-3'>
            <button
              name='metodeEmail'
              className='text-white py-2 px-2 bg-orange-500 rounded-md'
              onClick={handleSubmitEmail}
            >
              <EmailIcon /> Verifikasi Melalui Email
            </button>
            <button
              name='metodeWhatsapp'
              className='text-white py-2 px-2 bg-green-500 rounded-md'
              onClick={handleSubmitWhatsapp}
            >
              <WhatsAppIcon />
              {phone
                ? `Verifikasi Melalui WhatsApp`
                : 'Email Tidak Terdaftar Dengan Telephone'}
            </button>
          </div>
        </DialogActions>
      </Dialog>

      {/* Dialog Metode Email */}
      <Dialog
        open={open.verifikasiEmail}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{'Password anda telah berhasil di reset'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            <p className='0text-gray-700'>
              Kami telah mengirimkan link verifikasi ke email{' '}
              <span className='text-orange-500'>{email}</span> untuk mereset
              password anda.
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className='flex space-x-3 p-3'>
            <button
              className='text-white py-2 px-2 bg-orange-500 rounded-md'
              onClick={() => router.push('/login')}
            >
              Masuk Sekarang
            </button>
            <button
              className='text-white py-2 px-2 bg-orange-500 rounded-md'
              onClick={() => router.push('/')}
            >
              Halaman Utama
            </button>
          </div>
        </DialogActions>
      </Dialog>

      {/* Dialog Metode WhatsApp */}
      <Dialog
        open={open.verifikasiWhatsapp}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{'Password anda telah berhasil di reset'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            <p className='text-gray-700'>
              Kami telah mengirimkan Kode OTP ke Nomor{' '}
              <span className='text-orange-500'>{phone}</span> untuk mereset
              password anda.
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className='flex flex-col justify-center items-center w-full space-y-3 pb-3'>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <div className='text-xs font-bold text-orange-500'>
                  Masukan Kode OTP Di bawah
                </div>
                <div className='border-orange-500 border flex flex-row rounded-md py-1 px-5'>
                  <input
                    className='text-lg py-1 px-3 w-16  appearance-none text-gray-500 font-bold text-center bg-white border-b-2 border-gray-300 focus:outline-none'
                    type='text'
                    pattern='\d*'
                    maxLength='2'
                    value={payload.input1}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        input1: e.target.value,
                      })
                    }
                  />
                  <div className='text-5xl text-orange-500 mb-1 rounded-md'>
                    -
                  </div>
                  <input
                    className='text-lg py-1 px-3 w-16  appearance-none text-gray-500 font-bold text-center bg-white border-b-2 border-gray-300 focus:outline-none'
                    type='text'
                    pattern='\d*'
                    maxLength='2'
                    value={payload.input2}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        input2: e.target.value,
                      })
                    }
                  />
                  <div className='text-5xl text-orange-500 mb-1 rounded-md'>
                    -
                  </div>
                  <input
                    className='text-lg py-1 px-3 w-16  appearance-none text-gray-500 font-bold text-center bg-white border-b-2 border-gray-300 focus:outline-none'
                    type='text'
                    pattern='\d*'
                    maxLength='2'
                    value={payload.input3}
                    onChange={(e) =>
                      setPayload({
                        ...payload,
                        input3: e.target.value,
                      })
                    }
                  />
                </div>

                <div className='text-xs font-bold text-orange-500 text-center mt-5'>
                  Masukan Password Baru
                </div>
                <form className='mt-8' onSubmit={handleSubmitOTPandPassword}>
                  <div className='mb-4'>
                    <input
                      className='shadow appearance-none border border-orange-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      name='password'
                      value={payloadPassword.password}
                      onChange={(e) =>
                        setPayloadPassword({
                          ...payloadPassword,
                          password: e.target.value,
                        })
                      }
                      type='password'
                      placeholder='Masukan password baru anda'
                    />
                  </div>
                  <div className='mb-4'>
                    <input
                      className='shadow appearance-none border border-orange-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      name='rpassword'
                      value={payloadPassword.rpassword}
                      type='password'
                      onChange={(e) =>
                        setPayloadPassword({
                          ...payloadPassword,
                          rpassword: e.target.value,
                        })
                      }
                      placeholder='Ulangi password baru anda'
                    />
                  </div>
                  <div className='flex items-center justify-center'>
                    <button
                      className='shadow bg-gradient-to-r from-orange-400 to-red-500 hover:bg-purple-400 text-white py-2 px-6 rounded-lg'
                      type='submit'
                    >
                      Submit Kode OTP & Password
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ForgetPassword;
