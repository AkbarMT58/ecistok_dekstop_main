import { useState, useEffect, useCallback } from "react";
import { getMyOrders, getTracking } from "constants/api/member";
import { useRouter } from "next/router";

export const useOrders = () => {
  const router = useRouter();
  const [dataOrder, setDataOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingTrack, setLoadingTrack] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [tracking, setTracking] = useState([]);
  const [valueChange, setValueChange] = useState("all");
  const [param, setParam] = useState({
    type: "all",
    page: 1,
  });

  const getMoreOrder = async () => {
    const result = await getMyOrders(param.type, param.page + 1);
    setParam({ ...param, page: param.page + 1 });
    if (result.status === 200) {
      if(result.data?.length !== 0) {
        setDataOrder((order) => [...order, ...result.data]);
      } else {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }
  };

  const getOrder = async () => {
    setLoading(true);
    const response = await getMyOrders(param.type, param.page);
    if (response.status === 200) {
      setDataOrder(response.data);
    } else {
      setDataOrder([]);
    }
    setLoading(false);
  };

  const getTrackingOrder = async (id) => {
    setLoadingTrack(true);
    const response = await getTracking(id);
    if (response.status === 200) {
      setTracking(response.data);
    } else {
      setTracking([]);
    }
    setOpen(true);
    setLoadingTrack(false);
  };

  useEffect(() => {
    getOrder();
  }, [count]);

  return {
    getMoreOrder,
    getTrackingOrder,
    tracking,
    setTracking,
    open,
    setOpen,
    hasMore,
    count,
    dataOrder,
    loading,
    param,
    setCount,
    setParam,
    valueChange,
    loadingTrack,
    setValueChange,
  };
};
