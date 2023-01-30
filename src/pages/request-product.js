import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "components/Global/Spinner";
import { addRequestProduct } from "constants/api/member";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import DashboardTemplate from "components/Layout/DashboardTemplate";
import Heads from "components/Heads";
import users from "helpers/users";
import swal from "sweetalert";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Input = styled("input")({
  display: "none",
});

const requestProduct = () => {
  const router = useRouter();
  const user = users();
  const [produk, setProduk] = useState("");
  const [payload, setPayload] = useState({
    Link: "",
    produk: "",
    keterangan: "",
    gambar: "",
    telepon: user.phone,
  });

  const [config, setConfig] = useState({
    loading: false,
    open: false,
  });

  const handleUpload = async (e) => {
    const file = e.target.files;
    if (file.length > 0) {
      let formData = new FormData();
      formData.append("gambar", file[0]);
      const response = await fetch(process.env.URL_UPLOAD, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.status === 200) {
        setPayload({
          ...payload,
          gambar: "https://ocistok.co.id/control-panel/foto/" + result.file,
        });
      } else {
        toast.error("Gagal upload gambar");
      }
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setPayload({ ...payload, [name]: value });
  };

  const handleRedirect = (type, id) => {
    swal({
      text: "Untuk link 1688 dan Taobao tidak dapat diajukan via permintaan produk. silahkan gunakan kotak pencarian atau langsung tekan tombol laman produk untuk melakukan pengajuan.",
      icon: "info",
      buttons: ["Kembali", "Kehalaman Produk"],
    }).then((lamanProduk) => {
      if (lamanProduk) {
        router.push(`/product/${type}/${id}`);
      } else {
        setConfig({ ...config, loading: false });
        return;
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setConfig({ ...config, loading: true });
    const patt = /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{6,9}$/.test(
      payload.telepon
    );
    const pattern =
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

    if (
      payload?.Link === "" &&
      payload?.produk === "" &&
      payload?.gambar === ""
    ) {
      setConfig({ ...config, loading: false });
      toast.error(
        "Permintaan Produk Membutuhkan Gambar, Link, atau Nama Produk"
      );
      return;
    }

    if (payload?.keterangan === "") {
      setConfig({ ...config, loading: false });
      toast.error("Keterangan tidak boleh kosong");
      return;
    }

    if (!patt) {
      toast.error("No Handphone Tidak Valid");
      setConfig({ ...config, loading: false });
    }

    if (pattern.test(payload.Link)) {
      if (/1688/.test(payload.Link)) {
        const split = payload.Link.split("?");
        const url = split[0].split("/");
        const idProduct = url.pop().replace(".html", "");
        handleRedirect("1688", idProduct);
      } else if (/taobao/.test(payload.Link)) {
        const split = payload.Link.match(/[\\?|\\&]id=([^&]*)/);
        handleRedirect("taobao", split[1]);
      }
    }

    const response = await addRequestProduct(JSON.stringify(payload));
    if (response.status === 200) {
      swal({
        text: "Request product berhasil",
        icon: "success",
      }).then(() => {
        setConfig({ ...config, open: true });
        setProduk(payload.produk);
        setPayload({
          Link: "",
          produk: "",
          keterangan: "",
          gambar: "",
          telepon: "",
        });
      });
    } else {
      if (response.status === 403) {
        swal({
          text: "Anda masih memiliki order atau inquiry yang belum selesai. Harap selesaikan pembayaran atau hapus inquiry anda.",
          icon: "info",
        });
      } else {
        toast.error("Gagal melakukan request produk");
      }
    }

    setConfig({ ...config, loading: false });
  };

  return (
    <>
      <Heads title={"Permintaan Produk"} />
      <DashboardTemplate>
        <form
          onSubmit={handleSubmit}
          className="w-full items-center justify-center flex flex-col mt-5 space-y-3 bg-white px-20 text-sm"
        >
          <div className="text-base">
            Tidak menemukan produk yang kamu cari? request pencarian disini!
          </div>
          <h1 className="self-start text-xl">Request Produk</h1>
          <div className="w-full flex flex-col">
            <p>Upload Gambar Produk</p>
            <div className=" text-gray-500 mt-1 flex items-center space-x-3">
              <div className="flex flex-col items-center justify-center border border-orange-500 h-52 w-52 rounded-md p-3">
                {payload.gambar ? (
                  <img
                    src={payload.gambar}
                    className="max-h-44 max-44 object-cover"
                  />
                ) : (
                  <p>Preview Gambar</p>
                )}
              </div>

              <div className="self-end">
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    onChange={handleUpload}
                    type="file"
                  />
                  <Button
                    variant="contained"
                    component="span"
                    size="small"
                    color="warning"
                  >
                    Upload
                  </Button>
                </label>
              </div>
            </div>
          </div>
          <div className="w-full text-gray-700">
            <label>Link Produk</label>
            <input
              type="text"
              onChange={handleChange}
              value={payload.Link}
              placeholder="Masukan link produk"
              name="Link"
              className="border border-orange-500 mt-1 py-2 w-full rounded-md px-3 focus:outline-none"
            />
          </div>
          <div className="w-full text-gray-700">
            <label>Nama Produk</label>
            <input
              type="text"
              onChange={handleChange}
              value={payload.produk}
              placeholder="Masukan nama produk"
              name="produk"
              className="border border-orange-500 mt-1 py-2 w-full rounded-md px-3 focus:outline-none"
            />
          </div>
          <div className="w-full text-gray-700">
            <label>No Handphone</label>
            <input
              type="number"
              onChange={handleChange}
              value={payload.telepon}
              placeholder="Masukan no handphone anda"
              name="telepon"
              className="border border-orange-500 mt-1 py-2 w-full rounded-md px-3 focus:outline-none"
            />
          </div>
          <div className="w-full text-gray-700">
            <label>Keterangan</label>
            <textarea
              rows="4"
              onChange={handleChange}
              value={payload.keterangan}
              name="keterangan"
              placeholder="Saya menginginkan warna merah"
              className="border border-orange-500 mt-1 py-2 w-full rounded-md px-3 focus:outline-none"
            ></textarea>
          </div>
          <div className="w-full text-gray-700 text-center">
            {config.loading ? (
              <Spinner />
            ) : (
              <button
                type="submit"
                className="bg-orange-500 text-white px-8 py-2 rounded-md"
              >
                Submit
              </button>
            )}
          </div>
        </form>
        <Dialog
          open={config.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setConfig({ ...config, open: false })}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Permintaan produk berhasil dilakukan."}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Berhasil melakukan permintaan produk{" "}
              <span className="font-bold">{produk}</span>, Tim ocistok akan
              mencarikan produk anda, Silahkan cek list inquiry secara berkala
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div className="flex items-center space-x-3 py-1 px-3">
              <button
                className="text-white bg-orange-500 rounded-md p-2 text-sm"
                onClick={() => router.push("/dashboard/orders?path=inquiry")}
              >
                Lihat Inquiry
              </button>
              <button
                className="text-white bg-orange-500 rounded-md p-2 text-sm"
                onClick={() => setConfig({ ...config, open: false })}
              >
                Tutup
              </button>
            </div>
          </DialogActions>
        </Dialog>
      </DashboardTemplate>
    </>
  );
};

export default requestProduct;

export async function getServerSideProps({ req }) {
  const { token } = req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
