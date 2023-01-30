import { toast } from "react-toastify";
import swal from "sweetalert";
import { addInquiry } from "constants/api/member";
import Router from "next/router";
import users from "helpers/users";
import router from "next/router";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid lightgray",
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};

export default function RequestInquiryModal({
  selectedVariant,
  data,
  totalDataProduct,
  keterangan,
  setKeterangan,
  gambar_keterangan,
}) {
  const [userIsLogin, setUserIslogin] = useState(false);
  
  useEffect(() => {
    if (users().userName) {
      setUserIslogin(users().isLogin); // using this to prevent REACT HYDRATION ERROR
    }
  }, []);

  const gtag_report_conversion = (url) => {
    gtag("event", "addToCart", {
      send_to: "AW-617636049/3tJtCPelga0DENHBwaYC",
      value: data?.total_price,
      currency: "IDR",
      event_callback: () => {
        if (typeof url != "undefined") {
          window.location = url;
        }
      },
    });
    return false;
  };

  const handleSubmit = async () => {
    if (keterangan.trim().length > 250) {
      toast.error("Keterangan tidak boleh lebih dari 250 karakter");
      return;
    }

    const payload = {
      page_id: data?.num_iid,
      produk: data?.title,
      produk_ch: data?.title_china,
      link: data?.detail_url,
      toko: data?.type,
      gambar: data?.item_imgs?.[0] || "https://ocistok.co.id/control-panel/foto/default-image.png",
      variant: [],
      keterangan,
      gambar_keterangan: gambar_keterangan
        ? "https://ocistok.co.id/control-panel/foto/" + gambar_keterangan
        : "",
    };

    let variantFBpixel = [];

    data.PropSku.map((e) => {
      return e?.children.map((i) => {
        payload.variant.push({
          id_variant: i?.sku_id,
          variant: e?.valueidn + "_" + i?.variantIdn,
          variant_ch: e.value + "_" + i?.variant,
          kuantiti: i?.qty,
          harga_req: i?.harga,
          gambar: e?.url,
          gambar_keterangan: gambar_keterangan,
        });

        variantFBpixel.push({
          quantity: i?.qty,
          id: i?.sku_id,
          item_price: i?.harga * 2350,
        });
      });
    });

    swal({
      title: "Apakah produk sudah sesuai ?",
      text: "Varian produk tidak dapat diubah jika telah mengajukan estimasi harga",
      buttons: true,
    }).then(async (submit) => {
      if (submit) {
        const req = await addInquiry(JSON.stringify(payload));
        if (req.status === 200) {
          // facebook pixel addToCart
          fbq("track", "AddToCart", {
            content_ids: data?.num_iid,
            content_name: data?.title,
            content_type: "product",
            currency: "IDR",
            value:
              totalDataProduct().totalPrice *
              parseInt(process.env.CONVERSION_MONEY),
            content: variantFBpixel,
          });

          // tiktok Pixel
          ttq.track("AddToCart", {
            content_name: data?.title,
            content_id: data?.num_iid,
            value:
              totalDataProduct().totalPrice *
              parseInt(process.env.CONVERSION_MONEY),
            currency: "IDR",
          });

          // Gtag addToCart
          gtag_report_conversion();
          setKeterangan("");
          swal({
            title: "Berhasil",
            text: "Berhasil mengajukan inquiry!",
            icon: "success",
            buttons: ["Lanjut Belanja", "Lihat Pengajuan Saya"],
          }).then((inquiry) => {
            if (inquiry) {
              Router.push("/dashboard/orders?path=inquiry");
            } else {
              location.reload();
            }
          });
        } else {
          swal("Oops", req?.message, "error");
        }
      }
    });
  };

  return (
    <div>
      <button
        onClick={() => {
          if (userIsLogin) {
            if (selectedVariant) {
              if (selectedVariant.length > 0) {
                if (totalDataProduct().totalPrice * parseInt(process.env.CONVERSION_MONEY) < 1000000 ) {
                  toast.error(
                    "Total harga request belum mencapai 1 juta rupiah !"
                  );
                } else {
                  handleSubmit();
                }
              } else {
                toast.error("Harap masukan produk sebelum melanjutkan !");
              }
            } else {
              toast.error("Harap masukan produk sebelum melanjutkan !");
            }
          } else {
            // Bawa Ke Halaman Login, pake params
            toast.info(
              "Tidak dapat mengajukan product, sebelum login. Anda akan dikembalikan ke halaman product, setelah login"
            );
            router.push(`/login/?redirect=${data?.type}/${data?.num_iid}`);
          }
        }}
        className="py-2 px-4 border bg-orange-400 rounded-md transition-all duration-300 border-orange-600 text-white hover:bg-orange-500"
      >
        Hitungkan Harga (HPP)
      </button>
    </div>
  );
}
