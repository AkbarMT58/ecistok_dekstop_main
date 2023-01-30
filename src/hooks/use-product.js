import { useReducer } from "react";
import { newDetailProduct } from "constants/api/product";

const initialState = {
  data: null,
  isLoading: true,
  isError: false,
};
const variantReducers = (state, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...state,
        data: action.data,
        isLoading: false,
        isError: action.isError,
        variant: action.variant,
        childVariant: action.childVariant,
      };
    case "SELECT_VARIANT":
      return {
        ...state,
        isLoading: false,
        childVariant: action.childVariant,
      };
    case "CHANGE_QTY":
      return {
        ...state,
        isLoading: false,
        childVariant: action.childVariant,
        selectedVariant: action.selectedVariant,
      };

    default:
      return initialState;
  }
};

const useProduct = () => {
  const [productState, dispatch] = useReducer(variantReducers, initialState);

  const fetchProduct = async (id, type) => {
    const res = await newDetailProduct(id, type);

    if (res.status === 200) {
      //facebook pixel VIEWCONTENT
      fbq("track", "ViewContent", {
        content_ids: res?.num_iid,
        content_name: res?.title,
        content_type: "product",
        currency: "IDR",
        value: res?.harga * 2350,
      });

      const { variant, PropSku } = res;
      const listVariant = [];
      res.diskon?.map((item, i) => {
        if (i === 0) {
          item.is_active = true;
        } else {
          item.is_active = false;
        }
        return item;
      });
      if (variant?.length === 2) {
        PropSku.map((sku, i) => {
          if (i === 0) {
            sku.isSelected = true;
          } else {
            sku.isSelected = false;
          }
          sku.id = i;
          sku?.children?.map((variant) => {
            variant.id_product = i;
          });
        });
        dispatch({
          type: "FETCH_DATA",
          data: res,
          isError: false,
          variant: PropSku,
          childVariant: PropSku[0],
        });
      } else {
        for (let i = 0; i < res.PropSku.length; i++) {
          PropSku[i].id = i;
          if (PropSku[i].children) {
            PropSku[i].children[0].id_product = i;
          }
          listVariant.push(PropSku[i]);
        }
        dispatch({
          type: "FETCH_DATA",
          data: res,
          isError: false,
          variant: listVariant,
          childVariant: listVariant,
          selectedVariant: [],
        });
      }
      return productState.isError;
    } else {
      dispatch({ type: "FETCH_DATA", data: [], isError: true });
      return true;
    }
  };

  const selectVariant = (e, prop) => {
    e.preventDefault();
    productState?.variant.map((sku) => {
      if (prop === sku.properties) {
        sku.isSelected = true;
      } else {
        sku.isSelected = false;
      }
    });

    const patt = new RegExp(prop);
    const obj = [];
    productState?.variant.find((o, i) => {
      if (patt.test(o.properties)) {
        obj.push(o);
      }
    });
    dispatch({
      type: "SELECT_VARIANT",
      childVariant: obj[0],
    });
  };

  const handleQty = (prop1, prop2, quantity) => {
    const childVariant = [];

    productState?.variant.find((i) => {
      if (i.id === prop1) {
        i.children.find((child) => {
          if (child.properties === prop2) {
            child.qty = parseInt(quantity);
          }
        });
        i.total = i?.children.reduce((n, { qty }) => n + qty, 0);
        childVariant.push(i);
      }
    });

    const selectedVariants = productState?.variant
      ?.filter((arr) => arr.total > 0)
      .map((el) => {
        return { ...el, children: el.children.filter((e) => e.qty > 0) };
      });

    if (productState.data.diskon?.length > 1) {
      const totalProduct = selectedVariants.reduce(
        (n, { total }) => n + total,
        0
      );
      let filterDiskon = productState.data.diskon.filter(
        (item) => item.kuantiti <= totalProduct
      );
      if (filterDiskon.length > 0) {
        const kuantitiDiskon = filterDiskon.pop().kuantiti;
        productState.data.diskon.map((item) => {
          if (item.kuantiti === kuantitiDiskon) {
            item.is_active = true;
          } else {
            item.is_active = false;
          }
        });
      }
    }

    dispatch({
      type: "CHANGE_QTY",
      childVariant: childVariant[0],
      selectedVariant: selectedVariants,
    });
  };

  return {
    productState,
    handleQty,
    fetchProduct,
    selectVariant,
  };
};

export default useProduct;
