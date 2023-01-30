import { KeyboardArrowUpIcon } from "components/Global/Icons";
import { useRouter } from "next/router";
import { useCheckout } from "hooks/use-checkout";
import ShippingAddress from "components/Checkout/ShippingAddress";
import { getVoucher, postCheckout } from "constants/api/member";
import { toast } from "react-toastify";
import Courier from "components/Checkout/Courier";
import ListProduct from "components/Checkout/ListProduct";
import swal from "sweetalert";
import TotalBayar from "components/Checkout/TotalBayar";
import SpinnerDialog from "components/Global/SpinnerLoading";
import ContainerGeneral from "components/Layout/ContainerGeneral";
import Footer from "components/Layout/Footer";
import Header from "components/Layout/Header";
import Voucher from "components/Checkout/Voucher";
import Payment from "components/Checkout/Payment";
import Heads from "components/Heads";

export default function checkout({ id }) {
  const router = useRouter();
  const {
    show,
    payload,
    loading,
    count,
    update,
    voucher,
    data,
    courier,
    updateKurir,
    loadingCourier,
    loadingSubmit,
    setCourier,
    setData,
    setVoucher,
    setUpdate,
    setShow,
    setCount,
    setPayload,
    setUpdatekurir,
    setLoadingSubmit,
  } = useCheckout(id);
  const changeAddress = (id) => {
    data?.Alamat?.map((address) => {
      if (address.id === id) {
        address.isSelected = true;
      } else {
        address.isSelected = false;
      }
      setPayload({ ...payload, id_alamat: id, kurir: "", service: "" });
      setData({ ...data, Alamat: data?.Alamat });
      setUpdatekurir(!updateKurir);
    });
  };
  const handleSubmitVoucher = async (e) => {
    e.preventDefault();
    if (voucher.code.trim().length > 0) {
      const response = await getVoucher(voucher?.code);
      if (response.status === 200) {
        toast.success("Voucher berhasil digunakan");
        let valueVoucher = 0;
        if (response.data.percentage) {
          valueVoucher = parseInt(
            ((data?.total_price * response.data.jumlah) / 100).toFixed()
          );
        } else {
          valueVoucher = response.data.jumlah;
        }
        setVoucher({
          ...voucher,
          value: valueVoucher,
          is_percentage: response.data.percentage,
        });
        setPayload({ ...payload, kode_diskon: voucher.code });
      } else if (response.status === 401) {
        router.replace("/login");
      } else {
        toast.error("Voucher tidak ditemukan");
      }
    }
  };
  const handleRemoveVoucher = (e) => {
    e.preventDefault();
    swal({
      title: "Batalkan penggunaan kode voucher ?",
      buttons: true,
      dangerMode: true,
    }).then(async (submit) => {
      if (submit) {
        setVoucher({ code: "", is_percentage: false, value: 0 });
        setPayload({ ...payload, kode_diskon: "" });
        toast.warning("Penggunaan kode voucher dibatalkan");
      }
    });
  };
  const handleSelectCourier = (id, kurir, service) => {
    if (id === "custom") {
      const filter = courier.filter((e) => e.id !== "custom");
      
      for (let i = 0; i < filter.length; i++) {
          filter[i].is_selected = false;
      }

      const custom = {
        code: kurir,
        id: "custom",
        is_selected: true,
        service: service,
        price: 0,
      };
      setCourier([...filter, custom]);
      setPayload({
        ...payload,
        kurir: kurir,
        service: service,
        ongkir: 0,
      });
    } else {
      const arr = [];
      const selected = courier.find((i) => i.id === id);
      for (let i = 0; i < courier.length; i++) {
        if (courier[i].id === id) {
          courier[i].is_selected = true;
        } else {
          courier[i].is_selected = false;
        }
        arr.push(courier[i]);
      }
      setCourier(arr);
      setPayload({
        ...payload,
        kurir: selected.code,
        service: selected.service,
        ongkir: selected.price,
      });
    }
  };
  const handleSelectPayment = (id) => {
    const arr = [];
    const selected = data.Pembayaran.find((i) => i.id === id);
    for (let i = 0; i < data.Pembayaran.length; i++) {
      if (data.Pembayaran[i].id === id) {
        data.Pembayaran[i].is_selected = true;
      } else {
        data.Pembayaran[i].is_selected = false;
      }
      arr.push(data.Pembayaran[i]);
    }
    setData({ ...data, Pembayaran: arr });
    setPayload({ ...payload, payment_type: selected.Payment_type });
  };
  const gtag_report_conversion = (url) => {
    gtag("event", "checkout", {
      send_to: "AW-617636049/7DrdCIzx4q0DENHBwaYC",
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

  const handleSubmitCheckout = async () => {
    if (data?.Alamat.length > 0) {
      const validAddress = data?.Alamat.find(
        (e) => e.id === payload.id_alamat
      )?.is_complete;
      let contentFBpixel = [];
      data?.produk.map((item) => {
        item.Variant.map((variant) => {
          contentFBpixel.push({
            id: variant.idvariant,
            quantity: variant.kuantiti,
            item_price: variant.harga,
          });
        });
      });
      if (payload.id_alamat === 0) {
        toast.error("Silahkan pilih alamat pengiriman");
      } else if (!validAddress) {
        toast.error("Silahkan lengkapi alamat pengiriman");
      } else if (payload.kurir.trim().length === 0) {
        toast.error("Silahkan pilih metode pengiriman");
      } else if (payload.payment_type.trim().length === 0) {
        toast.error("Silahkan pilih metode pembayaran");
      } else {
        let newPayload = {};
        if (payload?.Is_id_group === true) {
          newPayload = {
            ...payload,
          };
        } else {
          newPayload = {
            ...payload,
            id_so: payload.id_so,
          };
        }

        swal({
          title: "Apakah semua data pesanan sudah sesuai ?",
          buttons: ["batalkan", "Lanjutkan pembayaran"],
        }).then(async (submit) => {
          if (submit) {
            setLoadingSubmit(true);
            const response = await postCheckout(JSON.stringify(newPayload));
            if (response.status === 200) {
              //facebook pixel InitiateCheckout
              fbq("track", "InitiateCheckout", {
                content_ids: data?.id_so,
                contents: contentFBpixel,
                currency: "IDR",
                value: data?.total_price,
                num_items: data?.total_quantity,
                content_type: "product",
              });

              // Tiktok Pixel
              ttq.track("InitiateCheckout", {
                content_id: data?.id_so,
                quantity: data?.total_quantity,
                value: data?.total_price,
                currency: "IDR",
              });

              // Gtag Checkout
              gtag_report_conversion();
              router.replace(`/payment/${response.data.id_so}`);
            } else {
              setLoadingSubmit(false);
              toast.error(response.message);
            }
          }
        });
      }
    } else {
      toast.error("Mohon tambahkan alamat terlebih dahulu !");
    }
  };
  return (
    <>
      <ContainerGeneral>
        <Heads title={"Checkout"} />
        <Header />
        {loading ? (
          <SpinnerDialog />
        ) : (
          data.produk && (
            <>
              <div className="p-10 w-full bg-white min-h-96 flex mt-5 space-x-5 rounded-t-md">
                <div className="w-2/3 bg-gray-100 space-y-3">
                  <div className="bg-white -mb-3 pb-3 font-semibold text-xl text-gray-700">
                    Checkout
                  </div>
                  <ShippingAddress
                    setUpdate={setUpdate}
                    update={update}
                    address={data?.Alamat?.find(
                      (i) => i.id === payload.id_alamat
                    )}
                    listAddress={data?.Alamat}
                    changeAddress={changeAddress}
                    count={count}
                    setCount={setCount}
                  />
                  <div className="bg-white w-full mt-2">
                    <div className="py-3">
                      <p className="text-md font-semibold text-gray-700">
                        List Produk
                      </p>
                    </div>
                    <hr />
                    <div className="  text-gray-700">
                      <div
                        className={`${
                          show ? "max-h-full" : "max-h-52"
                        } overflow-y-hidden`}
                      >
                        {data?.produk?.map((item) => {
                          return item.Variant.map((variant, i) => {
                            return (
                              <ListProduct
                                key={i}
                                item={item}
                                variant={variant}
                              />
                            );
                          });
                        })}
                      </div>
                      <div className="text-center mt-3">
                        <button
                          type="button"
                          onClick={() => setShow(!show)}
                          className="text-orange-500 text-sm"
                        >
                          Tampilkan lebih {show ? "sedikit" : "banyak"}{" "}
                          <KeyboardArrowUpIcon
                            className={`${!show ? "rotate-180" : ""}`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white py-5">
                    <div>
                      <Courier
                        data={courier}
                        handleSelectCourier={handleSelectCourier}
                        payload={payload}
                        loading={loadingCourier}
                      />
                    </div>
                  </div>
                  <div className="pt-3 flex items-center justify-between bg-white text-gray-500">
                    <p className="text-lg font-semibold">Subtotal :</p>
                    <p className="text-lg font-semibold">
                      Rp {data?.total_price?.toLocaleString("ID-id") ?? 0}
                    </p>
                  </div>
                </div>
                <div className="block">
                  <div className="sticky top-10 rounded-md shadow-md bg-gray-100 space-y-2">
                    <Voucher
                      handleSubmitVoucher={handleSubmitVoucher}
                      handleRemoveVoucher={handleRemoveVoucher}
                      voucher={voucher}
                      payload={payload}
                      setVoucher={setVoucher}
                    />
                    <Payment
                      data={data}
                      payload={payload}
                      voucher={voucher}
                      handleSelectPayment={handleSelectPayment}
                    />
                  </div>
                </div>
              </div>
              <TotalBayar
                payload={payload}
                data={data}
                voucher={voucher}
                handleSubmitCheckout={handleSubmitCheckout}
                address={data?.Alamat?.find((i) => i.id === payload.id_alamat)}
                loadingSubmit={loadingSubmit}
              />
            </>
          )
        )}
      </ContainerGeneral>
      <Footer />
    </>
  );
}
export async function getServerSideProps({ req, params }) {
  const { token } = req.cookies;
  const { id } = params;
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { id },
  };
}
