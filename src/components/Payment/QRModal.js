import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { getPaymentStatus } from "constants/api/product";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

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

export default function QRModal({ open, setOpen, url, id }) {
  const [checkPayment, setCheckPayment] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getStatus = async () => {
    const response = await getPaymentStatus(id);

    if (response?.data?.status === "pending") {
      setRefresh(!refresh);
    } else if (response?.data?.status === "failed") {
      router.back();
      toast.error(
        "Pembayaran anda gagal, coba pilih metode pembayaran lainnya"
      );
    } else {
      setLoading(false);
      toast.success("Pembayaran anda telah berhasil");
      setTimeout(() => {
        router.push("/thankyou");
      }, []);
    }
  };

  useEffect(() => {
    if (open) {
      setLoading(true);
      setTimeout(() => {
        getStatus();
      }, 5000);
    }
  }, [refresh, checkPayment]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Scan Qr Code
            </Typography>
            <div>
              <p>Selesaikan pembayaran anda dengan scan QR dibawah ini.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="shadow-lg rounded-lg text-center">
                <img src={url} className="w-full object-contain h-72" />
              </div>
              <button
                className="bg-orange-500 py-2 px-3 text-white rounded-md flex items-center space-x-3 mt-3"
                onClick={() => setCheckPayment(!checkPayment)}
              >
                <p>{loading ? "Loading" : "Cek Pembayaran"}</p>{" "}
                {loading && <CircularProgress size={20} color="warning" />}
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
