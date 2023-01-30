import { verifyAccount } from "constants/api/member";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Router from "next/router";
import Spinner from "components/Global/Spinner";

export default function VerificationAccount({ token }) {
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const postToken = useCallback(async () => {
    setLoading(true);
    const response = await verifyAccount(JSON.stringify({ otp: token }));
    if (response.status === 200) {
      setValid(true);
      setTimeout(() => {
        Router.push("/login");
      }, 5000);
    } else {
      setValid(false);
    }
    setLoading(false);
  }, [valid]);

  useEffect(() => {
    postToken();
  }, []);

  return loading ? (
    <div className='h-screen flex justify-center items-center'>
      <Spinner label='Mohon tunggu' />
    </div>
  ) : (
    <div className='container-app mx-auto bg-white px-3'>
      <div className='flex space-y-5 flex-col min-h-screen justify-center items-center text-center'>
        <img src='/logo_oci_new_1.svg' height={80} width={200} />
        <img
          src={valid ? `/checked.svg` : `/error.svg`}
          height={100}
          width={100}
        />
        <p className='text-xl text-gray-700'>
          {valid
            ? "Selamat verifikasi akun telah berhasil, Anda akan dialihkan kehalaman login secara otomatis"
            : "Mohon maaf, link verifikasi anda tidak valid"}
        </p>
        <Link href='/'>
          <a className='text-orange-500'>Pergi ke halaman login sekarang</a>
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const { token } = query;

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { token },
  };
}
