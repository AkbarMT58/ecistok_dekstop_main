import RoomIcon from "@mui/icons-material/Room";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import DehazeIcon from "@mui/icons-material/Dehaze";
import InputIcon from "@mui/icons-material/Input";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import {
  ItemMenuDashboard,
  ItemMenuDashboardDisabled,
} from "components/Layout/ItemMenuDashboard";
import RedeemIcon from "@mui/icons-material/Redeem";
import users from "helpers/users";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SchoolIcon from "@mui/icons-material/School";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useEffect, useState } from "react";

export default function ListMenu() {
  const [userName, setUserName] = useState();
  useEffect(() => {
    if (users().userName) {
      setUserName(users().userName); // using this to prevent REACT HYDRATION ERROR
    }
  }, []);
  return (
    <>
      <div className="min-w-[200px]">
        <div className="flex mb-2 items-center">
          <img src="/user.png" alt="" className="w-10 mr-2" />
          <div className="text-sm text-gray-500">{userName}</div>
        </div>
        <div className="flex p-2">
          <ul className="text-sm flex flex-col space-y-6 text-gray-600">
            <ItemMenuDashboard
              text="Profil Saya"
              href="/myprofile"
              icon={<PersonIcon fontSize="small" />}
            />
            <ItemMenuDashboard
              text="Pesanan"
              href="/dashboard/orders?path=myorders"
              icon={<RedeemIcon fontSize="small" />}
            />
            <ItemMenuDashboard
              text="Daftar Alamat"
              href="/address"
              icon={<RoomIcon fontSize="small" />}
            />
            <ItemMenuDashboard
              text="Permintaan Produk"
              href="/request-product"
              icon={<AddPhotoAlternateIcon fontSize="small" />}
            />
            <ItemMenuDashboard
              text="Ociskill Academy"
              href="https://ocistok.com/oci-skill"
              icon={<SchoolIcon fontSize="small" />}
            />
            {/* <ItemMenuDashboardDisabled
              classNameChild={'text-orange-500 animate-pulse'}
              textChild={'Coming Soon !'}
              text={`Ociskill Academy`}
              href='/ociskill'
              icon={<SchoolIcon fontSize='small' />}
            /> */}
            <ItemMenuDashboard
              text="Catalog Product"
              href="/catalog-list"
              icon={<ViewListIcon fontSize="small" />}
            />
          </ul>
        </div>
        <div className="my-2"></div>

        <div className="flex p-2">
          <ul className="text-sm flex flex-col space-y-6 text-gray-600">
            <ItemMenuDashboard
              text="Tentang Ocistok"
              href="/about-us"
              icon={<InfoIcon fontSize="small" />}
            />
            <ItemMenuDashboard
              text="Syarat & Ketentuan"
              href="/terms"
              icon={<DehazeIcon fontSize="small" />}
            />
            <ItemMenuDashboard
              text="Kebijakan Refund"
              href="/refund-policy"
              icon={<InputIcon fontSize="small" />}
            />
            <ItemMenuDashboard
              text="Kebijakan Privasi"
              href="/policy"
              icon={<PriorityHighIcon fontSize="small" />}
            />
            <ItemMenuDashboard
              text="FAQ"
              href="/faq"
              icon={<LiveHelpIcon fontSize="small" />}
            />
          </ul>
        </div>
      </div>

      <div className="mb-14"></div>
    </>
  );
}
