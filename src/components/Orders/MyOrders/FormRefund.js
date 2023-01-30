import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { toast } from "react-toastify";
import Spinner from "components/Global/Spinner";
import { refundOrder } from "constants/api/member";

const FormRefund = ({ id, produk, onDismiss }) => {
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState({
    id_so: id,
    nama: "",
    bank: "",
    rekening: "",
    keterangan: "",
    bukti: [],
    produk: produk,
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setBody({ ...body, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const validateRekening = /^[0-9]+$/.test(body.rekening.trim());
    if (body.id_so === 0) {
      toast.error("Gagal mengajukan refund");
    } else if (body.nama.trim().length === 0) {
      toast.error("Lengkapi field nama");
    } else if (body.bank.trim().length === 0) {
      toast.error("Lengkapi field nama bank");
    } else if (body.rekening.trim().length < 5 && !validateRekening) {
      toast.error("Nomor rekening tidak valid");
    } else if (body.bukti.length < 3) {
      toast.error("Bukti minimal 3 gambar");
    } else {
      const response = await refundOrder(JSON.stringify(body));
      if (response.status === 200) {
        toast.success("Berhasil Mengajukan refund");
      } else {
        toast.error("Gagal mengajukan refund");
      }
      onDismiss();
    }
    setLoading(false);
  };

  const handleUpload = async (e) => {
    const img = e.target.files;
    const arrImg = [];
    if (img.length > 0) {
      setLoadingUpload(true);
      for (let i = 0; i < img.length; i++) {
        if (img[i].size > 5000000) {
          toast.error("Size gambar terlalu besar");
        } else {
          let formData = new FormData();
          formData.append("gambar", img[i]);
          const response = await fetch(process.env.URL_UPLOAD, {
            method: "POST",
            body: formData,
          });
          const result = await response.json();
          if (result.status === 200) {
            arrImg.push({
              gambar: "https://ocistok.co.id/control-panel/foto/" + result.file,
            });
          } else {
            toast.error(result.message);
          }
        }
      }
      setLoadingUpload(false);
      setBody({ ...body, bukti: arrImg });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <div className='flex justify-center'>
        <p className='font-semibold border-b-4 border-orange-500 pb-1'>
          Masukan Data Refund
        </p>
      </div>
      <div className='flex mt-2 flex-col space-y-1 text-gray-700'>
        <label>Nama :</label>
        <input
          name='nama'
          value={body.nama}
          onChange={handleChange}
          className='py-1 px-2 focus:outline-none border border-gray-300 rounded-md'
        />
      </div>
      <div className='flex mt-2 flex-col space-y-1 text-gray-700'>
        <label>Nama Bank :</label>
        <input
          name='bank'
          value={body.bank}
          onChange={handleChange}
          className='py-1 px-2 focus:outline-none border border-gray-300 rounded-md'
        />
      </div>
      <div className='flex mt-2 flex-col space-y-1 text-gray-700'>
        <label>Nomor Rekening :</label>
        <input
          name='rekening'
          value={body.rekening}
          onChange={handleChange}
          className='py-1 px-2 focus:outline-none border border-gray-300 rounded-md'
        />
      </div>
      <div className='flex mt-2 flex-col space-y-1 text-gray-700'>
        <input
          type='file'
          id='upload-file'
          multiple
          accept='image/*'
          onChange={handleUpload}
          className='hidden py-1 px-2 focus:outline-none rounded-md'
        />
        <p>Bukti Refund (Minimal 3):</p>
        <div className='flex items-center space-x-2'>
          <label htmlFor='upload-file'>
            {loadingUpload ? (
              <Spinner />
            ) : (
              <IconButton
                className='text-gray-500'
                aria-label='upload picture'
                component='span'>
                <PhotoCameraIcon />
              </IconButton>
            )}
          </label>
          <div className='flex space-x-4'>
            {body.bukti.map((img, i) => {
              return <img key={i} src={img.gambar} height={25} width={25} />;
            })}
          </div>
        </div>
        <p className='text-red-500 text-xs'>
          *format .jpg, .png (maks 5mb / gambar)
        </p>
      </div>
      <div className='flex mt-2 flex-col space-y-1 text-gray-700'>
        <label>Keterangan :</label>
        <input
          name='keterangan'
          value={body.keterangan}
          onChange={handleChange}
          className='py-1 px-2 focus:outline-none border border-gray-300 rounded-md'
        />
      </div>
      <div className='flex justify-center'>
        <button
          type={`${loading ? "button" : "submit"}`}
          className={`mt-3 ${
            loading ? "bg-gray-600" : "bg-orange-500"
          } rounded-md text-white px-5 py-1`}>
          Kirim
        </button>
      </div>
    </form>
  );
};

export default FormRefund;
