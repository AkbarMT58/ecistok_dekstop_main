import axios from 'axios';

export async function getDataInvoices(id_so) {
  const URL = `${process.env.API_GATEWAY}/oci/orders/invoice/${id_so}`;
  const response = await axios.get(URL, {
    headers: {
      Xemail: `wahdangun@gmail.com`,
      key: `ocisuperkeren`,
    },
  });
  const axiosResponse = response.data;
  return axiosResponse;
}


