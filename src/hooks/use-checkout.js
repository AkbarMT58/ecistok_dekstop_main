import { useState, useEffect } from 'react';
import { getCheckout, getCourier } from 'constants/api/member';
import { useRouter } from 'next/router';

export const useCheckout = (id) => {
  const router = useRouter();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState(false);
  const [courier, setCourier] = useState([]);
  const [updateKurir, setUpdatekurir] = useState(false);
  const [loadingCourier, setLoadingCourier] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [voucher, setVoucher] = useState({
    code: '',
    is_percentage: false,
    value: 0,
  });
  const [payload, setPayload] = useState({
    id_so: 0,
    id_alamat: 0,
    kurir: '',
    ongkir: 0,
    service: '',
    payment_type: '',
    kode_diskon: '',
    lacak: '',
    Is_airplane: null,
    Is_id_group: false,
  });

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await getCheckout(id);
      if (response.status === 200) {
        response.data.Pembayaran.map((payment) => {
          payment.is_selected = false;
        });
        response.data.Alamat.map((address) => {
          if (address.status === 'utama') {
            address.isSelected = true;
          } else {
            address.isSelected = false;
          }
        });
        setData(response.data);
        if (response.data.Alamat.length > 0) {
          const filter = response.data.Alamat.find((e) => e.isSelected);
          setPayload({
            ...payload,
            id_alamat: filter?.id,
            id_so:
              response?.data?.id_so === ''
                ? `group-${response?.data?.id_group}`
                : response?.data?.id_so,
            Is_id_group: response?.data?.id_so === '' ? true : false,
          });
          setUpdatekurir(!updateKurir);
        }
      } else if (response.status === 404) {
        router.push('/404/page');
      } else if (response.status === 401) {
        router.push('/login');
      }
      setLoading(false);
    };
    getData();
  }, [update]);

  useEffect(() => {
    const getKurir = async () => {
      setLoadingCourier(true);
      const id_kecamatan = data.Alamat.find(
        (e) => e.id === payload.id_alamat
      ).id_kecamatan;
      const response = await getCourier(id_kecamatan, data?.total_weight);
      const arr = [];
      if (response.status === 200) {
        response?.data?.courier?.map((courier, index) => {
          if (courier.costs.length > 0) {
            courier.costs.map((service, i) => {
              arr.push({
                id: courier.code + i,
                code: courier.code,
                service: service.service,
                is_selected: false,
                price: service.cost[0].value,
              });
            });
          } else {
            arr.push({
              id: courier.code + index,
              code: courier.code,
              service: '',
              is_selected: false,
              price: '-',
            });
          }
        });
        // TEMPORARY DISABLED //
        // arr.push({
        //   code: 'Custom',
        //   id: 'custom',
        //   is_selected: false,
        //   service: 'Pengiriman',
        //   price: 0,
        // });
        setCourier(arr);
      } 
      // TEMPORARY DISABLED //
      // else {
      //   arr.push({
      //     code: 'Custom',
      //     id: 'custom',
      //     is_selected: false,
      //     service: 'Pengiriman',
      //     price: 0,
      //   });
      //   setCourier(arr);
      // }
      setLoadingCourier(false);
    };

    if (payload.id_alamat > 0) {
      getKurir();
    }
  }, [updateKurir]);

  return {
    show,
    data,
    payload,
    loading,
    count,
    update,
    voucher,
    courier,
    updateKurir,
    loadingCourier,
    loadingSubmit,
    setLoadingCourier,
    setUpdatekurir,
    setCourier,
    setData,
    setVoucher,
    setUpdate,
    setShow,
    setCount,
    setLoading,
    setPayload,
    setLoadingSubmit,
  };
};
