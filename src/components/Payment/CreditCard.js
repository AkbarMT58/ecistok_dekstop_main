import React, { useState, useEffect, useRef } from "react";
import { DescriptionIcon } from "components/Global/Icons";
import { toast } from "react-toastify";
import { getOtpCreditCard } from "constants/api/member";
import NotificationResponse from "./NotificationResponse";
import copyText from "helpers/copyText";
import { Dialog, Slide } from "@mui/material";
import { Random } from "random-js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreditCard = ({ data, timer }) => {
  useEffect(() => {
    if (!document.getElementById("midtrans-script")) {
      const script = document.createElement("script");

      script.src =
        "https://api.midtrans.com/v2/assets/js/midtrans-new-3ds.min.js";
      script.type = "text/javascript";
      script.id = "midtrans-script";
      script.setAttribute("data-environment", "sandbox");
      script.setAttribute("data-client-key", "SB-Mid-client-35yYGDQLQtN7ErZR");
      document.body.appendChild(script);
    }
  }, []);

  const [redirect, setRedirect] = useState("");
  const [open, setOpen] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);
  const [isSuccess, setIsSuccess] = useState({ status: "", response: {} });
  const yearRef = useRef();
  const monthRef = useRef();
  const nameRef = useRef();
  const numberRef = useRef();
  const cvvRef = useRef();

  const [cardData, setCardData] = useState({
    card_number: "",
    card_exp_month: "",
    card_exp_year: "",
    card_cvv: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "card_exp_month") {
      if (value.length === 2) {
        yearRef.current.focus();
      }
    } else if (name === "card_exp_year") {
      if (value.length >= 2) {
        cvvRef.current.focus();
      }
    }
    setCardData({ ...cardData, [name]: value });
  };

  const _getTopCreditCard = async (payload) => {
    const res = await getOtpCreditCard(JSON.stringify(payload));
    if (parseInt(res.status) === 201) {
      setRedirect(res.body.redirect_url);
      openModal();
    } else {
      toast.error(midtransResponse(res.status), {
        position: "top-center",
      });
    }
  };

  const handleSubmit = () => {
    if (cardData.name.trim().length === 0) {
      toast.error("Mohon lengkapi nama card credit", {
        position: "top-center",
      });
      nameRef.current.focus();
    } else if (cardData.card_number.trim().length < 16) {
      toast.error("Mohon lengkapi nomor card credit", {
        position: "top-center",
      });
      numberRef.current.focus();
    } else if (cardData.card_exp_month.trim().length === 0) {
      toast.error("Mohon lengkapi expired month card credit", {
        position: "top-center",
      });
      monthRef.current.focus();
    } else if (cardData.card_exp_year.trim().length === 0) {
      toast.error("Mohon lengkapi expired year card credit", {
        position: "top-center",
      });
      yearRef.current.focus();
    } else if (cardData.card_cvv.trim().length === 0) {
      toast.error("Mohon lengkapi card cvv credit", {
        position: "top-center",
      });
      cvvRef.current.focus();
    } else {
      const options = {
        onSuccess: async function (response) {
          const token_id = response.token_id;
          const random = new Random();
          const value = random.integer(10000, 1000000);
          const payload = {
            payment_type: "credit_card",
            token_id: token_id,
            id_so: data?.data?.id_so,
            random: value,
          };

          _getTopCreditCard(payload);
        },
        onFailure: function (response) {
          console.log("Fail to get card token_id, response:", response);
          toast.error(response.validation_messages[0], {
            position: "top-center",
          });
        },
      };
      MidtransNew3ds.getCardToken(cardData, options);
    }
  };

  const openModal = () => {
    const options = {
      performAuthentication: function (redirect_url) {
        setOpen(true);
      },
      onSuccess: function (response) {
        setOpen(false);
        setOpenNotif(true);
        setIsSuccess({ status: "success", response: response });
      },
      onFailure: function (response) {
        setOpen(false);
        setIsSuccess({ status: "fail", response: response });
      },
      onPending: function (response) {
        setIsSuccess({ status: "pending", response: response });
        setOpen(false);
      },
    };
    MidtransNew3ds.authenticate(redirect, options);
  };

  return (
    <div className="bg-white mt-2 py-3">
      <div className="container mx-auto">
        <div className="flex justify-between items-center text-gray-700">
          <p className="font-semibold">{data?.PaymentType && "Credit Card"}</p>
          <img src={data?.data?.gambar} className="h-10 w-20 object-contain" />
        </div>
        <hr className="my-3" />
        <p className="text-sm text-gray-700 mt-3">Total Pembayaran</p>
        <div className="flex justify-between items-center text-gray-700">
          <p className="font-semibold">
            Rp {data?.data?.total_price?.toLocaleString("ID-id") ?? 0}
          </p>
          <div
            onClick={() => copyText(data?.data?.total_price)}
            className="text-sm flex space-x-2 items-center text-orange-500"
          >
            <span>Salin</span>
            <DescriptionIcon />
          </div>
        </div>
        <hr className="my-3" />
        <div className="flex flex-col text-gray-700">
          <label className="text-sm">Name on Card</label>
          <input
            className="text-sm mt-1 py-1 px-2 border border-gray-300 rounded-md focus:outline-none"
            type="text"
            value={cardData?.name}
            onChange={handleChange}
            name="name"
            placeholder="Name"
            ref={nameRef}
          />
        </div>
        <div className="flex flex-col text-gray-700 mt-2 space-y-1">
          <label className="text-sm">Card Information</label>
          <div className="flex items-center space-x-3">
            <input
              className="w-3/6 text-sm py-1 px-2 border border-gray-300 focus:outline-none rounded-md"
              type="text"
              name="card_number"
              value={cardData?.card_number}
              ref={numberRef}
              onChange={handleChange}
              placeholder="1234 5678 1234 5678"
            />

            <div className="w-2/6 flex border border-gray-300 rounded-md text-gray-400">
              <input
                className="w-1/2 text-sm py-1 px-2 focus:outline-none"
                type="number"
                name="card_exp_month"
                value={cardData?.card_exp_month}
                ref={monthRef}
                onChange={handleChange}
                placeholder="MM"
              />
              <p> / </p>
              <input
                className="w-1/2 text-sm py-1 px-2 focus:outline-none"
                type="number"
                name="card_exp_year"
                value={cardData?.card_exp_year}
                onChange={handleChange}
                ref={yearRef}
                placeholder="YY"
              />
            </div>
            <input
              className="w-1/6 text-sm py-1 px-2 border border-gray-300 focus:outline-none rounded-md"
              type="text"
              name="card_cvv"
              placeholder="CVV"
              value={cardData?.card_cvv}
              onChange={handleChange}
              ref={cvvRef}
            />
          </div>
        </div>
        <div className="w-full h-10 flex justify-center flex-col space-y-3 mt-10 items-center">
          {timer > 0 && (
            <button
              onClick={handleSubmit}
              className="py-1 px-12 bg-orange-500 text-white rounded-lg"
            >
              Bayar Sekarang
            </button>
          )}
        </div>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setOpen(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <div className="flex justify-center items-center min-h-[400px] w-[450px]">
            <iframe
              scrolling="no"
              className="overflow-x-hidden w-full h-[400px]"
              src={redirect}
            ></iframe>
          </div>
        </Dialog>

        <Dialog
          open={openNotif}
          TransitionComponent={Transition}
          keepMounted
          // onClose={() => setOpenNotif(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <div className="min-h-[250px] p-8">
            <NotificationResponse data={isSuccess} />
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default CreditCard;
