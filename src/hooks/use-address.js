import { useState, useEffect, useCallback } from "react";
import {
  getProvince,
  getCity,
  getKecamatan,
  getAddress,
} from "constants/api/member";

export const useAddress = (id) => {
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [subdistrict, setSubdistrict] = useState([]);
  const [loading, setLoading] = useState(false);

  const [alamat, setAlamat] = useState({
    id: 1,
    nama_depan: "",
    nama_belakang: "",
    telepon: "",
    kota: "",
    id_kabupaten: "",
    kabupaten: "",
    id_provinsi: "",
    provinsi: "",
    id_kecamatan: "",
    kecamatan: "",
    kode_pos: "",
    alamat: "",
    status: "second",
  });

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    if (name === "provinsi") {
      const filter = province.find((i) => i.province_id == value);
      setAlamat({
        ...alamat,
        id_provinsi: value,
        provinsi: filter.province,
        id_kabupaten: "",
        kabupaten: "",
        id_kecamatan: "",
        kecamatan: "",
        kota: "",
      });
      setCity([]);
      setSubdistrict([]);
    } else if (name === "kabupaten") {
      const filter = city.find((i) => i.id_city == value);
      setAlamat({
        ...alamat,
        id_kabupaten: value,
        kabupaten: filter.type + " " + filter.name,
        kota: filter.type + " " + filter.name,
        id_kecamatan: "",
        kecamatan: "",
      });
      setSubdistrict([]);
    } else if (name === "kecamatan") {
      const filter = subdistrict.find((i) => i.subdistrict_id == value);
      setAlamat({
        ...alamat,
        id_kecamatan: value,
        kecamatan: filter.subdistrict_name,
      });
    } else {
      setAlamat({ ...alamat, [name]: value });
    }
  };

  const _getProvince = async () => {
    const response = await getProvince();
    if (response.status === 200) {
      setProvince(response.data);
    }
  };

  const _getCity = async (id) => {
    const response = await getCity(id);
    if (response.status === 200) {
      setCity(response.data);
    }
  };

  const _getSubdistrict = async (id) => {
    const response = await getKecamatan(id);
    if (response.status === 200) {
      setSubdistrict(response.data);
    }
  };

  const getDataAlamat = useCallback(async () => {
    setLoading(true);
    const response = await getAddress();
    if (response?.status === 200) {
      const result = response.alamat.find((i) => i.id == id);
      setCity([
        {
          id_city: String(result.id_kabupaten),
          type: "",
          name: String(result.kabupaten),
          postal_code: String(result.kode_pos),
        },
      ]);
      setSubdistrict([
        {
          subdistrict_id: String(result.id_kecamatan),
          subdistrict_name: String(result.kecamatan),
        },
      ]);
      setAlamat({
        ...result,
        id_kabupaten: String(result.id_kabupaten),
        id_kecamatan: String(result.id_kecamatan),
        id_provinsi: String(result.id_provinsi),
        kode_pos: String(result.kode_pos),
      });
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  }, [alamat]);

  useEffect(() => {
    if (id) {
      getDataAlamat();
    }
    _getProvince();
  }, []);

  return {
    province,
    city,
    subdistrict,
    alamat,
    setAlamat,
    _getCity,
    _getSubdistrict,
    handleChange,
  };
};
