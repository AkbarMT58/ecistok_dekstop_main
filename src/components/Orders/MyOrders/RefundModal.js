import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import Typography from "@mui/material/Typography";
import Tracking from "./Tracking";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import FormRefund from "./FormRefund";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: 600,
  bgcolor: "background.paper",
  border: "2px solid lightgray",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

export default function RefundModal({ orderData }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div className="text-right my-2">
        {orderData.is_refund && (
          <button
            onClick={() => {
              handleOpen();
            }}
            className={`bg-red-600 py-1 px-4 rounded-md text-white text-sm`}
          >
            Ajukan Refund
          </button>
        )}
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="overflow-y-scroll modal-scroll">
            <div className="flex justify-end -mt-5">
              <IconButton onClick={handleClose} style={{ textAlign: "right" }}>
                <CloseIcon />
              </IconButton>
            </div>
            <FormRefund
              id={orderData.id_so}
              produk={orderData.Produk}
              onDismiss={handleClose}
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
