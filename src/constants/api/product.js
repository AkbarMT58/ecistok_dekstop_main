import callAPI from 'configs/axios';
import axios from 'axios';

// export async function searchProduct(
//   keyword,
//   type,
//   page,
//   sort = "default",
//   start_price,
//   end_price
// ) {
//   const filter = keyword.replace(" ", "+");
//   const url = `${process.env.API_GATEWAY}/get-china-cari/${filter}/${type}/search/${page}/20`;

//   return callAPI({
//     url,
//     method: "GET",
//     token: true,
//   });
// }
// http://192.168.15.16:8080/get-china-cari/taobao/1/motor/20

export async function searchProduct(keyword, type, page) {
  const filter = keyword.replace(' ', '+');
  const url = `${process.env.API_GATEWAY}/get-china-cari/${type}/${page}/${filter}/20`;

  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function detailProduct(id, outlet) {
  const URL = `${process.env.API_GATEWAY}/get-china-detail/${outlet}/${id}`;
  const response = await axios.get(URL);
  const axiosResponse = response.data;
  return axiosResponse;
}

export async function newDetailProduct(id, outlet) {
  const url = `${process.env.API_GATEWAY}/get-china/${outlet}/${id}`;
  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function homeProduct() {
  const url = `${process.env.API_GATEWAY}/get-china-dashboard`;
  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}
