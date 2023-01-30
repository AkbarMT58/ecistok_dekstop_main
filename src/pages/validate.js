import React, { useEffect, useRef, useState } from 'react';
import { getTemplate } from 'constants/api/template';
import Heads from 'components/Heads';
import Link from 'next/link';
import Image from 'next/image';
import Spinner from 'components/Global/Spinner';
import { verifyOTPCode } from 'constants/api/member';
import { toast } from 'react-toastify';
import router from 'next/router';
import swal from 'sweetalert';
import users from 'helpers/users';
import Cookies from 'js-cookie';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const validate = ({ template }) => {
  const [dataTelephone, setDataTelephone] = useState('');
  const [newTelephone, setNewTelephone] = useState('');
  const [isModal, setIsModal] = useState(false);
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

  const handleSubmit = async (e) => {
    const { input1, input2, input3, input4, input5, input6 } = payload;

    e.preventDefault();
    setLoading(true);

    const otpInput = {
      otp: input1 + input2 + input3 + input4 + input5 + input6,
    };

    if (otpInput?.otp?.length === 6) {
      const body = JSON.stringify(otpInput);
      const data = await verifyOTPCode(body);
      if (data?.status === 200) {
        Cookies.remove('telephone');
        swal({
          title: 'Berhasil',
          text: 'Verivikasi Kode Berhasil',
          icon: 'success',
        }).then(() => {
          router.push('/login');
        });
      } else {
        toast.error(` ${data.message}`);
      }
    } else {
      toast.warning(`Kode OTP Tidak Lengkap`);
    }

    setLoading(false);
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

  const HandleChangeNumber = (e) => {
    router.push('/login');
  };

  useEffect(() => {
    const user = users();
    if (user?.is_verified === true) {
      router.push('/dashboard');
      toast.success('Akun Anda Sudah di Verifikasi');
    } else if (user?.is_verified === null) {
      router.push('/dashboard');
      toast.success('Anda Perlu Login');
    }

    // const CookiesTelepehone = Cookies.get('telephone');
    // if (!CookiesTelepehone || CookiesTelepehone === '*********') {
    //   router.push('/404');
    //   return;
    // } else {
    //   setDataTelephone(CookiesTelepehone);
    // }
  }, []);

  return (
    <div>
      <Heads title={'Validate'} />
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
          <div className='shadow-md w-1/2 mx-auto bg-white border-xl py-6 px-6 rounded-xl'>
            <div className='text-lg font-bold text-orange-500 text-center'>
              Mohon Masukan Kode OTP Untuk Verifikasi Akun Anda
            </div>
            <p className='text-base text-center text-gray-400'>
              Kode OTP Telah Dikirim Ke Nomor {dataTelephone}
            </p>

            <div className='mt-4'>
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
            </div>
            <div className='flex items-center justify-center'>
              <button
                onClick={() => setIsModal((prev) => !prev)}
                className='text-base text-center text-orange-500 mt-5 hover:scale-110 duration-300'
              >
                Change Number ?
              </button>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={isModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setIsModal((prev) => !prev)}
        aria-describedby='alert-dialog-slide-description'
      >
        <div className='w-full p-5'>
          <p className='text-base text-center text-gray-400'>
            Harap Login Dahulu Untuk mengganti Nomor Telephone
          </p>
          <div className='flex justify-center mt-5'>
            <button
              onClick={() => HandleChangeNumber()}
              className='text-white p-2 px-3 font-light rounded-md bg-red-500'
            >
              Pergi Ke Login
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default validate;

export async function getStaticProps() {
  // const template = await getTemplate('/validate');

  return {
    props: {
      // template,
    },
  };
}
