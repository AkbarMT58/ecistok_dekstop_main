import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Comment from "components/Global/Comment";
import { NoteAddIcon } from "components/Global/Icons";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ModalComment({ idComment }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        onClick={handleOpen}
        className='flex space-x-1 bg-orange-200 px-2 py-1 rounded-md'>
        <NoteAddIcon fontSize='small' className='text-orange-500' />
        <p className='text-sm text-orange-600'>Komentar</p>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Comment id={idComment} />
        </Box>
      </Modal>
    </div>
  );
}
