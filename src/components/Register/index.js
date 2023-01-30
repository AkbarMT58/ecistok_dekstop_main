import {
  getTrackingRegister,
  sendCodeOTP,
  NewSignUp,
} from "constants/api/member";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { useRouter } from "next/router";
import listCategory from "data/categoy.json";
import swal from "sweetalert";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Countdown from "components/Global/Countdown";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Register = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showInputOTP, setShowInputOTP] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { data } = listCategory;
  const [registerData, setRegisterData] = useState({
    nama_lengkap: "",
    // nama_depan: "",
    // nama_belakang: "",
    telepon: "",
    gender: "",
    email: "",
    password: "",
    rpassword: "",
    kategori: "",
    otp: "",
    device: "web desktop",
  });
  const [onblur, setOnblur] = useState({
    nama_lengkap: true,
    // nama_depan: false,
    // nama_belakang: false,
    telepon: false,
    gender: "",
    email: false,
    password: false,
    rpassword: false,
    kategori: "",
    otp: false,
  });
  const [isBolean, setIsBolean] = useState({
    is_otpinputed: false,
  });

  const handleClose = () => {
    setOpen(false);
    setIsloading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "nama_lengkap" //||
      // name === "nama_depan" ||
      // name === "nama_belakang"
    ) {
      setRegisterData((prev) => {
        return { ...prev, [name]: value.replace(/[^a-zA-Z ]/g, "") };
      });
    } else {
      setRegisterData((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  const handleChangeOtp = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => {
      if (!value || value == 0) {
        setIsBolean({
          ...isBolean,
          is_otpinputed: false,
        });
      } else {
        setIsBolean({
          ...isBolean,
          is_otpinputed: true,
        });
      }

      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async () => {
    const regexEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const {
      nama_lengkap,
      // nama_depan,
      // nama_belakang,
      telepon,
      email,
      password,
      rpassword,
      otp,
    } = registerData;

    if (nama_lengkap.length === 0) {
      toast.info("Konfirmasi kembali Nama Lengkap");
      return;
    }

    // if (nama_depan.length === 0) {
    //   toast.info("Konfirmasi kembali Nama Depan");
    //   return;
    // }

    // if (nama_belakang.length === 0) {
    //   toast.info("Konfirmasi kembali Nama Belakang");
    //   return;
    // }

    if (email.length === 0) {
      toast.info("Konfirmasi kembali Email");
      return;
    }

    if (regexEmail.test(email) !== true) {
      toast.info("Konfirmasi Format Email Tidak Benar");
      return;
    }

    if (telepon.length <= 7) {
      toast.info("Konfirmasi Kembali Nomor Handpone");
      return;
    }

    if (otp.length === 0) {
      toast.info("Konfirmasi Input OTP & Nomor Handpone");
      return;
    }

    if (password !== rpassword) {
      toast.info("Konfirmasi password tidak sama !");
      return;
    }

    setIsloading(true);
    const response = await NewSignUp(JSON.stringify(registerData));
    if (response?.status === 200) {
      // /tracking
      fbq("track", "CompleteRegistration", {
        status: true,
      });
      ttq.track("CompleteRegistration");

      setOpen(true);
      toast.success("Selamat, pendaftaran akun berhasil !");
      router.push("/dashboard");
    } else {
      toast.error(response?.message);
      setIsloading(false);
    }
  };

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    const filled = true;

    setOnblur((prev) => {
      return { ...prev, [name]: filled };
    });
  };

  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    setIsloading(true);

    const body = {
      nama_lengkap: registerData?.nama_lengkap,
      // nama_depan: registerData?.nama_depan,
      // nama_belakang: registerData?.nama_belakang,
      telepon: registerData?.telepon,
      email: registerData?.email,
    };

    const response = await sendCodeOTP(JSON.stringify(body));
    if (response?.status === 200) {
      setShowInputOTP(true);
      swal(
        "success",
        `OTP Terkirim Kepada Nomor ${registerData?.telepon}`,
        "success"
      );
      setIsloading(false);
    } else {
      if (response?.time) {
        const dateNow = new Date(response?.time * 1000);
        const expiryDate = new Date(
          new Date(response?.time * 1000).setMinutes(
            new Date(response?.time * 1000).getMinutes() + 5
          )
        );
        let difference = expiryDate - dateNow;
        let diff_days = Math.floor((difference / (1000 * 60)) * 60);

        swal(`${response?.message}`);
        setCountdown(diff_days);
        setIsloading(false);
      } else {
        console.log(response?.message);
        if (response?.message === "customer sudah terdaftar") {
          swal(`Email sudah terdaftar`);
          setIsloading(false);
        } else {
          swal(`${response?.message}`);
          setIsloading(false);
        }
      }
    }
  };

  const enableButton = () => {
    setCountdown(0);
  };

  useEffect(() => {
    if (!router.isReady) return;
    const { utm_id, utm_medium, utm_source } = router.query;
    getTrackingRegister(utm_source, utm_medium, utm_id);
  }, [router.isReady]);

  return (
    <div className="bg-white">
      <div className="container lg:container mx-auto py-5 min-h-screen font-poppins">
        <div className="flex">
          <div className="w-96">
            <Link href="/">
              <a>
                <Image
                  src="/logo_oci_new_2.svg"
                  alt="ocistok"
                  height={50}
                  width={200}
                />
              </a>
            </Link>
          </div>
        </div>

        <div className="w-full mx-auto px-0 lg:px-20 pt-5">
          <div className="flex justify-center">
            <div className="w-1/2 max-w-[500px] h-auto box-border shadow-2xl drop-shadow-lg rounded-l-3xl">
              <div className="w-full h-[100%]">
                <img
                  src="/BannerRegister.png"
                  alt="BannerRegister"
                  className="w-full h-[100%]"
                />
              </div>
            </div>

            <div className="w-1/2 bg-white px-5 py-10 shadow-2xl drop-shadow-lg rounded-r-3xl">
              <p className="text-black text-[31px] font-bold">
                Daftar <span className="text-orange-500">Gratis!</span>
              </p>
              <p className="text-[15px] text-gray-700 mt-2">
                Dan <b>DAPATKAN akses</b> jutaan produk dari <br /> Supplier &
                pabrik + <b>Produk Import Rekomendasi Usaha</b>
              </p>
              <div className="border-b-2 mt-2 border-orange-500 w-[55px]"></div>
              <form className="mt-6">
                <div className="w-full mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="nama_lengkap"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    onFocus={handleOnBlur}
                    className={`text-sm py-2 px-3 w-full shadow appearance-none text-gray-700 focus:border-orange-500 rounded-md  focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50 ${
                      onblur?.nama_lengkap
                        ? "bg-white border  border-orange-400"
                        : "bg-gray-200 border border-transparent"
                    }`}
                    value={registerData.nama_lengkap}
                    onChange={handleChange}
                    name="nama_lengkap"
                    type="text"
                    placeholder="Masukkan Nama Lengkap"
                  />
                </div>
                {/* <div className="flex flex-col md:flex-row w-full gap-x-6">
                  <div className="w-full md:w-1/2 mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="Nama depan"
                    >
                      Nama Depan
                    </label>
                    <input
                      onFocus={handleOnBlur}
                      className={`text-sm py-2 px-3 w-full shadow appearance-none text-gray-700 focus:border-orange-500 rounded-md  focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50 ${
                        onblur?.nama_depan
                          ? "bg-white border  border-orange-400"
                          : "bg-gray-200 border border-transparent"
                      }`}
                      value={registerData.nama_depan}
                      onChange={handleChange}
                      name="nama_depan"
                      type="text"
                      placeholder="Nama depan"
                    />
                  </div>
                  <div className="w-full md:w-1/2 mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="nama_belakang"
                    >
                      Nama Belakang
                    </label>
                    <input
                      onFocus={handleOnBlur}
                      className={`text-sm py-2 px-3 w-full shadow appearance-none text-gray-700 focus:border-orange-500 rounded-md  focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50 ${
                        onblur?.nama_belakang
                          ? "bg-white border border-orange-400"
                          : "bg-gray-200 border border-transparent"
                      }`}
                      value={registerData.nama_belakang}
                      onChange={handleChange}
                      name="nama_belakang"
                      type="text"
                      placeholder="Nama Belakang"
                    />
                  </div>
                </div> */}

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    onFocus={handleOnBlur}
                    className={`text-sm py-2 px-3 w-full shadow appearance-none text-gray-700 focus:border-orange-500 rounded-md  focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50 ${
                      onblur?.email
                        ? "bg-white border border-orange-400"
                        : "bg-gray-200 border border-transparent"
                    }`}
                    value={registerData.email}
                    onChange={handleChange}
                    name="email"
                    type="email"
                    placeholder="example@mail.com"
                  />
                </div>

                <div className="flex space-x-6">
                  <div className="w-1/2 mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      onFocus={handleOnBlur}
                      className={`text-sm py-2 px-3 w-full shadow appearance-none text-gray-700 focus:border-orange-500 rounded-md  focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50 ${
                        onblur?.password
                          ? "bg-white border border-orange-400"
                          : "bg-gray-200 border border-transparent"
                      }`}
                      value={registerData.password}
                      onChange={handleChange}
                      name="password"
                      type="password"
                      placeholder="******************"
                    />
                  </div>
                  <div className="w-1/2 mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="rpassword"
                    >
                      Ulangi Password
                    </label>
                    <input
                      onFocus={handleOnBlur}
                      className={`text-sm py-2 px-3 w-full shadow appearance-none text-gray-700 focus:border-orange-500 rounded-md  focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50 ${
                        onblur?.rpassword
                          ? "bg-white border border-orange-400"
                          : "bg-gray-200 border border-transparent"
                      }`}
                      value={registerData.rpassword}
                      onChange={handleChange}
                      name="rpassword"
                      type="password"
                      placeholder="******************"
                    />
                  </div>
                </div>

                <div className="flex items-end justify-between gap-5 mb-4">
                  <div className="w-full">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="telepon"
                    >
                      Nomor HP
                    </label>
                    <input
                      onFocus={handleOnBlur}
                      className={`text-sm py-2 px-3 w-full shadow appearance-none text-gray-700 focus:border-orange-500 rounded-md  focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50 ${
                        onblur?.telepon
                          ? "bg-white border border-orange-400"
                          : "bg-gray-200 border border-transparent"
                      }`}
                      onChange={handleChange}
                      name="telepon"
                      type="number"
                      placeholder="088112233xxx"
                    />
                  </div>
                  <button
                    disabled={
                      registerData?.telepon.length < 7
                        ? true
                        : countdown !== 0
                        ? true
                        : false
                    }
                    onClick={(e) => handleSubmitOTP(e)}
                    className={`text-white p-2 font-light rounded-md duration-300 whitespace-nowrap ${
                      registerData?.telepon.length < 7
                        ? "bg-gray-600"
                        : countdown !== 0
                        ? "bg-gray-600"
                        : "bg-orange-500"
                    }`}
                  >
                    {countdown !== 0 ? (
                      <Countdown
                        callback={enableButton}
                        INITIAL_COUNT={countdown}
                        digits={2}
                      />
                    ) : (
                      "Kirim OTP"
                    )}
                  </button>
                </div>

                <div
                  className={`w-full h-auto transition-all duration-500 mb-4`}
                >
                  {/* <div
                    className={`${
                      showInputOTP == true ? "h-24" : "h-0"
                    } duration-300 overflow-y-hidden`}
                  > */}
                  <div className={`h-24 duration-300 overflow-y-hidden`}>
                    <div className="flex flex-col justify-center">
                      <label
                        className="text-gray-700 text-sm font-bold mb-2"
                        htmlFor="otp"
                      >
                        Masukkan Kode OTP
                      </label>
                      <input
                        onFocus={handleOnBlur}
                        name="otp"
                        onChange={(e) => handleChangeOtp(e)}
                        value={registerData?.otp}
                        type="number"
                        placeholder="Kode OTP"
                        max={5}
                        className={`text-sm py-2 px-3 w-full shadow appearance-none text-gray-700 focus:border-orange-500 rounded-md  focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50 ${
                          onblur?.otp
                            ? "bg-white border border-orange-400"
                            : "bg-gray-200 border border-transparent"
                        }`}
                      />
                      {/* <div className="text-xs text-red-400 mt-px whitespace-nowrap">
                        *Masukan OTP & Semua Form input Lalu Klik Daftar
                      </div> */}
                    </div>
                  </div>
                </div>

                <div className="w-full mb-4">
                  <label
                    className="block tracking-wide font-bold text-gray-700 text-sm mb-2"
                    htmlFor="kategori"
                  >
                    Kategori yang disukai{" "}
                    <span className="text-blue-400 text-xs font-medium">
                      ( Optional )
                    </span>
                  </label>
                  <div className="relative">
                    <select
                      className={`text-sm py-2 px-3 w-full shadow appearance-none text-gray-700 focus:border-orange-500 rounded-md  focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50 ${
                        onblur?.kategori
                          ? "bg-white border border-orange-400"
                          : "bg-white border border-transparent"
                      }`}
                      value={registerData.kategori}
                      onChange={handleChange}
                      onFocus={handleOnBlur}
                      name="kategori"
                    >
                      <option value="">Pilih Kategori</option>
                      {data.map((cat, i) => {
                        return (
                          <option key={i} value={cat.display_name}>
                            {cat.display_name}
                          </option>
                        );
                      })}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-5 mt-10">
                  <button
                    id="ga-btn-daftar"
                    onClick={handleSubmit}
                    className={`text-white p-2 px-14 font-light rounded-md ${
                      isloading === true || isBolean?.is_otpinputed === false
                        ? "bg-gray-500"
                        : "bg-red-500"
                    } `}
                    disabled={
                      isloading === true || isBolean?.is_otpinputed === false
                    }
                    type="button"
                  >
                    Daftar
                  </button>
                </div>

                {/* <div className="flex items-center justify-center gap-5 mt-10">
                  <button
                    id="ga-btn-daftar"
                    onClick={handleSubmit}
                    className={`text-white p-2 px-14 font-light rounded-md ${
                      isloading === true
                        ? "bg-gray-500"
                        : "bg-red-600 hover:bg-red-700"
                    } `}
                    disabled={isloading === true ? true : false}
                    type="button"
                  >
                    Daftar
                  </button>
                </div> */}

                <div className="flex justify-center mt-5">
                  <p className="text-sm text-gray-400">
                    Sudah punya akun?
                    <Link href="/login">
                      <a className="ml-1 font-bold text-blue-400 hover:text-orange-500">
                        Masuk
                      </a>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        className="rounded-3xl"
      >
        <div className="px-5 py-6 rounded-3xl">
          <div className="flex flex-col items-center">
            <DoneAllIcon className="text-green-500 text-6xl animate-bounce" />
            <div className="block text-gray-500 font-semibold mb-2 text-xl text-center">
              <span className="text-blue-400 capitalize">
                {registerData?.email}
              </span>
              <br />
              Berhasil Di Daftarkan, Login Sekarang
            </div>
          </div>
          <div className="flex justify-center mt-5 gap-5">
            <button
              onClick={() => router.push("/login")}
              className="px-5 py-2 bg-orange-500 text-white font-light rounded-md"
            >
              Login
            </button>
            <button
              onClick={handleClose}
              className="px-5 py-2 bg-orange-500 text-white font-light rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Register;
