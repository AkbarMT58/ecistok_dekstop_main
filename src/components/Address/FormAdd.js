import Validator from "fastest-validator";
import { toast } from "react-toastify";
import { addAddress } from "constants/api/member";
import Router from "next/router";
import InputForm from "components/Global/InputForm";
import { useAddress } from "hooks/use-address";

export default function FormAdd({ isAddress, handleClose }) {
  const v = new Validator();
  const {
    province,
    city,
    subdistrict,
    alamat,
    setAlamat,
    _getCity,
    _getSubdistrict,
    handleChange,
  } = useAddress();

  const submitForm = (e) => {
    e.preventDefault();

    const schema = {
      nama_depan: {
        type: "string",
        empty: false,
        min: 2,
        pattern: /^[a-zA-Z ]*$/,
        messages: {
          string: "Silahkan cek nama depan anda",
          stringMin: "Nama depan terlalu pendek",
          stringPattern: "Nama depan tidak valid",
          stringEmpty: "Nama depan wajib diisi",
        },
      },
      nama_belakang: {
        type: "string",
        empty: false,
        min: 2,
        pattern: /^[a-zA-Z ]*$/,
        messages: {
          string: "Silahkan cek nama belakang anda",
          stringMin: "Nama belakang terlalu pendek",
          stringPattern: "Nama belakang tidak valid",
          stringEmpty: "Nama belakang wajib diisi",
        },
      },
      telepon: {
        type: "string",
        empty: false,
        min: 10,
        pattern: /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{6,9}$/,
        messages: {
          stringMin: "No handphone minimal 10 digit",
          stringPattern: "No handphone tidak valid",
          stringEmpty: "No handphone wajib diisi",
        },
      },
      kota: {
        type: "string",
        empty: false,
        min: 2,
        messages: {
          string: "Nama kota tidak valid",
          stringMin: "Nama kota tidak valid",
          stringEmpty: "Nama kota wajib diisi",
        },
      },
      kabupaten: {
        type: "string",
        empty: false,
        messages: {
          stringEmpty: "Kabupaten wajib diisi",
        },
      },
      kecamatan: {
        type: "string",
        empty: false,
        messages: {
          stringEmpty: "Kecamatan wajib diisi",
        },
      },
      provinsi: {
        type: "string",
        empty: false,
        messages: {
          stringEmpty: "Provinsi wajib diisi",
        },
      },
      alamat: {
        type: "string",
        empty: false,
        min: 10,
        messages: {
          stringEmpty: "Alamat wajib diisi",
          stringMin: "Alamat tidak valid",
        },
      },
    };

    const validate = v.validate(alamat, schema);
    if (validate?.length) {
      toast.error(`${validate[0]?.message}`);
    } else {
      const parsePayload = {
        ...alamat,
        id_kabupaten: Number(alamat.id_kabupaten),
        kode_pos: Number(alamat.kode_pos),
        id_kecamatan: Number(alamat.id_kecamatan),
        id_provinsi: Number(alamat.id_provinsi),
      };
      addAddress(JSON.stringify(parsePayload))
        .then((res) => {
          if (res.status === 200) {
            toast.success("Berhasil Menambahkan Alamat");
            isAddress ? Router.push("/address") : handleClose();
          } else {
            toast.error(res.message);
          }
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <form onSubmit={submitForm}>
      <div className='flex space-x-2 bg-white border-b border-gray-200 py-2'>
        <div className='w-full flex justify-between text-sm items-center'>
          <h1 className='text-gray-700 font-bold'>Tambah Alamat</h1>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 mt-4 text-sm'>
        <InputForm
          label='Nama Depan Penerima'
          placeholder='Nama Depan Penerima'
          id='nama_depan'
          type='text'
          value={alamat.nama_depan}
          onChange={handleChange}
        />
        <InputForm
          label='Nama Belakang Penerima'
          placeholder='Nama Belakang Penerima'
          id='nama_belakang'
          type='text'
          value={alamat.nama_belakang}
          onChange={handleChange}
        />
        <InputForm
          label='No Handphone Penerima'
          placeholder='0812xxxxxx'
          id='telepon'
          type='number'
          value={alamat.telepon}
          onChange={handleChange}
        />
        <div>
          <label className='text-gray-500' htmlFor='kota'>
            Provinsi
          </label>
          <select
            onChange={(e) => {
              _getCity(e.target.value);
              handleChange(e);
            }}
            name='provinsi'
            className='block w-full px-4 py-2 mt-1 text-gray-500 bg-white border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50'>
            <option value=''>Pilih Provinsi</option>
            {province.map((e) => {
              return (
                <option
                  key={e.province_id}
                  value={e.province_id}
                  data-province={e.province}>
                  {e.province}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label className='text-gray-500' htmlFor='kota'>
            Kota / Kabupaten
          </label>
          <select
            onChange={(e) => {
              _getSubdistrict(e.target.value);
              handleChange(e);
            }}
            name='kabupaten'
            className='block w-full px-4 py-2 mt-1 text-gray-500 bg-white border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50'>
            <option value=''>Pilih kota / Kabupaten</option>
            {city.map((e) => {
              return (
                <option key={e.id_city} value={e.id_city}>
                  {e.type} {e.name}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label className='text-gray-500' htmlFor='kota'>
            Kecamatan
          </label>
          <select
            onChange={handleChange}
            name='kecamatan'
            className='block w-full px-4 py-2 mt-1 text-gray-500 bg-white border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50'>
            <option value=''>Pilih Kecamatan</option>
            {subdistrict.map((e) => {
              return (
                <option key={e.subdistrict_id} value={e.subdistrict_id}>
                  {e.subdistrict_name}
                </option>
              );
            })}
          </select>
        </div>

        <InputForm
          label='Kode Pos'
          placeholder='Kode Pos'
          id='kode_pos'
          type='number'
          value={alamat.kode_pos}
          onChange={handleChange}
        />
        <div>
          <label className='text-gray-500' htmlFor='alamat'>
            Alamat Lengkap
          </label>
          <textarea
            id='alamat'
            type='textarea'
            rows='4'
            autoComplete='chrome-off'
            className='block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50'
            onChange={(e) =>
              setAlamat({ ...alamat, alamat: e.target.value })
            }></textarea>
        </div>
        <div className='flex items-center space-x-2'>
          <input
            type='checkbox'
            id='defaultAddress'
            onClick={(e) =>
              e.target.checked
                ? setAlamat({
                    ...alamat,
                    status: "utama",
                  })
                : setAlamat({
                    ...alamat,
                    status: "second",
                  })
            }
          />
          <p className='text-gray-500'>Simpan Sebagai Alamat Utama</p>
        </div>
      </div>

      <div className='flex justify-end mt-6'>
        <button
          type='submit'
          className='px-6 py-1 text-white rounded-md bg-orange-500'>
          Tambah Alamat
        </button>
      </div>
    </form>
  );
}
