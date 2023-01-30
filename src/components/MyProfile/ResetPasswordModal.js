import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import { toast } from "react-toastify";
import { changePassword } from "constants/api/member";

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

export default function ResetPasswordModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const patern =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*'])[a-zA-Z0-9!@#$%^&*]{8,}$/;

  const [passwordInput, setPasswordInput] = useState([
    { name: "Kata sandi lama", show: false, input: "" },
    { name: "Kata sandi baru", show: false, input: "" },
    { name: "Konfirmasi kata sandi", show: false, input: "" },
  ]);

  const handleChange = (e, id) => {
    const values = [...passwordInput];
    values[id].input = e.target.value;
    setPasswordInput(values);
  };

  const handleShow = (id) => {
    const values = [...passwordInput];
    values[id].show = !values[id].show;
    setPasswordInput(values);
  };

  let disableSubmit =
    passwordInput.filter((data) => data.input === "").length > 0;

  const handleSubmit = async () => {
    if (passwordInput[0].input === passwordInput[1].input) {
      toast.error("Password lama dan Password baru tidak boleh sama !");
      return;
    }
    if (passwordInput[1].input !== passwordInput[2].input) {
      toast.error("Konfirmasi password tidak sama !");
      return;
    }

    if (
      passwordInput[0]?.input?.length < 8 ||
      passwordInput[1]?.input?.length < 8 ||
      passwordInput[2]?.input?.length < 8
    ) {
      toast.error("Password Tidak Boleh Kurang Dari 8 Karakter !");
      return;
    }

    if (passwordInput[0]?.input?.length < 8) {
      toast.error("Password Lama Tidak Boleh Kurang Dari 8 Karakter !");
      return;
    }

    const data = {
      Password_new: passwordInput[1].input,
      Password_last: passwordInput[0].input,
    };

    const response = await changePassword(JSON.stringify(data));
    if (response.status === 200) {
      toast.success("Password Berhasil diubah !");
      setPasswordInput(
        passwordInput.map((pass) => {
          return { ...pass, input: "" };
        })
      );
      handleClose();
    } else {
      toast.error(response.message ? response.message : response.Message);
    }
  };

  return (
    <div>
      <p
        onClick={handleOpen}
        className="text-orange-500 text-xs font-semibold cursor-pointer"
      >
        Ubah
      </p>
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
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Ubah Kata Sandi
            </Typography>
            <div className="mt-2 space-y-5 flex flex-col">
              {passwordInput.map((field, id) => (
                <div key={id}>
                  <div className="flex items-center justify-between border border-gary-400 px-2 rounded-md">
                    <input
                      type={field.show ? "text" : "password"}
                      value={field.input}
                      placeholder={field.name}
                      onChange={(e) => handleChange(e, id)}
                      className="focus:outline-none"
                    />
                    {field.show ? (
                      <IconButton onClick={() => handleShow(id)}>
                        <VisibilityOffIcon />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleShow(id)}>
                        <RemoveRedEyeIcon />
                      </IconButton>
                    )}
                  </div>
                  {field.name !== "Kata sandi lama" && field.input.length > 0 && (
                    <div className="flex mt-1 px-1">
                      <div
                        className={`h-2 duration-700 ease-out rounded-l-md ${
                          field.input.length >= 1 ? "w-1/4 bg-red-500" : "w-0"
                        }`}
                      ></div>
                      <div
                        className={`h-2 duration-700 ease-out ${
                          field.input.length >= 8
                            ? "w-1/4 bg-yellow-500"
                            : "w-0"
                        }`}
                      ></div>
                      <div
                        className={`h-2 duration-700 ease-out rounded-r-sm ${
                          field.input.length >= 8 && patern.test(field.input)
                            ? "w-2/3 bg-green-500"
                            : "w-0"
                        }`}
                      ></div>
                    </div>
                  )}
                </div>
              ))}

              <div className="text-xs text-red-500">
                *Password Minimal 8 Karakter
              </div>

              <button
                disabled={disableSubmit}
                onClick={handleSubmit}
                className={`p-3 ${
                  disableSubmit ? "bg-gray-500" : "bg-orange-500 "
                } text-white px-5 rounded-md uppercase`}
              >
                Simpan
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
