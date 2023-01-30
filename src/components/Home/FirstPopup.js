import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import { getFirstTimeCustomer } from 'constants/api/member';
import users from 'helpers/users';

const FirstPopup = () => {
  const [showModal, setShowModal] = useState({
    firstPopup: false,
    firstLogin: false,
  });

  const fetDataFirsTimeCustomer = async (data) => {
    const body = { ...data, isLogin: false };

    const response = await getFirstTimeCustomer(JSON.stringify(body));
    if (response?.status === 200) {
      setShowModal({
        ...showModal,
        firstLogin: true,
      });
    }
  };

  const handleCloseAllBanner = (e) => {
    setShowModal({
      firstPopup: false,
      firstLogin: false,
    });
  };

  useEffect(() => {
    const dataUser = users();

    if (dataUser?.is_first_time === true) {
      setShowModal({
        ...showModal,
        firstLogin: true,
      });
      fetDataFirsTimeCustomer(dataUser);
    } else {
      setShowModal({
        ...showModal,
        firstPopup: true,
      });
    }
  }, []);

  if (showModal?.firstLogin) {
    return (
      <>
        <div
          onClick={handleCloseAllBanner}
          className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999]'
        >
          <div className='relative w-96'>
            <div className='absolute top-5 right-3 hover:scale-110 duration-200 bg-white rounded-full'>
              <button
                name='buttonClose'
                onClick={(e) => handleCloseAllBanner(e)}
              >
                <CancelIcon className='text-red-500' fontSize='large' />
              </button>
            </div>
            <div className='h-[500px] w-100'>
              <Link href='/register'>
                <a>
                  <img
                    src='https://ocistok.co.id/control-panel/foto/banner_first_login.png'
                    layout='fill'
                    objectfit='cover'
                    className='rounded-md'
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className='w-full h-screen opacity-20 fixed inset-0 z-[998] bg-black'></div>
      </>
    );
  }

  if (showModal?.firstPopup) {
    return (
      <>
        <div
          onClick={handleCloseAllBanner}
          className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[999]'
        >
          <div className='relative w-96'>
            <div className='absolute right-3 top-5'>
              <button
                name='buttonClose'
                onClick={(e) => handleCloseAllBanner(e)}
              >
                <CloseIcon
                  className='text-red-500 rounded-full bg-white hover:scale-110 transition-transform duration-300 ease-in-out'
                  fontSize='large'
                />
              </button>
            </div>
            <div className='h-[500px] w-100'>
              <Link href='/register'>
                <a>
                  <img
                    src='https://ocistok.co.id/control-panel/foto/Banner_popup.png'
                    layout='fill'
                    objectfit='cover'
                    className='rounded-md'
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className='opacity-20 fixed inset-0 z-[998] bg-black'></div>
      </>
    );
  }

  return null;
};

export default FirstPopup;
