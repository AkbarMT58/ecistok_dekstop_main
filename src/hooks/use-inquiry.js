import { useState, useEffect } from 'react';
import {
  getInquiryPayment,
  getInquiryCalculate,
  updateInquiry,
  removeCart,
  getInquiryCanceled,
} from 'constants/api/member';
import { toast } from 'react-toastify';

export const useInquiry = () => {
  const [cart, setCart] = useState({
    product: [],
    shipping_method: ['laut', 'udara'],
    shipping_value: 'laut',
    is_valid_checkout: false,
    total_checkout: 0,
  });
  const [calculate, setCalculate] = useState([]);
  const [canceled, setCanceled] = useState([]);
  const [loading, setLoading] = useState({
    cart: false,
    quantity: false,
    submit: false,
  });
  const [loadingCalculate, setLoadingCalculate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [count, setCount] = useState(0);

  const _getInquiryCalculate = async () => {
    setLoadingCalculate(true);
    const response = await getInquiryCalculate();
    if (response.status === 200) {
      setCalculate(response.data);
    } else {
      setCalculate([]);
    }
    setLoadingCalculate(false);
  };

  const _getInquiryCanceled = async () => {
    const response = await getInquiryCanceled();
    if (response.status === 200) {
      setCanceled(response.data);
    } else {
      setCanceled([]);
    }
  };

  const _getInquiryPayment = async () => {
    setLoading({ ...loading, cart: true });
    const response = await getInquiryPayment();
    if (response.status === 200) {
      response.data.map((cart) => {
        cart.total_ship = 0;
        cart.total_airplane = 0;
        response?.id_list_link;
        return cart.RequestProduk.map(
          (variant) => (variant.isSelected = false)
        );
      });

      setCart({ ...cart, product: response.data });
    } else if (response.status === 404) {
      setCart({
        ...cart,
        product: [],
        is_valid_checkout: false,
        total_checkout: 0,
      });
    }
    setLoading({ ...loading, cart: false });
  };

  const selectCart = (type, index, ischecked, indexVariant) => {
    if (type === 'all') {
      cart.product[index].RequestProduk.map(
        (variant) => (variant.isSelected = ischecked)
      );
    } else {
      cart.product[index].RequestProduk[indexVariant].isSelected = ischecked;
    }

    const selectedData = cart.product[index].RequestProduk.filter(
      (data) => data.isSelected
    );

    const _total_ship = selectedData.reduce(
      (sum, p) => sum + p.harga * parseInt(p.kuantiti),
      0
    );

    const _total_airplane = selectedData.reduce(
      (sum, p) => sum + p.harga_pesawat * parseInt(p.kuantiti),
      0
    );

    const _totalQty = selectedData.reduce(
      (sum, p) => sum + parseInt(p.kuantiti),
      0
    );

    cart.product[index].totalQty = _totalQty;
    cart.product[index].total_ship = _total_ship;
    cart.product[index].total_airplane = _total_airplane;

    const _validate_airplane = cart.product.filter(
      (shipping) => shipping.total_ship > 0 && !shipping.is_airplane
    );

    if (_validate_airplane.length > 0) {
      setCart({
        ...cart,
        shipping_method: ['laut'],
        product: cart.product,
        shipping_value: 'laut',
      });
    } else {
      setCart({
        ...cart,
        shipping_method: ['laut', 'udara'],
        product: cart.product,
      });
    }
    setUpdate(!update);
  };
  const validateCheckout = () => {
    let total = 0;
    let arr = [];
    let filterQty = [];

    if (cart.shipping_value === 'laut') {
      arr = cart.product.filter(
        (data) => data.total_ship > 0 && data.total_ship < 1000000
      );
      filterQty = cart.product.filter(
        (data) => data.total_ship > 0 && data.totalQty < data.kuantiti_ori
      );
      total = cart.product.reduce((sum, p) => sum + p.total_ship, 0);
    } else {
      arr = cart.product.filter(
        (data) => data.total_airplane > 0 && data.total_airplane < 1000000
      );
      filterQty = cart.product.filter(
        (data) => data.total_airplane > 0 && data.totalQty < data.kuantiti_ori
      );
      total = cart.product.reduce((sum, p) => sum + p.total_airplane, 0);
    }

    if (arr.length === 0 && total > 1000000 && filterQty.length === 0) {
      setCart({ ...cart, total_checkout: total, is_valid_checkout: true });
    } else {
      setCart({ ...cart, total_checkout: total, is_valid_checkout: false });
    }
  };

  const updateQuantity = async (qty, id_variant, id_product, id_list_link) => {
    setLoading({ ...loading, quantity: true });

    const payload = JSON.stringify({
      id: parseInt(id_variant),
      id_request: parseInt(id_product),
      kuantiti: parseInt(qty),
      id_list_link: id_list_link,
    });

    const response = await updateInquiry(payload);
    if (response.status === 200) {
      let arr = [];

      cart.product.map((data, i) => {
        data.RequestProduk.map((variant, j) => {
          variant.kuantiti = response.data[i].RequestProduk[j].kuantiti;
        });

        data.total_ship = data.RequestProduk.filter(
          (arr) => arr.isSelected
        ).reduce((sum, p) => sum + p.harga * parseInt(p.kuantiti), 0);

        data.total_airplane = data.RequestProduk.filter(
          (arr) => arr.isSelected
        ).reduce((sum, p) => sum + p.harga_pesawat * parseInt(p.kuantiti), 0);

        data.totalQty = data.RequestProduk.filter(
          (arr) => arr.isSelected
        ).reduce((sum, p) => sum + parseInt(p.kuantiti), 0);

        data.price_airplane = data.RequestProduk.filter(
          (arr) => arr.isSelected
        ).reduce((sum, p) => sum + parseInt(p.kuantiti), 0);

        data.RequestProduk.map((variant, j) => {
          variant.harga_pesawat =
            response.data[i].RequestProduk[j].harga_pesawat;
        });

        arr.push(data);
      });

      setCart({ ...cart, product: arr });
      setUpdate(!update);
    }
    setLoading({ ...loading, quantity: false });
  };

  const changeTypeShipping = (e) => {
    setCart({ ...cart, shipping_value: e.target.value });
    setUpdate(!update);
  };

  const _removeCart = async (id) => {
    const response = await removeCart(id);
    if (response.status === 200) {
      toast.success('Berhasil Menghapus Produk');
    } else {
      toast.error(response.message);
    }
    setCount(count + 1);
  };

  useEffect(() => {
    if (cart.product.length !== 0) {
      validateCheckout();
    }
  }, [update]);

  useEffect(() => {
    _getInquiryPayment();
    _getInquiryCanceled();
    _getInquiryCalculate();
  }, [count]);

  return {
    cart,
    calculate,
    loading,
    canceled,
    setLoading,
    selectCart,
    changeTypeShipping,
    updateQuantity,
    loadingCalculate,
    count,
    setCount,
    _removeCart,
  };
};
