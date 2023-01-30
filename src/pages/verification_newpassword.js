import { useEffect, useState } from 'react';
import Validator from 'fastest-validator';
import { toast } from 'react-toastify';
import Router from 'next/router';
import { newPassword } from 'constants/api/member';
import Spinner from 'components/Global/Spinner';
import Link from 'next/link';
import Image from 'next/image';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';

const VerificationNewPassword = ({ token }) => {
  const [payload, setPayload] = useState({
    otp: token,
    password: '',
    rpassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    rpassword: false,
  });
  const patern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*'])[a-zA-Z0-9!@#$%^&*]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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

    const validate = v.validate(payload, schema);

    if (validate?.length) {
      toast.error(`${validate[0]?.message}`);
      setLoading(false);
    } else {
      const response = await newPassword(
        JSON.stringify({ otp: payload.otp, password: payload.password })
      );
      if (response.status === 200) {
        toast.success('Password anda berhasil diganti, silahkan login');
        Router.push('/login');
      } else {
        toast.error(response.message);
        setLoading(false);
      }
    }
  };

  return (
    <>
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
        <div className='flex w-full justify-center items-center mt-32'>
          <div className='shadow-md w-4/12 mx-auto bg-white border-xl py-6 px-8 rounded-xl'>
            <h1 className='text-xl font-bold text-orange-500 text-center'>
              Masukan Password Baru
            </h1>
            <form className='mt-8' onSubmit={handleSubmit}>
              <div className='mb-4'>
                <div className='shadow appearance-none border border-orange-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex'>
                  <input
                    className='w-full focus:outline-none'
                    name='password'
                    value={payload.password}
                    onChange={(e) =>
                      setPayload({ ...payload, password: e.target.value })
                    }
                    type={showPassword?.password ? 'text' : 'password'}
                    placeholder='Masukan password baru anda'
                  />
                  <IconButton
                    className='m-0 p-0'
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        password: !showPassword.password,
                      })
                    }
                  >
                    {showPassword?.password ? (
                      <VisibilityOffIcon className='text-orange-500' />
                    ) : (
                      <VisibilityIcon className='text-orange-500' />
                    )}
                  </IconButton>
                </div>
                {payload.password.length > 0 && (
                  <div className='flex mt-1 px-1'>
                    <div
                      className={`h-2 duration-700 ease-out rounded-l-md ${
                        payload.password.length > 1 ? 'w-1/4 bg-red-500' : 'w-0'
                      }`}
                    ></div>
                    <div
                      className={`h-2 duration-700 ease-out ${
                        payload.password.length >= 8
                          ? 'w-1/4 bg-yellow-500'
                          : 'w-0'
                      }`}
                    ></div>
                    <div
                      className={`h-2 duration-700 ease-out rounded-r-sm ${
                        payload.password.length >= 8 &&
                        patern.test(payload.password)
                          ? 'w-2/3 bg-green-500'
                          : 'w-0'
                      }`}
                    ></div>
                  </div>
                )}
              </div>
              <div className='mb-4'>
                <div className='shadow appearance-none border border-orange-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex'>
                  <input
                    className='w-full focus:outline-none'
                    name='rpassword'
                    value={payload?.rpassword}
                    type={showPassword?.rpassword ? 'text' : 'password'}
                    onChange={(e) =>
                      setPayload({ ...payload, rpassword: e.target.value })
                    }
                    placeholder='Ulangi password baru anda'
                  />
                  <IconButton
                    className='m-0 p-0'
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        rpassword: !showPassword.rpassword,
                      })
                    }
                  >
                    {showPassword?.rpassword ? (
                      <VisibilityOffIcon className='text-orange-500' />
                    ) : (
                      <VisibilityIcon className='text-orange-500' />
                    )}
                  </IconButton>
                </div>
                {payload.rpassword.length > 0 && (
                  <div className='flex mt-1 px-1'>
                    <div
                      className={`h-2 duration-700 ease-out rounded-l-sm ${
                        payload.rpassword.length > 1
                          ? 'w-1/4 bg-red-500'
                          : 'w-0'
                      }`}
                    ></div>
                    <div
                      className={`h-2 duration-700 ease-out  ${
                        payload.rpassword.length >= 8
                          ? 'w-1/4 bg-yellow-500'
                          : 'w-0'
                      }`}
                    ></div>
                    <div
                      className={`h-2 duration-700 ease-out rounded-r-sm ${
                        payload.password.length >= 8 &&
                        patern.test(payload.password)
                          ? 'w-2/3 bg-green-500'
                          : 'w-0'
                      }`}
                    ></div>
                  </div>
                )}
              </div>
              <div className='flex items-center justify-center'>
                {loading ? (
                  <Spinner />
                ) : (
                  <button
                    className='shadow bg-gradient-to-r from-orange-400 to-red-500 hover:bg-purple-400 text-white py-2 px-6 rounded-lg'
                    type='submit'
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerificationNewPassword;

export async function getServerSideProps({ query }) {
  const { token } = query;

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { token },
  };
}
