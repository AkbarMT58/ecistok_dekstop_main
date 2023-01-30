import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { setLogin } from 'constants/api/auth';
import useInput from 'hooks/use-input';
import jwt_decode from 'jwt-decode';
import Spinner from 'components/Global/Spinner';
import Banner from 'components/AboutUs/Banner';
import BannerCariProduct from 'components/Global/BannerCariProduct';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';
import { getTrackingOctf } from 'constants/api/member';
import swal from 'sweetalert';

const Login = () => {
  const router = useRouter();
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    value: enteredName,
    hasError: nameInputHasError,
    valueIsValid: nameIsValid,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: resetName,
  } = useInput(
    (value) => value.trim() !== '' && re.test(String(value).toLocaleLowerCase())
  );
  const {
    value: enteredPassword,
    hasError: passwordInputHasError,
    valueIsValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput((value) => value.trim() !== '' && value.length >= 6);

  //Validation feedback
  const nameValidationFeedback =
    enteredName.trim() === ''
      ? 'Email required!'
      : !re.test(String(enteredName).toLocaleLowerCase()) &&
        'Email format not valid.';

  const passwordValidationFeedback =
    enteredPassword.trim() === ''
      ? 'Password required!'
      : enteredPassword.trim().length < 6 && 'Password at least 6 characters';

  let formIsValid = false;
  if (passwordIsValid && nameIsValid) {
    formIsValid = true;
  }

  const loginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      email: enteredName,
      password: enteredPassword,
    };

    if (!data.email || !data.password) {
      toast.error('Email dan Password wajib diisi !');
      setLoading(false);
    } else {
      const response = await setLogin(JSON.stringify(data));
      if (response?.status > 201) {
        toast.error(response.message);
        setLoading(false);
      } else {
        const tokenBase64 = btoa(response.access_token);
        Cookies.set('token', tokenBase64, {
          expires: parseInt(process.env.EXPIRED_TOKEN_DAY),
        });
        const { data } = jwt_decode(response.access_token);
        if (data) {
          const { redirect, fullUrl } = router.query;

          if (redirect) {
            toast.info('Anda Akan Di Redirect Ke Halaman Sebelumnya');
            setTimeout(() => {
              if (fullUrl) {
                router.push(redirect);
              } else {
                router.push('https:ocistok.com/product/' + redirect);
              }
            }, 2000);
          } else {
            router.push('/');
          }
        } else {
          router.push('/login');
        }

        // if (data.is_verified) {
        //   toast.success('Berhasil masuk akun');
        //   const { redirect, fullUrl } = router.query;

        //   if (redirect) {
        //     toast.info('Anda Akan Di Redirect Ke Halaman Sebelumnya');
        //     setTimeout(() => {
        //       if (fullUrl) {
        //         router.push(redirect);
        //       } else {
        //         router.push('https://ocistok.com/product/' + redirect);
        //       }
        //     }, 2000);
        //   } else {
        //     router.push('/');
        //   }
        // } else {
        //   toast.warning('Silahkan verifikasi akun anda');
        //   router.push('/validate_account');
        // }
      }
    }
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
      <div className='flex flex-col mt-20'>
        <div className='shadow-md w-4/12 mx-auto bg-white border-xl py-6 px-8 rounded-xl'>
          <h1 className='text-xl font-bold text-orange-500 text-center mb-2'>
            Masuk ke akunmu
          </h1>
          <form onSubmit={loginSubmit}>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='username'
              >
                Email
              </label>
              <input
                className={`text-sm py-2 px-3 w-full shadow appearance-none text-gray-700 bg-white border rounded-md focus:border-orange-500 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50 ${
                  nameInputHasError
                    ? 'border-red-500 ring ring-red-300 outline-none'
                    : 'border-orange-400'
                }`}
                id='username'
                type='email'
                placeholder='Email'
                value={enteredName}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
              />
              {nameInputHasError && (
                <p className='text-xs text-red-500 mt-1'>
                  {nameValidationFeedback}
                </p>
              )}
            </div>
            <div className='mb-6'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='password'
              >
                Password
              </label>
              <div
                className={`flex text-sm shadow appearance-none text-gray-700 bg-white border rounded-md p-px focus:border-orange-500 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50 ${
                  passwordInputHasError
                    ? 'border-red-500 ring ring-red-300 outline-none'
                    : 'border-orange-400'
                }`}
              >
                <input
                  className='outline-none py-2 px-3 w-full'
                  id='password'
                  type={`${showPassword ? 'text' : 'password'}`}
                  placeholder='***********'
                  value={enteredPassword}
                  onChange={passwordChangeHandler}
                  onBlur={passwordBlurHandler}
                />
                <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? (
                    <VisibilityOffIcon className='text-orange-500' />
                  ) : (
                    <VisibilityIcon className='text-orange-500' />
                  )}
                </IconButton>
              </div>
              {passwordInputHasError && (
                <p className='text-xs text-red-500 mt-1'>
                  {passwordValidationFeedback}
                </p>
              )}
            </div>
            {loading ? (
              <div className='h-10'>
                <Spinner />
              </div>
            ) : (
              <div className='flex items-center justify-between'>
                <button
                  disabled={loading}
                  className='shadow bg-gradient-to-r from-orange-400 to-red-500 hover:bg-purple-400 text-white py-2 px-6 rounded-lg'
                  type='submit'
                >
                  Masuk
                </button>
                <Link href='/forgetpassword'>
                  <a className='inline-block align-baseline font-bold text-sm text-orange-400 hover:text-orange-600'>
                    Lupa Password?
                  </a>
                </Link>
              </div>
            )}
            <div className='flex justify-center mt-4'>
              <p className='text-sm text-gray-400'>
                Tidak punya akun?
                <Link href='/register'>
                  <a className='ml-1 font-bold text-orange-400 hover:text-orange-600'>
                    Daftar
                  </a>
                </Link>
              </p>
            </div>
          </form>
        </div>
        <BannerCariProduct classNameLayout='mt-20' pages='login' />
      </div>
    </div>
  );
};

export default Login;
