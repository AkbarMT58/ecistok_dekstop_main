import { profile } from "constants/api/member";
import { useState, useEffect } from "react";
import ConfirmPasword from "./ConfirmPasword";
import ResetPasswordModal from "./ResetPasswordModal";
import users from "helpers/users";

const Profile = () => {
  const [userName, setUserName] = useState();
  useEffect(() => {
    if (users().userName) {
      setUserName(users().userName); // using this to prevent REACT HYDRATION ERROR
    }
  }, []);
  const [config, setConfig] = useState({
    isEdit: false,
    open: false,
    count: 0,
    loading: false,
    loadingSubmit: false,
  });

  const [data, setData] = useState({
    nama_lengkap: "",
    // namaDepan: "",
    // namaBelakang: "",
    email: "",
    telepon: "",
    sandi: "",
    is_verified: "",
    Alamat: {
      alamat: "",
      kota: "",
      kabupaten: "",
      kode_pos: "",
    },
    initialData: {},
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const getProfile = async () => {
    setConfig({ ...config, loading: true });
    const response = await profile();
    if (response.status === 200) {
      setData({ ...response.data, initialData: response.data });
    }
    setConfig({ ...config, loading: false });
  };

  useEffect(() => {
    getProfile();
  }, [config.count]);

  const handleCancel = () => {
    setData({ ...data.initialData, initialData: data.initialData });
    setConfig({ ...config, open: false, isEdit: false });
  };

  const handleSubmit = () => {
    const validatePhone =
      /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{6,9}$/.test(data.telepon);

    if (data.namaDepan.trim().length < 2) {
      toast.error("Nama Depan Tidak valid");
    } else if (data.namaBelakang.trim().length < 2) {
      toast.error("Nama Belakang Tidak valid");
    } else if (!validatePhone) {
      toast.error("No Handphone Tidak Valid");
    } else {
      swal({
        title: "Apakah data profile sudah sesuai ?",
        buttons: true,
      }).then(async (submit) => {
        if (submit) {
          setConfig({ ...config, open: true });
        }
      });
    }
  };

  return (
    <>
      <div className="text-gray-600 mb-3">
        <h1 className="font-bold mb-2">Profil Saya</h1>
        <p className="text-sm">
          Kelola informasi profil Anda untuk mengontrol, melindungi dan
          mengamankan akun
        </p>
      </div>
      <hr />
      <div className="flex my-5 text-sm text-gray-500">
        <div className="grid gap-3 w-full">
          <div className="flex w-1/2">
            <p className="w-1/2">Nama Lengkap :</p>
            {!config.isEdit ? (
              <p className="w-1/2">{data.nama_lengkap ?? " "}</p>
            ) : (
              <input
                type="text"
                className="w-40 px-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                name="nama_lengkap"
                value={data.nama_lengkap}
                onChange={handleChange}
              />
            )}
          </div>
          {/* <div className="flex w-1/2">
            <p className="w-1/2">Nama Depan :</p>
            {!config.isEdit ? (
              <p className="w-1/2">{data.namaDepan ?? " "}</p>
            ) : (
              <input
                type="text"
                className="w-40 px-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                name="namaDepan"
                value={data.namaDepan}
                onChange={handleChange}
              />
            )}
          </div>
          <div className="flex w-1/2">
            <p className="flex w-1/2">Nama Belakang :</p>
            {!config.isEdit ? (
              <p className="flex w-1/2">{data.namaBelakang ?? " "}</p>
            ) : (
              <input
                type="text"
                className="w-40 px-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                name="namaBelakang"
                value={data.namaBelakang}
                onChange={handleChange}
              />
            )}
          </div> */}
          <div className="flex w-1/2">
            <p className="flex w-1/2">Nomor Hp :</p>
            {!config.isEdit ? (
              <p className="flex w-1/2">{data.telepon ?? " "}</p>
            ) : (
              <input
                type="text"
                className="w-40 px-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50"
                name="telepon"
                value={data.telepon}
                onChange={handleChange}
              />
            )}
          </div>
          <div className="flex w-1/2">
            <p className="flex w-1/2">Email :</p>
            <p className="flex w-1/2">{data.email ?? " "}</p>
          </div>
          <div className="flex w-1/2">
            <p className="flex w-1/2">Kata Sandi :</p>
            <div className="flex items-center space-x-1">
              <p className="-mb-1">**********</p>
              <ResetPasswordModal />
            </div>
          </div>
          <div className="flex w-3/4">
            <p className="w-1/2">Alamat :</p>
            {data.Alamat.length > 0 && (
              <p className="capitalize w-full">
                {data?.Alamat[0]?.alamat}, {data?.Alamat[0]?.kecamatan}{" "}
                {data?.Alamat[0]?.kabupaten}, {data?.Alamat[0]?.kode_pos}
              </p>
            )}
          </div>
        </div>

        <div className="border-l px-10 w-52 flex flex-col items-center space-y-2">
          <img src="/user.png" alt="" className="block" />
          <p className="mt-2 text-xs">{userName}</p>
        </div>
      </div>
      {config.isEdit ? (
        <div className="flex items-center space-x-3">
          <ConfirmPasword
            data={data}
            setConfig={setConfig}
            config={config}
            handleSubmit={handleSubmit}
            // setUpdate={setUpdate}
            handleChange={handleChange}
          />
          <button
            onClick={handleCancel}
            className="text-white text-sm py-2 px-3 bg-orange-500 rounded-md"
          >
            Batal
          </button>
        </div>
      ) : (
        <div className="flex flex-row h-10 gap-2">
          <button
            onClick={() => setConfig({ ...config, isEdit: true })}
            className="text-white text-sm py-2 px-3 bg-orange-500 rounded-md"
          >
            Ubah Profile
          </button>
          {data?.is_verified == false && (
            <a
              href="/validate_account"
              className="text-white text-sm py-2 px-3 bg-orange-500 rounded-md flex items-center"
            >
              Validasi Account
            </a>
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
