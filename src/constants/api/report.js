import axios from 'axios';
import callAPI from 'configs/axios';

export async function _getDataInvoices_Report(id_so) {
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

export async function getDataInvoices_Report(id_so) {
    const url = `${process.env.API_GATEWAY}/oci/orders/invoice/${id_so}`;
  
    return callAPI({
      url,
      method: 'GET',
      token: true,
    });
  }