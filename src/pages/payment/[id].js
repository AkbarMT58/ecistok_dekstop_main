import { useState, useEffect, useCallback } from 'react';
import {
  ArrowBackIosIcon,
  DescriptionIcon,
  WarningIcon,
} from 'components/Global/Icons';
import { useRouter } from 'next/router';
import { getPayment } from 'constants/api/member';
import formatFullDate from 'helpers/formatFullDate';
import Countdown from 'components/Payment/Countdown';
// import BankTransfer from "components/Payment/BankTransfer";
import CreditCard from 'components/Payment/CreditCard';
import SpinnerDialog from 'components/Global/SpinnerLoading';
import Ewallet from 'components/Payment/Ewallet';
import ContainerGeneral from 'components/Layout/ContainerGeneral';
import Footer from 'components/Layout/Footer';
import Header from 'components/Layout/Header';
import VirtualAccount from 'components/Checkout/VirtualAccount';
import { toast } from 'react-toastify';
import Qris from 'components/Payment/Qris';
import Alfamart from 'components/Payment/Alfamart';
import midtransResponse from 'helpers/midtransResponse';
import CreditCardXendit from 'components/Payment/CreditCardXendit';

const Payment = ({ id }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [timer, setTimer] = useState(0);

  const callPayment = useCallback(async () => {
    setLoading(true);
    const response = await getPayment(id);
    if (response.status <= 201) {
      if (response.PaymentType === 'manual') {
        router.push('/404/page');
      }
      let dateTransaction;

      if (
        response.PaymentType === 'credit_card' ||
        response.PaymentType === 'credit_card_xendit'
      ) {
        dateTransaction = response?.data?.tanggal.replace(/\s/, 'T');

        let now = new Date();
        let expiryDate = new Date(
          new Date(dateTransaction).setHours(
            new Date(dateTransaction).getHours() + 48
          )
        );
        let difference = expiryDate - now;
        let diff_days = Math.floor(difference / (1000 * 60));
        setTimer(diff_days * 60);
        response.data.expiryDate = formatFullDate(expiryDate);

        // facebook pixel Purchase
        fbq('track', 'Purchase', {
          currency: 'IDR',
          value: response?.data?.gross,
        });
        // Google Tag Manager Purchase
        gtag('event', 'conversion', {
          send_to: 'AW-617636049/CigvCJzssa0DENHBwaYC',
          value: response?.data?.gross,
          currency: 'IDR',
          transaction_id: response?.data?.order_id,
        });
      } else if (response.PaymentType === 'qris') {
        dateTransaction = response?.body?.transaction_time.replace(/\s/, 'T');

        let now = new Date();
        let expiryDate = new Date(dateTransaction);
        expiryDate.setHours(expiryDate.getHours());
        expiryDate.setMinutes(expiryDate.getMinutes() + 21);
        let difference = expiryDate - now;
        let diff_days = Math.floor(difference / (1000 * 60));

        setTimer(diff_days * 60);
        response.body.expiryDate = formatFullDate(expiryDate);

        // facebook pixel Purchase
        fbq('track', 'Purchase', {
          currency: 'IDR',
          value: response?.body?.gross_amount,
        });
        // Google Tag Purchase
        gtag('event', 'conversion', {
          send_to: 'AW-617636049/CigvCJzssa0DENHBwaYC',
          value: response?.body?.gross_amount,
          currency: 'IDR',
          transaction_id: response?.body?.order_id,
        });
      } else {
        dateTransaction = response?.body?.transaction_time.replace(/\s/, 'T');

        let now = new Date();
        let expiryDate = new Date(
          new Date(dateTransaction).setHours(
            new Date(dateTransaction).getHours() + 48
          )
        );
        let difference = expiryDate - now;
        let diff_days = Math.floor(difference / (1000 * 60));

        setTimer(diff_days * 60);
        // response.data.expiryDate = formatFullDate(expiryDate);

        // facebook pixel Purchase
        fbq('track', 'Purchase', {
          currency: 'IDR',
          value: response?.body?.gross_amount,
        });
        gtag('event', 'conversion', {
          send_to: 'AW-617636049/CigvCJzssa0DENHBwaYC',
          value: response?.body?.gross_amount,
          currency: 'IDR',
          transaction_id: response?.body?.order_id,
        });
      }

      setData(response);
    } else if (response.status === 404) {
      router.push('/404/page');
    } else {
      toast.error(midtransResponse(response.status), {
        position: 'top-center',
      });
      router.push('/500');
    }

    setLoading(false);
  }, [data]);

  useEffect(() => {
    callPayment();
  }, []);

  return (
    <>
      <ContainerGeneral>
        <Header />
        {loading ? (
          <SpinnerDialog />
        ) : (
          <div className='max-width-app bg-white rounded-xl py-5 mt-10'>
            <div className='max-w-2xl mx-auto bg-white rounded-md p-1 '>
              <div className='bg-white py-3'>
                <div className='container mx-auto text-gray-700'>
                  <div className='bg-[#FFFAE6] flex justify-center items-center space-x-3 py-3 mb-2 rounded-md'>
                    {/* <WarningIcon className="text-[#F1B141]" />{" "} */}
                    <div className='flex flex-col text-sm'>
                      <p className='font-bold'>
                        Yuk, buruan selesaikan pembayaranmu
                      </p>
                      <p>Segera bayar sebelum waktunya habis !</p>
                    </div>
                  </div>
                  <div className='flex flex-col justify-center items-center'>
                    <p className='font-bold text-sm'>
                      Selesaikan pembayaran dalam
                    </p>
                    {timer > 0 ? (
                      <Countdown INITIAL_COUNT={timer} />
                    ) : (
                      <p className='text-red-500 text-lg font-semibold'>
                        Expired
                      </p>
                    )}
                    <p className='text-md'>Batas Akhir Pembayaran</p>
                    <div className='flex font-semibold justify-between items-enter'>
                      <p className='text-sm font-bold'>
                        {data?.PaymentType === 'credit_card'
                          ? data?.data?.expiryDate
                          : data?.body?.expiryDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {data?.PaymentType === 'bca' ||
              data?.PaymentType === 'permata' ||
              data?.PaymentType === 'mandiri' ||
              data?.PaymentType === 'bri' ||
              data?.PaymentType === 'bni' ? (
                <VirtualAccount data={data} timer={timer} />
              ) : data?.PaymentType === 'credit_card' ? (
                <CreditCard data={data} timer={timer} />
              ) : data?.PaymentType === 'credit_card_xendit' ? (
                <CreditCardXendit data={data} timer={timer} />
              ) : data?.PaymentType === 'alfamart' ? (
                <Alfamart data={data} timer={timer} />
              ) : data?.PaymentType === 'qris' ? (
                <Qris data={data} timer={timer} />
              ) : (
                <Qris data={{ ...data, payment_type: 'qris' }} timer={timer} />
              )}
            </div>
          </div>
        )}
      </ContainerGeneral>
      <Footer />
    </>
  );
};

export default Payment;

export async function getServerSideProps({ req, params }) {
  const { token } = req.cookies;
  const { id } = params;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { id },
  };
}
