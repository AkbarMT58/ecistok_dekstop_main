import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { changeSearchType } from "redux/reducers/searchSlice";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function Header() {
  const [fields, setFields] = useState("");
  const selector = useSelector((state) => state.searchType);
  const router = useRouter();
  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setToken(Cookies.get("token"));
  }, []);

  const changeType = (e) => {
    dispatch(changeSearchType(e.target.dataset.type));
  };

  const changeHandler = (e) => {
    setFields(e.target.value);
  };

  const goSearch = (e) => {
    e.preventDefault();

    if (fields.trim() !== "") {
      router.push(
        `/search?keyword=${encodeURIComponent(fields)}&type=${selector.data}`
      );
    }
  };

  const logoutHandler = () => {
    router.push("/");
    Cookies.remove("token");
    Cookies.remove("user");
    setToken("");
    toast.success("Anda telah keluar dari akun");
  };

  return (
    // Header Container
    <header className="flex sticky justify-between items-center z-99">
      {/* Logo Container */}
      <div className="w-1/4">
        {/* Logo link to home  */}
        <Link href="/">
          <a>
            <Image
              src="/logo_oci_new_2.svg"
              alt="ocistok"
              height={50}
              width={200}
            />
          </a>
        </Link>
      </div>

      {/* Search Container */}
      <div className="w-2/4">
        {/* Marketplace selector 1688 or Taobao */}
        <div className="flex space-x-2 mb-2">
          <button
            className={
              selector.data == "1688"
                ? "text-sm py-1 px-3 rounded-full bg-orange-500 text-white"
                : "text-sm py-1 px-3 rounded-full text-orange-500"
            }
            data-type="1688"
            onClick={(e) => changeType(e)}
          >
            1688
          </button>
          <button
            className={
              selector.data == "taobao"
                ? "text-sm py-1 px-3 rounded-full bg-orange-500 text-white"
                : "text-sm py-1 px-3 rounded-full text-orange-500"
            }
            data-type="taobao"
            onClick={(e) => changeType(e)}
          >
            Taobao
          </button>
          <button
            className={
              selector.data == "alibaba"
                ? "text-sm py-1 px-3 rounded-full bg-orange-500 text-white"
                : "text-sm py-1 px-3 rounded-full text-orange-500"
            }
            data-type="alibaba"
            onClick={(e) => changeType(e)}
          >
            Alibaba
          </button>
        </div>

        {/* Searcbar */}
        <form onSubmit={(e) => goSearch(e)}>
          <div className="flex bg-white rounded-lg py-2 px-3 transform hover:scale-[1.01]  transition duration-300">
            <input
              placeholder="Cari Barang Dengan Kata Kunci Atau Link 1688/Taobao/Alibaba"
              className="w-full text-gray-500 text-sm focus:outline-none focus:shadow-outline"
              onChange={(e) => changeHandler(e)}
            />
            <button
              type="submit"
              className="flex items-center shadow bg-orange-500 focus:shadow-outline focus:outline-none font-bold px-4 py-1 rounded"
            >
              <Image
                src="/icons/search-solid.svg"
                className="text-orange-500"
                height={20}
                width={20}
                alt="jasa import barang dari china"
              />
            </button>
          </div>
        </form>
        {/* End Searchbar */}

        {/* Direct Link Container */}
        <div className="flex mt-2">
          <div className="w-12/12">
            <div className="flex space-x-5">
              {/* Direct Link Search */}
              <Link
                href={`/search?keyword=fashion%20wanita&type=${selector.data}`}
              >
                <a className="text-sm text-gray-500 hover:text-orange-500">
                  Fashion Wanita
                </a>
              </Link>
              <Link
                href={`/search?keyword=fashion%20pria&type=${selector.data}`}
              >
                <a className="text-sm text-gray-500 hover:text-orange-500">
                  Fashion Pria
                </a>
              </Link>
              <Link
                href={`/search?keyword=peralatan%20masak&type=${selector.data}`}
              >
                <a className="text-sm text-gray-500 hover:text-orange-500">
                  Peralatan masak
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Button Container */}
      <div className="w-1/4">
        {token ? (
          <div className="flex space-x-4 justify-end items-center">
            <Link href="/dashboard">
              <a className="shadow bg-gradient-to-r bg-orange-500 text-white py-3 px-4 rounded-lg">
                Dashboard
              </a>
            </Link>
            <div
              onClick={logoutHandler}
              className="transition-all shadow border border-orange-500 text-orange-500  hover:text-white  hover:bg-orange-500  py-3 px-4 rounded-lg cursor-pointer"
            >
              Keluar
            </div>
          </div>
        ) : (
          <div className="flex space-x-4 justify-end">
            <Link href="/login">
              <a className="shadow bg-orange-500 hover:bg-orange-400 text-white py-3 px-4 rounded-lg transition-all duration-300">
                Masuk
              </a>
            </Link>
            <Link href="/register">
              <a className="transition-all shadow border border-orange-500 text-orange-500  hover:text-white  hover:bg-orange-500  py-3 px-4 rounded-lg">
                Daftar
              </a>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
