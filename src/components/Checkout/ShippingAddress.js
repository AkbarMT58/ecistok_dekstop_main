import { useState, useEffect } from "react";
import Link from "next/link";
import FormEdit from "components/Address/FormEdit";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FormAdd from "components/Address/FormAdd";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

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

const ShippingAddress = ({
  address,
  listAddress,
  changeAddress,
  setUpdate,
  update,
}) => {
  const [openAddress, setOpenAddress] = useState(false);
  const [openEditAddress, setOpenEditAddress] = useState(false);
  const [idAddress, setIdAddress] = useState(0);

  const onDismiss = () => {
    setOpenAddress(false);
  };

  const onDismissEdit = () => {
    setOpenEditAddress(false);
  };

  const editAddress = (id) => {
    setIdAddress(id);
    setTimeout(() => {
      setOpenEditAddress(true);
    }, 500);
  };

  const handleCloseEdit = () => {
    setOpenEditAddress(false);
    setUpdate(!update);
  };

  return (
    <>
      <div className="bg-white w-full">
        <div>
          <p className="text-md font-semibold text-gray-700">
            Alamat Pengiriman
          </p>
        </div>
        <hr />
        <div className="py-5 text-gray-700">
          {listAddress?.length > 0 ? (
            <>
              <div className="flex justify-between">
                <p className="font-semibold line-clamp-1 capitalize">
                  {address?.nama_depan} {address?.nama_belakang}
                </p>
                {address && !address?.is_complete && (
                  <span
                    onClick={() => editAddress(address?.id)}
                    className="cursor-pointer py-1 px-2 bg-marron-500 text-white text-sm"
                  >
                    Lengkapi Alamat
                  </span>
                )}
              </div>
              <p>{address?.telepon}</p>
              <p>{address?.alamat}</p>
              <p>
                {address?.kecamatan} - {address?.kabupaten}
              </p>
              <button
                onClick={() => setOpenAddress(true)}
                type="button"
                className="mt-2 text-orange-500 border border-orange-500 py-1 px-2 rounded-md"
              >
                Pilih Alamat Lain
              </button>
            </>
          ) : (
            <button
              onClick={() => setOpenEditAddress(true)}
              type="button"
              className="mt-2 text-orange-500 border border-orange-500 py-1 px-2 rounded-md"
            >
              Tambah Alamat
            </button>
          )}
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAddress}
        onClose={onDismiss}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openAddress}>
          <Box sx={style} className="overflow-y-scroll modal-scroll">
            <div className="flex justify-end -mt-5">
              <IconButton onClick={onDismiss} style={{ textAlign: "right" }}>
                <CloseIcon />
              </IconButton>
            </div>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Ubah Alamat
            </Typography>
            <div>
              {listAddress?.map((address) => {
                return (
                  <div
                    key={address?.id}
                    onClick={() => changeAddress(address.id)}
                    className={`flex  cursor-pointer mb-3 items-center justify-between border ${
                      address.isSelected
                        ? "border-orange-500"
                        : "border-gray-200"
                    } rounded-lg p-3`}
                  >
                    <div className="w-10/12">
                      <p className="font-semibold line-clamp-1">
                        {address?.nama_depan} {address?.nama_belakang}
                      </p>
                      <p>{address?.telepon}</p>
                      <p>{address?.alamat}</p>
                      <p>
                        {address?.kecamatan}, {address?.kabupaten},{" "}
                        {address?.kode_pos}
                      </p>
                      {!address?.is_complete && (
                        <button
                          onClick={() => editAddress(address?.id)}
                          className="mt-2 bg-orange-500 text-white py-1 px-2 text-sm"
                        >
                          Lengkapi Alamat
                        </button>
                      )}
                    </div>
                    <div className="w-2/12 flex justify-end">
                      <div
                        className={`border ${
                          address.isSelected
                            ? "border-orange-500"
                            : "border-gray-300"
                        }  w-5 h-5 rounded-full flex justify-center items-center`}
                      >
                        <div
                          className={`h-4 w-4 ${
                            address.isSelected ? "bg-orange-500" : "bg-gray-300"
                          } rounded-full`}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full text-center">
              <Link href="/address">
                <a className="text-orange-500">Kelola Alamat</a>
              </Link>
            </div>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openEditAddress}
        onClose={onDismissEdit}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openEditAddress}>
          <Box sx={style} className="overflow-y-scroll variant-scroll">
            <div className="flex justify-end -mt-5">
              <IconButton
                onClick={onDismissEdit}
                style={{ textAlign: "right" }}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Ubah Data Alamat
            </Typography>
            <div className="pb-3">
              {listAddress?.length > 0 ? (
                <FormEdit
                  id={idAddress}
                  deleted={false}
                  handleClose={handleCloseEdit}
                />
              ) : (
                <FormAdd handleClose={handleCloseEdit} />
              )}
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ShippingAddress;
