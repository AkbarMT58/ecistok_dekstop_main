import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { toast } from "react-toastify";
import Typography from "@mui/material/Typography";
import { updateProfile } from "constants/api/member";
import Cookies from "js-cookie";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  maxHeight: 600,
  bgcolor: "background.paper",
  border: "2px solid lightgray",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

export default function ConfirmPasword({
  data,
  setConfig,
  handleChange,
  config,
  handleSubmit,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setConfig({ ...config, loadingSubmit: true });
    const payload = {
      nama_lengkap: data.nama_lengkap,
      // namaDepan: data.namaDepan,
      // namaBelakang: data.namaBelakang,
      telepon: data.telepon,
      sandi: data.sandi,
    };
    const response = await updateProfile(JSON.stringify(payload));
    if (response.status === 200) {
      const tokenBase64 = btoa(response.data.token);
      Cookies.set("token", tokenBase64, {
        expires: parseInt(process.env.EXPIRED_TOKEN_DAY),
      });
      setConfig({
        ...config,
        count: config.count + 1,
        isEdit: false,
        open: false,
      });
      toast.success("Data profile berhasil di ubah");
    } else if (response.status === 403) {
      toast.error("Password yang anda masukan salah");
    } else {
      toast.error(response?.message);
      setConfig({ ...config, loadingSubmit: false });
    }
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className='text-white text-sm py-2 px-3 bg-orange-500 rounded-md'>
        Simpan Profile
      </button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Box sx={style}>
            <Typography id='transition-modal-title' variant='h6' component='h2'>
              Konfirmasi Kata Sandi
            </Typography>
            <input
              type='password'
              name='sandi'
              value={data.sandi}
              onChange={handleChange}
              placeholder='Kata Sandi'
              className='border border-gray-200 p-2 rounded-md mt-2 w-full'
            />
            <div className='flex items-center justify-end space-x-4 mt-5'>
              <button
                onClick={handleSubmitForm}
                className='bg-orange-500 py-1 px-3 text-white rounded-md'>
                Simpan
              </button>
              <button
                onClick={handleClose}
                className='bg-orange-500 py-1 px-3 text-white rounded-md'>
                Batal
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
